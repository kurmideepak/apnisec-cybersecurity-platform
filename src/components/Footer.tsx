
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-500">
                            ApniSec
                        </span>
                        <p className="mt-4 text-gray-400 max-w-sm">
                            Securing the digital frontier. Trusted by industry leaders for top-tier cybersecurity assessments and solutions.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Services</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link href="#" className="text-base text-gray-500 hover:text-white">Cloud Security</Link></li>
                            <li><Link href="#" className="text-base text-gray-500 hover:text-white">Reteam Assessment</Link></li>
                            <li><Link href="#" className="text-base text-gray-500 hover:text-white">VAPT</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link href="#" className="text-base text-gray-500 hover:text-white">About</Link></li>
                            <li><Link href="#" className="text-base text-gray-500 hover:text-white">Blog</Link></li>
                            <li><Link href="#" className="text-base text-gray-500 hover:text-white">Contact</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-8 text-center">
                    <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} ApniSec. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
