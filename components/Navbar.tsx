import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import StockIcon from './StockIcon';
import {
  BanknotesIcon,
  ChevronUpIcon,
  HomeIcon,
  NewspaperIcon,
  PhoneIcon,
  PresentationChartLineIcon,
} from '@heroicons/react/24/outline';
import { Disclosure, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { emptyUser } from '../constants';
import { localstored } from '@hookstate/localstored';
import { useHookstate } from '@hookstate/core';

type Props = {};

const Navbar = (props: Props) => {
  const router = useRouter();

  return (
    <div className='fixed h-screen p-5 shadow-xl bg-white'>
      {/* Logo Title */}
      <Image
        src='/assets/logo.jpg'
        alt='logo'
        height={30}
        width={140}
        onClick={() => router.push('/')}
        className='cursor-pointer'
        priority
      />

      {/* Trending Stocks */}
      <div className='mb-4'>
        <h6 className='uppercase text-gray-400 text-xs font-semibold mt-6 mb-4'>
          Trending Stocks
        </h6>
        <StockIcon />
        <StockIcon />
      </div>

      {/* Main Menu */}
      <div>
        <h6 className='uppercase text-gray-400 text-xs font-semibold mt-6 mb-4'>
          Main Menu
        </h6>
        <div
          className={`flex items-center p-2 mb-2 ${
            router.pathname === '/'
              ? 'bg-gray-100'
              : 'hover:bg-gray-100 duration-300 cursor-pointer'
          } rounded-lg ${router.pathname.includes('/auth')}`}
          onClick={() => router.push('/')}
        >
          <HomeIcon className='w-6 h-6 text-gray-400' />
          <span className='ml-3 text-sm text-gray-400 font-semibold'>Home</span>
        </div>
        <div
          className={`flex items-center p-2 mb-2 ${
            router.pathname === '/exchange'
              ? 'bg-gray-100'
              : 'hover:bg-gray-100 duration-300 cursor-pointer'
          } rounded-lg`}
          onClick={() => router.push('/exchange')}
        >
          <BanknotesIcon className='w-6 h-6 text-gray-400' />
          <span className='ml-3 text-sm text-gray-400 font-semibold'>
            Exchange
          </span>
        </div>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className='w-full'>
                <div
                  className={`flex items-center p-2 mb-2 ${
                    router.pathname.includes('/stocks_crypto')
                      ? 'bg-gray-100'
                      : 'hover:bg-gray-100 duration-300 cursor-pointer'
                  } rounded-lg`}
                >
                  <PresentationChartLineIcon className='w-6 h-6 text-gray-400' />
                  <span className='ml-3 text-sm text-gray-400 font-semibold'>
                    Stocks & Crypto
                  </span>
                  <ChevronUpIcon
                    className={`${
                      open ? '-rotate-180' : ''
                    } transform duration-300 w-4 h-4 ml-6 text-gray-400`}
                  />
                </div>
              </Disclosure.Button>
              <Transition
                enter='transition duration-300 ease-out'
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-300 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'
              >
                <Disclosure.Panel className='text-gray-500'>
                  <div className='flex'>
                    <div className='w-10 flex justify-center'>
                      <div className='vl' />
                    </div>
                    <div className='flex flex-col'>
                      <span
                        className={`ml-3 text-xs text-gray-400 font-semibold mb-4 ${
                          router.pathname === '/stocks_crypto/stocks'
                            ? 'text-green-500 cursor-default pointer-events-none'
                            : 'hover:text-green-500 duration-300 cursor-pointer'
                        }`}
                        onClick={() => router.push('/stocks_crypto/stocks')}
                      >
                        Stock Portfolio
                      </span>
                      <span
                        className={`ml-3 text-xs text-gray-400 font-semibold mb-4 ${
                          router.pathname === '/stocks_crypto/crypto'
                            ? 'text-green-500 cursor-default pointer-events-none'
                            : 'hover:text-green-500 duration-300 cursor-pointer'
                        }`}
                        onClick={() => router.push('/stocks_crypto/crypto')}
                      >
                        Crypto Portfolio
                      </span>
                      <span
                        className={`ml-3 text-xs text-gray-400 font-semibold mb-4 ${
                          router.pathname === '/stocks_crypto/capital'
                            ? 'text-green-500 cursor-default pointer-events-none'
                            : 'hover:text-green-500 duration-300 cursor-pointer'
                        }`}
                        onClick={() => router.push('/stocks_crypto/capital')}
                      >
                        Total Capital
                      </span>
                      <span
                        className={`ml-3 text-xs text-gray-400 font-semibold mb-4 ${
                          router.pathname === '/stocks_crypto/market'
                            ? 'text-green-500 cursor-default pointer-events-none'
                            : 'hover:text-green-500 duration-300 cursor-pointer'
                        }`}
                        onClick={() => router.push('/stocks_crypto/market')}
                      >
                        Market
                      </span>
                    </div>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
      <div>
        <h6 className='uppercase text-gray-400 text-xs font-semibold mt-6 mb-4'>
          Support
        </h6>
        <div
          className={`flex items-center p-2 mb-2 ${
            router.pathname === '/about'
              ? 'bg-gray-100'
              : 'hover:bg-gray-100 duration-300 cursor-pointer'
          } rounded-lg`}
          onClick={() => router.push('/about')}
        >
          <NewspaperIcon className='w-6 h-6 text-gray-400' />
          <span className='ml-3 text-sm text-gray-400 font-semibold'>
            About Us
          </span>
        </div>
        <div
          className={`flex items-center p-2 mb-2 ${
            router.pathname === '/contact'
              ? 'bg-gray-100'
              : 'hover:bg-gray-100 duration-300 cursor-pointer'
          } rounded-lg`}
          onClick={() => router.push('/contact')}
        >
          <PhoneIcon className='w-6 h-6 text-gray-400' />
          <span className='ml-3 text-sm text-gray-400 font-semibold'>
            Contact Us
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
