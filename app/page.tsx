export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">

      {/* NAV */}
      <nav className="flex items-center justify-between px-5 py-4 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-sm z-50 border-b border-white/5">
        <span className="text-base font-semibold tracking-tight">Palanca</span>
        <a
          href="#contacto"
          className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full"
        >
          Hablemos
        </a>
      </nav>

      {/* HERO */}
      <section className="px-5 pt-16 pb-12">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-white/60 tracking-wide">Disponibles para nuevos clientes</span>
        </div>

        <h1 className="text-[2.6rem] font-bold leading-[1.1] tracking-tighter mb-5">
          El socio de IA definitivo para empresas y clínicas que crecen rápido.
        </h1>

        <p className="text-base text-white/50 leading-relaxed mb-8 max-w-sm">
          No somos una agencia más. Somos el partner que diseña, implementa y escala tu infraestructura de IA — para que vos te concentres en lo que importa.
        </p>

        <div className="flex flex-col gap-3">
          <a
            href="#contacto"
            className="flex items-center justify-center h-12 bg-white text-black font-semibold rounded-full text-sm"
          >
            Agendá una llamada gratuita
          </a>
          <a
            href="#como-funciona"
            className="flex items-center justify-center h-12 border border-white/10 text-white/70 font-medium rounded-full text-sm"
          >
            Ver cómo funciona
          </a>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="px-5 py-8 border-t border-white/5">
        <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Resultados reales</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: "3×", label: "Más conversiones" },
            { value: "80%", label: "Menos trabajo manual" },
            { value: "48h", label: "Primer sistema live" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
              <div className="text-xs text-white/40 leading-tight mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT WE DO */}
      <section id="como-funciona" className="px-5 py-10 border-t border-white/5">
        <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Qué hacemos</p>
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          Automatizamos lo repetitivo. Escalamos lo que funciona.
        </h2>

        <div className="flex flex-col gap-4">
          {[
            {
              icon: "💬",
              title: "Atención automatizada 24/7",
              desc: "Bots de WhatsApp que responden, califican y agendan — sin que muevas un dedo.",
            },
            {
              icon: "📋",
              title: "Flujos de trabajo inteligentes",
              desc: "Conectamos tus herramientas existentes y eliminamos la fricción entre equipos.",
            },
            {
              icon: "📈",
              title: "Crecimiento medible",
              desc: "Cada sistema que construimos tiene métricas claras. Si no genera resultado, lo ajustamos.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white/3 border border-white/8 rounded-2xl p-5">
              <span className="text-2xl mb-3 block">{item.icon}</span>
              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-5 py-10 border-t border-white/5">
        <p className="text-xs text-white/30 uppercase tracking-widest mb-2">El proceso</p>
        <h2 className="text-2xl font-bold tracking-tight mb-6">Simple. Rápido. Sin sorpresas.</h2>

        <div className="flex flex-col gap-0">
          {[
            { step: "01", title: "Diagnóstico", desc: "Entendemos tu negocio y dónde está el mayor impacto." },
            { step: "02", title: "Diseño", desc: "Mapeamos el sistema que vamos a construir juntos." },
            { step: "03", title: "Implementación", desc: "En 48–72hs tenés tu primer automatización funcionando." },
            { step: "04", title: "Escala", desc: "Iteramos y sumamos capas según crecés." },
          ].map((item, i, arr) => (
            <div key={item.step} className={`flex gap-4 py-5 ${i < arr.length - 1 ? "border-b border-white/5" : ""}`}>
              <span className="text-xs text-white/25 font-mono mt-0.5 w-6 shrink-0">{item.step}</span>
              <div>
                <h3 className="font-semibold text-sm mb-0.5">{item.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="px-5 py-10 border-t border-white/5">
        <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
          <p className="text-sm text-white/70 leading-relaxed mb-4">
            "Pasamos de perder turnos por falta de respuesta a tener el 90% de las consultas resueltas automáticamente. En menos de una semana."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
              M
            </div>
            <div>
              <div className="text-sm font-medium">Dra. Martínez</div>
              <div className="text-xs text-white/35">Clínica Dental, Buenos Aires</div>
            </div>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="px-5 py-10 border-t border-white/5">
        <h2 className="text-2xl font-bold tracking-tight mb-4">
          No te vendemos software. Te acompañamos a crecer.
        </h2>
        <p className="text-sm text-white/50 leading-relaxed">
          Palanca no es una herramienta que instalás y olvidás. Somos el socio técnico que entiende tu negocio, propone soluciones y las mantiene funcionando mientras vos escalás.
        </p>
      </section>

      {/* CTA FINAL */}
      <section id="contacto" className="px-5 py-12 border-t border-white/5">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          ¿Listo para crecer con IA?
        </h2>
        <p className="text-sm text-white/45 mb-6 leading-relaxed">
          Primera sesión gratis. Sin compromisos. Te mostramos exactamente qué podría automatizarse en tu negocio.
        </p>
        <a
          href="https://wa.me/541127891400"
          className="flex items-center justify-center gap-2 h-12 bg-white text-black font-semibold rounded-full text-sm mb-3"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Escribinos por WhatsApp
        </a>
        <a
          href="mailto:consultas.palanca@gmail.com"
          className="flex items-center justify-center h-12 border border-white/10 text-white/60 font-medium rounded-full text-sm"
        >
          consultas.palanca@gmail.com
        </a>
      </section>

      {/* FOOTER */}
      <footer className="px-5 py-6 border-t border-white/5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-white/40">Palanca</span>
          <span className="text-xs text-white/20">© 2025</span>
        </div>
      </footer>

    </div>
  );
}
