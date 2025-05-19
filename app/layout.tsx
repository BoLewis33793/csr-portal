import './globals.css';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className="{`${inter.className} antialiased`} bg-dark-400">
          {children}
        </body>
      </html>
  );
}

