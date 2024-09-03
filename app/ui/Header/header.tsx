import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { LuMenu, LuUser2 } from 'react-icons/lu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../sheet";
import { auth } from "@/app/lib/firebaseConnection";
import Link from "next/link";

export default function Header() {
    const [activeIndex, setActiveIndex] = useState(null);
    const navData = [
        {
            title: "Solution",
        },
        {
            title: "Resources"
        },
        {
            title: "Pricing"
        }
    ]

    const handleLogout = () => {
        auth.signOut().then(() => {
            console.log("User logged out");
        });
    };

    return (
        <div className='flex flex-row items-center justify-between text-white'>
            <p className='text-[24px] font-semibold leading-[20.37px] text-left'>Specify</p>
            <div className='hidden lg:flex flex-row justify-between gap-12'>
                {navData.map((item, index) => (
                    <div key={index} className='flex flex-row items-center gap-2'>
                        <p>{item.title}</p>
                        {index !== 2 && <FaChevronDown
                            className={`chevron-icon ${activeIndex ? "chevron-rotated" : ""
                                }`}
                        />
                        }
                    </div>
                ))}
            </div>
            <div className='hidden lg:flex flex-row items-center gap-3'>
                <Link href={'/login'} className='px-[41px] py-[12px] gap-[10px] rounded-[16px] border-[2px] text-[16px] font-semibold'>
                    Sign in
                </Link>
                <Link href={'/dashboard'} className='px-[66px] py-[12px] gap-[10px] rounded-[16px] border-[2px] text-[16px] border-transparent font-semibold bg-[#7867E3]'>
                    Start for free
                </Link>
                <button onClick={handleLogout} className='px-[41px] py-[12px] gap-[10px] rounded-[16px] border-[2px] text-[16px] font-semibold'>
                    Log Out
                </button>
            </div>
            <div className="inline-block cursor-pointer lg:hidden">
                <Sheet>
                    <SheetTrigger>
                        <LuMenu size={32} />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle className='text-white'>Menu</SheetTitle>
                            <div className="py-4 flex justify-center text-white">
                                <Link href={'/login'} className='px-[41px] py-[12px] gap-[10px] rounded-[16px] border-[2px] text-[16px] font-semibold'>
                                    Sign in
                                </Link>
                            </div>
                            <div className="pt-4 text-white flex justify-center">
                                <ul className="h-full space-y-2 ">
                                    {navData.map((item, index) => (
                                        <Link href={'/'} key={index} className='regular-18 text-gray-50 flexCenter flex flex-col cursor-pointer pb-1.5 transition-all hover:font-bold'>
                                            {item.title}
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}