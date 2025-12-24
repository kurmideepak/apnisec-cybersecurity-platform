
import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
    return (
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-bg.png"
                    alt="Cybersecurity Background"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
            </div>

            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 animate-fade-in-up">
                    <span className="block">Secure Your Digital</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">
                        Fortress with ApniSec
                    </span>
                </h1>
                <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                    The next-generation platform for comprehensive cybersecurity assessments.
                    Manage vulnerabilities, track remediation, and ensure compliance effortlessly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/register"
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-lg shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105"
                    >
                        Get Started
                    </Link>
                    <Link
                        href="#services"
                        className="px-8 py-4 bg-transparent border border-gray-500 hover:border-white text-gray-300 hover:text-white text-lg font-bold rounded-lg transition-all"
                    >
                        Explore Services
                    </Link>
                </div>
            </div>
        </div>
    );
}
