'use client';

import { lusitana } from '../fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../button';
import Link from 'next/link';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, UserCredential } from 'firebase/auth';
import { auth, db, provider } from '../../lib/firebaseConnection';
import { useRouter } from 'next/navigation';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';

export default function LoginForm() {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string>('');

  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      if (user.emailVerified) {
        const userDoc = doc(db, 'unverified_users', user.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            createdAt: new Date().toISOString(),
          });
          await deleteDoc(userDoc);
          setSuccess('Sign-in successful!');
        }
        router.push('/dashboard');
      } else {
        setError('Please verify your email before signing in.');
      }
    } catch (err) {
      setError((err as Error).message);
      console.error(err);
    }
  }

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info.
      const user = result.user;
      router.push('/dashboard');
      console.log('User info:', user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <form onSubmit={handleSignin} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
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
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
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
        <Button type='submit' className="mt-4 w-full">
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <Button onClick={handleLogin} className="mt-4 w-full">
          Login with Google
        </Button>
        <div className='flex justify-end mt-[10px] text-gray-500 text-sm'>
          <Link href={'/register'}>
            Register
          </Link>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </div>
    </form>
  );
}
