import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { BRANDFETCH_BASE_API, brandFetchConfig } from '../constants';

type Props = {};

const SlideStock = (props: Props) => {
  const router = useRouter();

  const getLogos = async (domain: string): Promise<string> => {
    const { data: response } = await axios.get(
      `${BRANDFETCH_BASE_API}${domain}`,
      brandFetchConfig,
    );
    return response.logos[0].formats[0].src;
  };

  return (
    <div
      className='bg-[#F6F7F9] flex flex-col rounded-2xl p-4 cursor-pointer transform hover:-translate-y-1 duration-300'
      onClick={() => router.push('/exchange/AAPL')}
    >
      <div className='flex justify-between'>
        <div className='bg-black rounded-full px-3 py-2 flex items-center'>
          <Image
            src='https://asset.brandfetch.io/idnrCPuv87/idwtRbtIxQ.png'
            alt='company logo'
            width={25}
            height={25}
            className='rounded-full'
          />
          <span className='text-white font-medium text-sm ml-2'>
            Apple, Inc
          </span>
        </div>
        <div className='flex flex-col items-end'>
          <span className='text-sm font-semibold'>AAPL</span>
          <span className='text-sm text-green-500'>+0.66%</span>
        </div>
      </div>
      <div className='flex justify-between mt-4 items-center'>
        <div className='flex flex-col'>
          <span className='text-gray-400 text-sm font-semibold'>Portfolio</span>
          <span className='text-base font-semibold'>15,215.70</span>
        </div>
        <Image
          src='/assets/placeholder-rise.png'
          alt='placeholder rise stock'
          width={120}
          height={70}
        />
      </div>
    </div>
  );
};

export default SlideStock;
