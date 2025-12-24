'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error("Failed to check auth status", error);
            }
        };
        checkAuth();
    }, []);

    return (
        <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-500">
                            ApniSec
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="#services" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Services
                            </Link>
                            <Link href="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                About
                            </Link>
                            <Link href="/contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>
                    <div>
                        {isLoggedIn ? (
                            <Link
                                href="/dashboard"
                                className="bg-button-gradient hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-lg shadow-blue-500/30 transition-all border border-blue-500/50"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="bg-button-gradient hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-lg shadow-blue-500/30 transition-all"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
