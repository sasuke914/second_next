'use client'

import Link from 'next/link';
import Image from 'next/image';
import './styles.css'

export default function Page() {

  return (
    <div>
      <main className="flex min-h-screen flex-col px-[22px] pt-[16px] lg:px-[135px] lg:pt-[32px]  bg-[#151718]">
        <div className='flex flex-row w-full mt-[20px]'>
          <div className='w-[100%] text-center lg:text-left lg:w-[55%] text-white '>
            <h1 className='text-gradient font-bold mb-[40px]' style={{ fontSize: 'clamp(40px,5vw,73px)' }}>Listen to sizzling sales scripts and level up</h1>
            <h2 className='font-normal leading-[30px] px-[42px] lg:px-0' style={{ fontSize: 'clamp(15px,2vw,24px)' }}>With BISH!, ambitious salespeople can listen to sales role plays on the go and get the scripts sent to their inbox. It's the go-to platform for those who want to open better, qualfy harder, and close more confidently</h2>
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
      <div className='block md:hidden w-[100%] h-auto bg-[#151718]'>
        <Image
          src="/player.png"
          alt="Geoway"
          width={1200}
          height={800}
          className="object-cover pt-[72px]"
        />
      </div>
    </div>
  );
}
