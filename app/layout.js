import "./globals.css";

export const metadata = {
  title: "Restaurant Intelligence",
  description: "Restaurant operations visibility platform for multi-location operators"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
