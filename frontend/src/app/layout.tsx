import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Tasya Cleo Bella",
  description: "A special place made for Tasya Cleo Bella.",
  icons: { icon: [] },
  openGraph: {
    title: "Tasya Cleo Bella",
    description: "A special place made for Tasya.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="antialiased">
      <body className="bg-cream text-charcoal">
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-border py-10 text-center">
          <p className="font-display italic text-xl text-rose">Made for Tasya Cleo Bella</p>
          <p className="text-muted text-xs mt-2 tracking-widest uppercase">{new Date().getFullYear()}</p>
        </footer>
      </body>
    </html>
  );
}
