const users = [
  { name: "Alice R.", step: 5, pct: 100, color: "#0891b2" },
  { name: "Benoit K.", step: 4, pct: 78, color: "#0891b2" },
  { name: "Clara M.", step: 3, pct: 52, color: "#0e7490" },
  { name: "David S.", step: 2, pct: 31, color: "#155e75" },
  { name: "Emma L.", step: 1, pct: 12, color: "#164e63" },
];

const steps = ["Compte créé", "Profil complété", "1re intégration", "Test en live", "Go production"];

export default function Home() {
  return (
    <main style={{ color: "#164e63" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-cyan-100">
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem", color: "#0891b2" }}>
          OnboardAI
        </span>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' type="button" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full text-white text-sm font-bold" style={{ background: "#0891b2" }}>
            📅 Réserver un créneau →
          </button>
          <a href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20OnboardAI%20avec%20Wikolabs." target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full text-white text-sm font-bold" style={{ background: "#25d366", borderColor: "#25d366" }}>
            💬 WhatsApp →
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5" style={{ background: "#cffafe", color: "#0e7490" }}>
          <span>●</span> Taux de churn J30 divisé par 3
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem,5vw,3.5rem)", lineHeight: 1.1, color: "#0891b2" }} className="mb-4">
          Activez vos clients<br />en 48 heures, pas 14 jours.
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "#0e7490" }}>
          OnboardAI orchestre un parcours d'activation personnalisé pour chaque client — check-ins automatiques, nudges IA et score d'activation en temps réel.
        </p>
        <div className="flex justify-center gap-10 mb-8">
          {[["48h", "onboarding moyen"], ["3x", "moins de churn J30"], ["92%", "taux de complétion"]].map(([v, l]) => (
            <div key={l} className="text-center">
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.2rem", color: "#0891b2" }}>{v}</div>
              <div className="text-sm" style={{ color: "#0e7490" }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' type="button" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 rounded-full text-white font-bold text-lg shadow-md" style={{ background: "#0891b2" }}>
            📅 Réserver un créneau →
          </button>
          <a href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20OnboardAI%20avec%20Wikolabs." target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 rounded-full text-white font-bold text-lg shadow-md" style={{ background: "#25d366", borderColor: "#25d366" }}>
            💬 WhatsApp →
          </a>
        </div>
      </section>

      {/* Progress Tracker Mockup */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl shadow-lg border border-cyan-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#0891b2" }}>Suivi activation clients</span>
            <span className="text-xs text-cyan-600 bg-cyan-50 px-2 py-1 rounded-full">Live</span>
          </div>
          {/* Step headers */}
          <div className="grid grid-cols-5 gap-1 mb-4">
            {steps.map((s, i) => (
              <div key={s} className="text-center">
                <div className="w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center text-white text-xs font-bold" style={{ background: "#0891b2" }}>{i + 1}</div>
                <div className="text-xs text-cyan-700 leading-tight">{s}</div>
              </div>
            ))}
          </div>
          {/* Users */}
          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.name} className="flex items-center gap-3">
                <div className="w-20 text-sm font-medium text-slate-700 flex-shrink-0">{u.name}</div>
                <div className="flex-1 bg-cyan-50 rounded-full h-5 overflow-hidden">
                  <div
                    className="h-5 rounded-full flex items-center justify-end pr-2 transition-all"
                    style={{ width: `${u.pct}%`, background: "#0891b2" }}
                  >
                    <span className="text-white text-xs font-semibold">{u.pct}%</span>
                  </div>
                </div>
                <div className="w-16 text-xs text-cyan-700 flex-shrink-0">Étape {u.step}/5</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline comparison */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.8rem", color: "#0891b2" }} className="text-center mb-8">
          48h vs 14 jours — la différence OnboardAI
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-5 border border-red-100">
            <div className="text-sm font-bold text-red-500 mb-3">Sans OnboardAI — 14 jours</div>
            {["J0: Email de bienvenue générique", "J3: Aucun suivi", "J7: Client perdu dans l'interface", "J10: Ticket support frustré", "J14: Churn silencieux"].map((s) => (
              <div key={s} className="text-xs text-slate-600 py-1 border-b border-slate-100 last:border-0">{s}</div>
            ))}
          </div>
          <div className="bg-white rounded-xl p-5 border border-cyan-100">
            <div className="text-sm font-bold text-cyan-600 mb-3">Avec OnboardAI — 48 heures</div>
            {["H0: Parcours personnalisé activé", "H4: Check-in IA proactif", "H12: 1re valeur atteinte guidée", "H24: Score activation 80%+", "H48: Client autonome et engagé"].map((s) => (
              <div key={s} className="text-xs text-slate-600 py-1 border-b border-slate-100 last:border-0">{s}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-y border-cyan-100 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.8rem", color: "#0891b2" }} className="text-center mb-10">
            3 piliers de l'activation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🗺️", title: "Parcours personnalisé", desc: "Chaque client suit un parcours adapté à son profil, son secteur et ses objectifs définis à l'inscription." },
              { icon: "🤖", title: "Check-ins IA automatiques", desc: "Messages proactifs au bon moment — quand un utilisateur stagne, l'IA intervient avec le bon contenu." },
              { icon: "📈", title: "Score d'activation", desc: "Tableau de bord temps réel avec score d'activation par client. Identifiez les risques de churn avant J30." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-cyan-100 p-6">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "#0891b2" }} className="mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#0e7490" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ background: "linear-gradient(135deg, #0891b2, #0284c7)" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "white" }} className="mb-3">
          Divisez votre churn par 3 dès ce mois-ci.
        </h2>
        <p className="text-cyan-100 mb-8">Setup en 2 jours. Résultats mesurables en 30 jours.</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' type="button" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 rounded-full font-bold text-lg shadow-lg" style={{ background: "white", color: "#0891b2" }}>
            📅 Réserver un créneau →
          </button>
          <a href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20OnboardAI%20avec%20Wikolabs." target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 rounded-full font-bold text-lg shadow-lg" style={{ background: "#25d366", borderColor: "#25d366" }}>
            💬 WhatsApp →
          </a>
        </div>
      </section>

      <footer className="text-center py-6 text-sm bg-white border-t border-cyan-50" style={{ color: "#0891b2" }}>
        <p>&copy; 2025 OnboardAI &mdash; Un produit Wikolabs</p>
        <div className="flex flex-wrap justify-center gap-4 mt-2 text-xs" style={{ color: "#0891b2" }}>
          <a href="mailto:team@wikolabs.com" style={{ color: "#0891b2", textDecoration: "none" }} className="hover:opacity-70 transition-opacity">team@wikolabs.com</a>
          <span>·</span>
          <a href="tel:+261386626100" style={{ color: "#0891b2", textDecoration: "none" }} className="hover:opacity-70 transition-opacity">+261 38 66 261 00</a>
          <span>·</span>
          <button data-cal-link="wikolabs-team/30min" data-cal-namespace="wk30min" data-cal-config='{"layout":"month_view"}' type="button" target="_blank" rel="noopener noreferrer" style={{ color: "#0891b2", textDecoration: "none" }} className="hover:opacity-70 transition-opacity" style={{cursor:"pointer",background:"none",border:"none",padding:0,font:"inherit",color:"inherit",textDecoration:"none"}}>Prendre RDV</button>
        </div>
      </footer>
    </main>
  );
}
