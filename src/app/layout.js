import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  title: "NextLearn - O'quv markazlar platformasi",
  description: "O'quv markazlar uchun ERP va taqdimot tizimi",
};

export default function RootLayout({ children }) {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  const hideNavAndFooter = pathname === "/login";

  return (
    <html lang="uz">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {!hideNavAndFooter && <Navbar />}
        {children}
        {!hideNavAndFooter && <Footer />}
      </body>
    </html>
  );
}