import "./globals.css";

export const metadata = {
  title: "Next.js Playwright Auth Demo",
  description: "Login and dashboard demo with Playwright tests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
