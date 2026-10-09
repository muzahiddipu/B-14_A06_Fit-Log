import { Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { WorkoutStoreProvider } from "./components/WorkoutStore";
import { inter } from "./fonts";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FitLog — Workout Library & Training Planner",
  description:
    "Browse workouts, build your daily training plan, and save exercises for later with FitLog.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <WorkoutStoreProvider>
          <NavBar />
          {children}
          <Footer />
        </WorkoutStoreProvider>
      </body>
    </html>
  );
}
