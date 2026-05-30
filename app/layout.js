import "./globals.css";

export const metadata = {
  title: "Restaurant Technology Solutions",
  description: "Restaurant operations visibility platform for multi-location operators"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
