import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { GoogleTranslate } from "@/components/googleTranslateScript";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "École Ronsard",
  description:
    "École Ronsard's AI-powered bilingual school system helps teachers generate student comments, manage academic terms, and streamline education for excellence.",
  keywords: [
    "École Ronsard",
    "AI School System",
    "Student Comment Generator",
    "French-English School",
    "Academic Term Management",
    "Bilingual Education",
    "Teacher Tools",
  ],
  authors: [{ name: "École Ronsard", url: "https://ronsard.edu.gh" }],
  creator: "Abdul-latif Mohammed",
  metadataBase: new URL("https://ronsard.edu.gh"), // change to your actual domain
  openGraph: {
    title: "École Ronsard — Bilingual School System",
    description:
      "Revolutionizing bilingual education with AI-powered student management and teacher tools.",
    url: "https://ronsard.edu.gh",
    siteName: "École Ronsard",
    images: [
      {
        url: "/og-image.jpg", // put your image in public folder or use full URL
        width: 1200,
        height: 630,
        alt: "École Ronsard Screenshot",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "École Ronsard — Bilingual School System",
    description:
      "Revolutionizing bilingual education with AI-powered student management and teacher tools.",
    images: ["/og-image.jpg"],
    creator: "@EcoleRonsard",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <ToastContainer
          position="top-right"
          newestOnTop={true}
          pauseOnHover
          theme="light"
          autoClose={5000}
          hideProgressBar={false}
          stacked
        />
        <GoogleTranslate />
        {/* <LanguageSwitcher /> */}
        {children}
      </body>
    </html>
  );
}
