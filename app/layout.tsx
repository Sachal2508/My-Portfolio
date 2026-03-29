import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Sachal — Full Stack Developer",
  description:
    "Portfolio of Muhammad Sachal — .NET Developer, Pythonist & AI/ML Enthusiast based in Lahore, Pakistan.",
  openGraph: {
    title: "Muhammad Sachal — Full Stack Developer",
    description: "Passionate about building modern, scalable applications.",
    url: "https://sachal.dev",
    siteName: "Muhammad Sachal",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
