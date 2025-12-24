
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowRightOnRectangleIcon,
    PlusIcon,
    TrashIcon,
    FunnelIcon,
    ExclamationTriangleIcon,
    CloudIcon,
    ShieldCheckIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline';

interface User {
    id: string;
    name: string;
    email: string;
}

interface Issue {
    id: string;
    type: 'CLOUD_SECURITY' | 'RETEAM_ASSESSMENT' | 'VAPT';
    title: string;
    description: string;
    priority?: string;
    status?: string;
    createdAt: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState<string>('');

    // Form State
    const [newIssue, setNewIssue] = useState({
        title: '',
        description: '',
        type: 'CLOUD_SECURITY',
        priority: 'medium',
        status: 'open'
    });
    const [isCreating, setIsCreating] = useState(false);
    const [creationError, setCreationError] = useState('');

    // Initial Data Fetch
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch User
                const userRes = await fetch('/api/auth/me');
                if (!userRes.ok) throw new Error('Unauthorized');
                const userData = await userRes.json();
                setUser(userData);

                // Fetch Issues
                await fetchIssues();
            } catch (error) {
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [router]);

    const fetchIssues = async (type?: string) => {
        let url = '/api/issues';
        if (type) url += `?type=${type}`;

        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            setIssues(data);
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value;
        setFilterType(type);
        fetchIssues(type === 'ALL' ? undefined : type);
    };

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    const createIssue = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreating(true);
        setCreationError('');

        try {
            const res = await fetch('/api/issues', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newIssue)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create issue');
            }

            setNewIssue({ title: '', description: '', type: 'CLOUD_SECURITY', priority: 'medium', status: 'open' });
            fetchIssues(filterType === 'ALL' ? undefined : filterType);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'An error occurred';
            setCreationError(message);
        } finally {
            setIsCreating(false);
        }
    };

    const deleteIssue = async (id: string) => {
        if (!confirm('Are you sure you want to delete this issue?')) return;

        const res = await fetch(`/api/issues/${id}`, { method: 'DELETE' });
        if (res.ok) {
            setIssues(issues.filter(i => i.id !== id));
        } else {
            alert('Failed to delete issue');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Top Navigation */}
            <nav className="bg-black/50 border-b border-gray-800 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/dashboard" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-500 hover:opacity-80 transition-opacity">
                                ApniSec Dashboard
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-white">{user?.name}</p>
                                <p className="text-xs text-gray-400">{user?.email}</p>
                            </div>
                            <Link
                                href="/profile"
                                className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                                title="My Profile"
                            >
                                <UserCircleIcon className="h-6 w-6" />
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                                title="Logout"
                            >
                                <ArrowRightOnRectangleIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

                {/* Create Issue Section */}
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-8">
                        <h3 className="text-lg font-medium leading-6 text-white mb-4 flex items-center">
                            <PlusIcon className="h-5 w-5 mr-2 text-green-400" />
                            Report New Issue
                        </h3>
                        <form onSubmit={createIssue} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-400">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={newIssue.title}
                                    onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-400">Description</label>
                                <textarea
                                    rows={3}
                                    required
                                    value={newIssue.description}
                                    onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400">Type</label>
                                <select
                                    value={newIssue.type}
                                    onChange={(e) => setNewIssue({ ...newIssue, type: e.target.value })}
                                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    <option value="CLOUD_SECURITY">Cloud Security</option>
                                    <option value="RETEAM_ASSESSMENT">Reteam Assessment</option>
                                    <option value="VAPT">VAPT</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400">Priority</label>
                                <select
                                    value={newIssue.priority}
                                    onChange={(e) => setNewIssue({ ...newIssue, priority: e.target.value })}
                                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="critical">Critical</option>
                                </select>
                            </div>

                            <div className="md:col-span-2 flex items-center justify-between">
                                {creationError && <span className="text-red-400 text-sm">{creationError}</span>}
                                <button
                                    type="submit"
                                    disabled={isCreating}
                                    className="ml-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                                >
                                    {isCreating ? 'Submitting...' : 'Submit Issue'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Issues List */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-white">Issues</h2>
                        <div className="flex items-center">
                            <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <select
                                value={filterType}
                                onChange={handleFilterChange}
                                className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                            >
                                <option value="ALL">All Types</option>
                                <option value="CLOUD_SECURITY">Cloud Security</option>
                                <option value="RETEAM_ASSESSMENT">Reteam Assessment</option>
                                <option value="VAPT">VAPT</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-gray-800 shadow overflow-hidden sm:rounded-md border border-gray-700">
                        <ul role="list" className="divide-y divide-gray-700">
                            {issues.length === 0 ? (
                                <li className="px-6 py-10 text-center text-gray-400">
                                    No issues found. Create one above!
                                </li>
                            ) : (
                                issues.map((issue) => (
                                    <li key={issue.id} className="hover:bg-gray-750 transition-colors">
                                        <div className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 mr-4">
                                                        {issue.type === 'CLOUD_SECURITY' && <CloudIcon className="h-8 w-8 text-blue-400" />}
                                                        {issue.type === 'RETEAM_ASSESSMENT' && <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500" />}
                                                        {issue.type === 'VAPT' && <ShieldCheckIcon className="h-8 w-8 text-red-500" />}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-blue-400 truncate">{issue.title}</p>
                                                        <p className="flex items-center text-sm text-gray-400 mt-1">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${issue.priority === 'critical' ? 'bg-red-100 text-red-800' :
                                                                    issue.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                                                        'bg-green-100 text-green-800'}`}>
                                                                {issue.priority}
                                                            </span>
                                                            <span className="ml-2 text-xs text-gray-500">
                                                                {new Date(issue.createdAt).toLocaleDateString()}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <div className="text-sm text-gray-400">
                                                        {issue.status}
                                                    </div>
                                                    <button
                                                        onClick={() => deleteIssue(issue.id)}
                                                        className="text-red-400 hover:text-red-300 p-2"
                                                        title="Delete"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-sm text-gray-300">
                                                <p>{issue.description}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}
