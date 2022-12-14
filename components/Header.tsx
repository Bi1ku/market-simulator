import React from 'react';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useHookstate } from '@hookstate/core';
import { localstored } from '@hookstate/localstored';
import { emptyUser } from '../constants';
import { formatFullName } from '../helpers';

type Props = {};

const Header = (props: Props) => {
  const user = useHookstate(emptyUser, localstored({ key: 'user' }));

  return (
    <div className='flex items-center justify-between px-8 pb-5 pt-5 shadow-lg bg-white'>
      <div className='bg-gray-50 relative rounded-xl shadow-sm w-4/12 p-3'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <MagnifyingGlassIcon className='w-4 h-4 text-gray-600' />
        </div>
        <input
          type='text'
          name='price'
          id='price'
          className='bg-gray-50 block w-full rounded-xl border-gray-300 pl-7 pr-12 sm:text-sm font-medium placeholder-gray-400 truncate'
          placeholder='Search for stocks & more'
          aria-describedby='price-currency'
        />
      </div>
      <div>
        <div className='flex'>
          <div className='w-[40px] h-[40px] bg-gray-200 rounded-full grid place-items-center mr-4 hover:-translate-y-1 duration-300 cursor-pointer'>
            <div className='w-[40px] h-[40px] grid place-items-center hover:animate-wiggle'>
              <BellIcon className='w-6 h-6 text-gray-500' />
            </div>
          </div>
          <Image
            src='/assets/placeholder-profile.png'
            alt='placeholder profile picture'
            height={40}
            width={40}
            className='rounded-full'
            priority
          />
          <div className='ml-3 flex flex-col justify-center'>
            <span className='text-gray-600 font-semibold text-sm'>
              {formatFullName(user.value)}
            </span>
            <span className='text-gray-400 text-xs font-semibold'>
              {user.value.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
