
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'ApniSec - Advanced Cybersecurity Solutions',
  description: 'ApniSec provides top-tier Cloud Security, Reteam Assessments, and VAPT services to secure your digital infrastructure.',
  keywords: ['Cybersecurity', 'VAPT', 'Cloud Security', 'Reteam', 'Penetration Testing'],
  openGraph: {
    title: 'ApniSec - Secure Your Digital Fortress',
    description: 'Comprehensive cybersecurity assessments and solutions.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white">
      <Navbar />
      <Hero />
      <Services />
      <Footer />
    </main>
  );
}
