'use client';

import { lusitana } from '../../fonts';
import {
    AtSymbolIcon,
    KeyIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/app/lib/firebaseConnection';
import { useRouter } from 'next/navigation';
import { setDoc, doc, addDoc, collection } from 'firebase/firestore';

import { Button } from '../../button';

interface BlogFormProps {
    setRoute: React.Dispatch<React.SetStateAction<number>>;
}

const BlogForm: React.FC<BlogFormProps> = ({ setRoute }) => {
    const [formData, setFormData] = useState<{ title: string; content: string }>({
        title: '',
        content: '',
    });
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            const docRef = await addDoc(collection(db, 'blogs'), {
                title: formData.title,
                content: formData.content,
                createdAt: new Date().toISOString()
            });
            console.log("Document written with ID: ", docRef.id);
            setRoute(0)
        } catch (err) {
            setError((err as Error).message);
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleCreate} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                    Please insert to continue.
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="title"
                        >
                            Title
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="title"
                                type="text"
                                name="title"
                                placeholder="Enter your title"
                                onChange={handleChange}
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="content"
                        >
                            Content
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="content"
                                type="text"
                                name="content"
                                placeholder="Enter content"
                                onChange={handleChange}
                                required
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                <Button type="submit" className="mt-4 w-full">
                    Create <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </Button>
                <div className='flex justify-end mt-[10px] text-gray-500 text-sm'>
                    <Button onClick={() => { setRoute(0) }}>
                        Back
                    </Button>
                </div>
                <div className="flex h-8 items-end space-x-1">
                    {/* Add form errors here */}
                </div>
            </div>
        </form>
    );
};

export default BlogForm;
