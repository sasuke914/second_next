'use client';

import Link from 'next/link';
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { lusitana } from '../fonts';
import { Button } from '../button';
import { auth, db } from '../../lib/firebaseConnection';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            console.log('User:', user);

            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                createdAt: new Date().toISOString(),
            });

            console.log('User created and data saved!');
            router.push('/login');
        } catch (err) {
            setError((err as Error).message);
            console.error(err);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form className="space-y-3" onSubmit={handleSignup}>
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className={`${lusitana.className} mb-3 text-2xl`}>Please register to continue.</h1>
                <div className="w-full">
                    <div>
                        <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="firstName">
                            First Name
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="firstName"
                                type="text"
                                name="firstName"
                                placeholder="Enter your First Name"
                                onChange={handleChange}
                                required
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div>
                        <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="lastName">
                            Last Name
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="lastName"
                                type="text"
                                name="lastName"
                                placeholder="Enter your Last Name"
                                onChange={handleChange}
                                required
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div>
                        <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                onChange={handleChange}
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                onChange={handleChange}
                                required
                                minLength={6}
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                <Button type="submit" className="mt-4 w-full">
                    Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </Button>
                <div className="flex justify-end mt-[10px] text-gray-500 text-sm">
                    <Link href={'/login'}>Already registered</Link>
                </div>
                <div className="flex h-8 items-end space-x-1">{error && <p>{error}</p>}</div>
            </div>
        </form>
    );
}
