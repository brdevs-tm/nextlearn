import "./globals.css";

export const metadata = {
  title: "NextLearn",
  description: "O‘quv markazlar uchun avtomatlashtirilgan tizim",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body className="antialiased">{children}</body>
    </html>
  );
}
