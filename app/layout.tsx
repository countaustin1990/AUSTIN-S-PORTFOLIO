import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from "sonner";
import Chatbot from '@/components/Chatbot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Augustine Akpokonyan | Web Developer & Digital Creator',
  description: 'Portfolio website showcasing the work and skills of Augustine Akpokonyan - a skilled web developer specializing in creating exceptional digital experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Chatbot />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}