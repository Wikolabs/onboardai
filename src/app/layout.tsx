import type { Metadata } from "next";
import { Exo_2, Jost } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OnboardAI — Activation client en 48h, taux de churn J30 divisé par 3",
  description:
    "Parcours d'onboarding personnalisé, check-ins automatiques et suivi de complétion en temps réel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${exo2.variable} ${jost.variable}`}>
      <body
        style={{
          background: "#ecfeff",
          fontFamily: "var(--font-body)",
          margin: 0,
          padding: 0,
        }}
      >
        {children}
      <Script id="cal-embed" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: '(function(C,A,L){var p=function(a,ar){a.q.push(ar);};var d=C.document;C.Cal=C.Cal||function(){var cal=C.Cal;var ar=arguments;if(!cal.loaded){cal.ns={};cal.q=cal.q||[];d.head.appendChild(d.createElement("script")).src=A;cal.loaded=true;}if(ar[0]===L){const api=function(){p(api,arguments);};const namespace=ar[1];api.q=api.q||[];if(typeof namespace==="string"){cal.ns[namespace]=cal.ns[namespace]||api;p(cal.ns[namespace],ar);p(cal,["-",namespace,ar[2]]);}else p(cal,ar);return;}p(cal,ar);};})(window,"https://app.cal.com/embed/embed.js","init");Cal("init","wk30min",{origin:"https://app.cal.com"});Cal.ns["wk30min"]("ui",{"theme":"light","hideEventTypeDetails":false,"layout":"month_view"});' }} />
      </body>
    </html>
  );
}
