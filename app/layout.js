import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from './lib/registry'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DAPP",
  description: "Your Crypto Trading Companion - Real-time market data, personalized insights, and seamless trading experience. Stay ahead in the crypto world with our intuitive platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
      <body
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}>
        <ToastContainer pauseOnFocusLoss={false} />
        {children}
      </body>
      </StyledComponentsRegistry>
    </html>
  );
}
