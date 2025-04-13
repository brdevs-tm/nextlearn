// layout.js
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  description: "O'quv markazlar uchun ERP va taqdimot tizimi",
};

export default function RootLayout({ children }) {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  const hideNavAndFooter = pathname === "/login";

  return (
    <html lang="uz">
      <body className="antialiased">
        {!hideNavAndFooter && <Navbar />}
        {children}
        {!hideNavAndFooter && <Footer />}
      </body>
    </html>
  );
}
