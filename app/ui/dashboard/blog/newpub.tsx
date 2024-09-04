'use client';

import { lusitana } from '../../fonts';
import {
    AtSymbolIcon,
    KeyIcon,
    CameraIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/app/lib/firebaseConnection';

import { Button } from '../../button';

interface BlogFormProps {
    setRoute: React.Dispatch<React.SetStateAction<number>>;
}

const BlogForm: React.FC<BlogFormProps> = ({ setRoute }) => {
    const [formData, setFormData] = useState<{ title: string; content: string; file: File | null }>({
        title: '',
        content: '',
        file: null
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, file: e.target.files[0] });
        }
    };

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            let imageUrl = '';
            if (formData.file) {
                // Upload image
                const fileRef = ref(storage, `images/${Date.now()}_${formData.file.name}`);
                const snapshot = await uploadBytes(fileRef, formData.file);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            // Add document with image URL
            const docRef = await addDoc(collection(db, 'blogs'), {
                title: formData.title,
                content: formData.content,
                imageUrl,
                createdAt: new Date().toISOString()
            });
            console.log("Document written with ID: ", docRef.id);
            setRoute(0);
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
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="file"
                        >
                            Image
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="file"
                                type="file"
                                name="file"
                                onChange={handleFileChange}
                            />
                            <CameraIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                {error && (
                    <div className="mt-2 text-red-600">
                        {error}
                    </div>
                )}
            </div>
        </form>
    );
};

export default BlogForm;
