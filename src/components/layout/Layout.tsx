import { Header } from './Header';
import { Footer } from './Footer';
import { DarkModeToggle } from '../common/DarkModeToggle';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
      <DarkModeToggle />
    </div>
  );
}
