'use client';
import { useContext, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { LuMenu, LuUser2 } from 'react-icons/lu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../sheet";
import { auth } from "@/app/lib/firebaseConnection";
import Link from "next/link";
import { AuthContext } from "@/app/lib/contexts/authContext";
import { useRouter } from "next/navigation";

export default function Header() {
    const { signed } = useContext(AuthContext);
    const [activeIndex, setActiveIndex] = useState(null);
    const navData = [
        {
            title: "Home",
            route: '/'
        },
        {
            title: "Episodes",
            route: '/dashboard/episodes'
        },
        {
            title: "About",
            route: '/about'
        },
        {
            title: "Pricing",
            route: '/dashboard/pricing'
        },
        {
            title: "Blogs",
            route: '/dashboard/blog'
        },
    ]

    const router = useRouter();

    const handleLogout = async () => {
        await auth.signOut().then((data) => {
            console.log("User logged out");
        });
    };

    const handleClick = () => {
        router.push('/')
    }

    return (
        <div className='flex flex-row items-center justify-between text-white bg-[#151718] px-[22px] py-[15px] lg:px-[120px] lg:py-[30px]'>

            <button onClick={handleClick} className='font-semibold leading-[20.37px] text-left pr-[73px]'><LuUser2 size={50} /></button>
            <div className='hidden lg:flex flex-row justify-between items-center h-[50px] p-[5px] rounded-[50px] bg-[#ffffff1a] text-[14px] gap-[20px]'>
                {navData.map((item, index) => (
                    <Link href={item.route} key={index} className='flex flex-row items-center gap-2 px-[30px] py-[8px] rounded-[50px] hover:opacity-100 hover:bg-white hover:text-black hover:scale-105 transition duration-300 ease-in-out'>
                        <p>{item.title}</p>
                        {/* {index !== 2 && <FaChevronDown
                            className={`chevron-icon ${activeIndex ? "chevron-rotated" : ""
                                }`}
                        />
                        } */}
                    </Link>
                ))}
            </div>
            {
                signed ? <button onClick={handleLogout} className='px-[40px] py-[10px] rounded-[50px] bg-[#ffffff1a] text-[14px] font-semibold hover:opacity-100 hover:bg-white hover:text-black hover:scale-105 transition duration-300 ease-in-out'>
                    Log Out
                </button> :
                    <div className='hidden lg:flex flex-row items-center h-[40px] gap-[20px] p-[5px]'>
                        <Link href={'/login'} className='px-[40px] py-[10px] rounded-[50px] bg-[#ffffff1a] text-[14px] font-semibold hover:opacity-100 hover:bg-white hover:text-black hover:scale-105 transition duration-300 ease-in-out'>
                            Log in
                        </Link>
                        <Link href={'/register'} className='px-[40px] py-[10px] rounded-[50px]  text-[14px] font-semibold bg-[#7867E3] hover:opacity-100 hover:bg-white hover:text-black hover:scale-105 transition duration-300 ease-in-out'>
                            Sign Up
                        </Link>
                    </div>
            }

            <div className="inline-block cursor-pointer lg:hidden">
                <Sheet>
                    <SheetTrigger>
                        <LuMenu size={32} />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle className='text-white'>Menu</SheetTitle>
                            {
                                signed ? <div className="py-4 flex justify-center text-white">
                                    <button onClick={handleLogout} className='px-[41px] py-[12px] gap-[10px] rounded-[16px] border-[2px] text-[16px] font-semibold'>
                                        Log Out
                                    </button>
                                </div> : <div className="py-4 flex justify-center text-white">
                                    <Link href={'/login'} className='px-[41px] py-[12px] gap-[10px] rounded-[16px] border-[2px] text-[16px] font-semibold'>
                                        Sign in
                                    </Link>
                                </div>
                            }
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