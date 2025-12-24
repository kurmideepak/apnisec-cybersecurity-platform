
import { CloudIcon, ShieldCheckIcon, BugAntIcon } from '@heroicons/react/24/outline'; // Assuming you have heroicons installed or similar

export function Services() {
    const services = [
        {
            title: 'Cloud Security',
            description: 'Comprehensive assessment of your cloud infrastructure (AWS, Azure, GCP) to identify misconfigurations.',
            icon: CloudIcon,
            color: 'text-blue-400',
        },
        {
            title: 'Reteam Assessment',
            description: 'Simulate real-world attacks to test your defense capabilities and incident response.',
            icon: ShieldCheckIcon,
            color: 'text-green-400',
        },
        {
            title: 'VAPT',
            description: 'Vulnerability Assessment and Penetration Testing for web, mobile, and network assets.',
            icon: BugAntIcon,
            color: 'text-red-400',
        },
    ];

    return (
        <div id="services" className="py-24 bg-black relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">Our Expertise</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                        Complete Security Solutions
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
                        We provide end-to-end security services tailored to protect your critical assets.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {services.map((service) => (
                        <div
                            key={service.title}
                            className="relative p-8 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-blue-500/50 transition-colors group"
                        >
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-full blur-2xl group-hover:from-blue-500/20 group-hover:to-green-500/20 transition-all"></div>
                            <service.icon className={`h-12 w-12 ${service.color} mb-6`} />
                            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
