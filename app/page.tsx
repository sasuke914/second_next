'use client'

import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from './ui/fonts';
import Image from 'next/image';
import { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { LuMenu, LuUser2 } from 'react-icons/lu'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import './styles.css'

export default function Page() {
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
  return (
    <div>
      <main className="flex min-h-screen flex-col px-[32px] pt-[16px] lg:px-[135px] lg:pt-[32px]  bg-[#151718]">
        {/* <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image src='/hero-desktop.png' width={1000} height={760} className='hidden md:block' alt='Screenshots' />
          <Image src='/hero-mobile.png' width={560} height={620} className='block md:hidden' alt='Screenshots' />
        </div>
      </div> */}
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
            <button className='px-[41px] py-[12px] gap-[10px] rounded-[16px] border-[2px] text-[16px] font-semibold'>
              Sign in
            </button>
            <Link href={'/dashboard'} className='px-[66px] py-[12px] gap-[10px] rounded-[16px] border-[2px] text-[16px] border-transparent font-semibold bg-[#7867E3]'>
              Start for free
            </Link>
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
                    <button className='px-[41px] py-[12px] gap-[10px] rounded-[16px] border-[2px] text-[16px] font-semibold'>
                      Sign in
                    </button>
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
        <div className='flex flex-row w-full mt-[66px]'>
          <div className='w-[100%] text-center lg:text-left lg:w-[55%] text-white '>
            <h1 className='text-gradient font-bold mb-[40px]' style={{ fontSize: 'clamp(40px,5vw,73px)' }}>Listen to sizzling sales scripts and level up</h1>
            <h2 className='font-normal leading-[30px] px-[35px] lg:px-0' style={{ fontSize: 'clamp(15px,2vw,24px)' }}>With BISH!, ambitious salespeople can listen to sales role plays on the go and get the scripts sent to their inbox. It's the go-to platform for those who want to open better, qualfy harder, and close more confidently</h2>
            <Link href={'/dashboard'}>
              <button className='px-[40px] py-[16px] mt-[48px] gap-[10px] rounded-[16px] border-[2px] text-[18px] border-transparent font-semibold bg-[#7867E3]'>
                Start for free
              </button>
            </Link>
          </div>
          <div className='hidden lg:block p-[10px] w-[45%] h-auto'>
            <Image
              src="/player.png"
              alt="Geoway"
              width={1200}
              height={800}
              className="object-cover"
            />
          </div>
        </div>
        <div className='flex flex-row w-full mt-[92px]'>
          <div className='hidden lg:block p-[10px] w-[45%] h-auto'>
            <Image
              src="/player.png"
              alt="Geoway"
              width={1200}
              height={800}
              className="object-cover"
            />
          </div>
          <div className='w-[100%] text-center lg:text-left lg:w-[55%] text-white ml-[32px] '>
            <h1 className='text-gradient font-bold mb-[40px]' style={{ fontSize: 'clamp(32px,5vw,70px)' }}>Want to know how to open better? BISH! has got you.</h1>
            <h2 className='font-normal leading-[30px] text-[24px] mb-[48px] px-[35px] lg:px-0'>There a number a of ways to handle your next big sales call. Listen to them all on BISH! and be inspired.</h2>
            <h2 className='font-normal leading-[30px] text-[18px] px-[35px] lg:px-0'>BISH! is jam packed with inspirational audio clips to help sales execs nail their next call</h2>
          </div>
        </div>
      </main>
      <div className='block md:hidden w-[100%] h-auto'>
        <Image
          src="/player.png"
          alt="Geoway"
          width={1200}
          height={800}
          className="object-cover"
        />
      </div>
    </div>
  );
}
