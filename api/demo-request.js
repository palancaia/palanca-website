import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";

const SYSTEM_PROMPT = `Sos un coordinador de solicitudes de demo para Palanca, una agencia de IA especializada en clínicas odontológicas.

REGLA CRÍTICA: Cuando recibas datos de formulario, SIEMPRE debés llamar a send_email EXACTAMENTE DOS VECES — primero al prospecto, luego al equipo. Sin excepciones. No combinés los emails. No omitas ninguno.

LLAMADA 1 — EMAIL AL PROSPECTO:
- Destinatario: el email del prospecto en el formulario
- Tono cálido y profesional, en español argentino (vos/tu negocio)
- Confirmar que recibiste la solicitud
- Aclarar que alguien lo va a contactar dentro de las 24 horas hábiles para coordinar la demo
- Mencionar brevemente qué hace Palanca: un chatbot de WhatsApp con IA que maneja turnos, recordatorios y atención al cliente para clínicas odontológicas, de forma automática
- Asunto: "Recibimos tu solicitud de demo 🦷"
- Firma: Equipo Palanca

LLAMADA 2 — EMAIL AL EQUIPO INTERNO:
- Destinatario: el email del equipo que te dan en el mensaje
- Todos los campos del formulario listados claramente
- Breve, escaneable, sin adornos
- Asunto: "🔔 Nueva solicitud de demo: [nombre del prospecto]"

No pidas aclaraciones. Ejecutá las dos llamadas send_email en secuencia.`;

const tools = [
  {
    name: "send_email",
    description: "Envía un email a un destinatario",
    input_schema: {
      type: "object",
      properties: {
        to: {
          type: "string",
          description: "Email del destinatario",
        },
        subject: {
          type: "string",
          description: "Asunto del email",
        },
        html: {
          type: "string",
          description: "Cuerpo del email en HTML simple",
        },
      },
      required: ["to", "subject", "html"],
    },
  },
];

function parseTallyFields(body) {
  // Tally envía { eventId, eventType, createdAt, data: { responseId, fields: [{label, value}] } }
  const fields = {};
  const raw = body?.data?.fields || [];
  for (const field of raw) {
    if (field.label && field.value !== undefined && field.value !== null && field.value !== "") {
      fields[field.label] = Array.isArray(field.value)
        ? field.value.join(", ")
        : String(field.value);
    }
  }
  return fields;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const teamEmail = process.env.TEAM_EMAIL;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL || "Palanca <demo@palanca.ai>";

  if (!anthropicKey || !resendKey || !teamEmail) {
    console.error("Missing env vars: ANTHROPIC_API_KEY, RESEND_API_KEY, TEAM_EMAIL");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { /* keep as string */ }
  }

  const fields = parseTallyFields(body);

  if (Object.keys(fields).length === 0) {
    console.warn("No fields found in Tally payload:", JSON.stringify(body));
    return res.status(400).json({ error: "No form fields found" });
  }

  const prospectEmail = fields["Email"] || fields["Correo"] || fields["email"] || fields["correo"] || null;

  if (!prospectEmail) {
    console.warn("No email field found in fields:", fields);
    return res.status(400).json({ error: "No prospect email in form data" });
  }

  const client = new Anthropic({ apiKey: anthropicKey });
  const resend = new Resend(resendKey);

  const userMessage = `Procesá esta solicitud de demo y enviá los emails correspondientes.

Datos del formulario:
${Object.entries(fields).map(([k, v]) => `- ${k}: ${v}`).join("\n")}

Email del prospecto: ${prospectEmail}
Email del equipo interno: ${teamEmail}`;

  const messages = [{ role: "user", content: userMessage }];

  let sentCount = 0;

  try {
    let response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      tools,
      messages,
    });

    // Agentic loop
    while (response.stop_reason === "tool_use") {
      const toolUseBlocks = response.content.filter((b) => b.type === "tool_use");
      const toolResults = [];

      for (const toolUse of toolUseBlocks) {
        let result;

        if (toolUse.name === "send_email") {
          const { to, subject, html } = toolUse.input;
          try {
            const { error } = await resend.emails.send({
              from: fromEmail,
              to,
              subject,
              html,
            });

            if (error) {
              console.error("Resend error:", error);
              result = { success: false, error: error.message };
            } else {
              sentCount++;
              result = { success: true };
            }
          } catch (err) {
            console.error("Email send exception:", err.message);
            result = { success: false, error: err.message };
          }
        } else {
          result = { success: false, error: `Unknown tool: ${toolUse.name}` };
        }

        toolResults.push({
          type: "tool_result",
          tool_use_id: toolUse.id,
          content: JSON.stringify(result),
        });
      }

      messages.push({ role: "assistant", content: response.content });
      messages.push({ role: "user", content: toolResults });

      response = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        tools,
        messages,
      });
    }

    console.log(`Demo request processed. Emails sent: ${sentCount}`);
    return res.status(200).json({ ok: true, emailsSent: sentCount });
  } catch (err) {
    console.error("Agent error:", err.message);
    return res.status(500).json({ error: "Agent failed", detail: err.message });
  }
}
