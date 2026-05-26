import type { Metadata } from "next";
import { Exo_2, Jost } from "next/font/google";
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
      </body>
    </html>
  );
}
