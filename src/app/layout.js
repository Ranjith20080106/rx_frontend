import "./globals.css";

export const metadata = {
  title: "ResumeX | Full-Stack ATS Resume Analytics",
  description: "Optimize resume keywords and match scoring using in-browser AI sentence embeddings.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          precedence="default"
        />
      </head>
      <body className="light-theme">
        {children}
      </body>
    </html>
  );
}
