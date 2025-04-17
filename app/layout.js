import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata = {
  title: "Exam Schedule by KVS",
  description: "A web app to keep track of GTU B.E. SEM-4 exams",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Updated viewport meta tag to disable user zoom */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        {/* toast */}
        <ToastContainer />
      </body>
    </html>
  );
}