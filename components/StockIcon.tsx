import Image from 'next/image';
import React from 'react';

type Props = {};

const StockIcon = (props: Props) => {
  return (
    <div className='p-4 rounded-2xl grid grid-cols-2 bg-gray-100 transform hover:shadow-sm hover:-translate-y-2 duration-300 cursor-pointer mb-4'>
      <div className='flex items-center'>
        <Image
          src='https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/apple-512.png'
          alt='stock logo'
          height={30}
          width={30}
        />
        <div className='ml-2 text-xs'>
          <h6 className='font-bold'>S&P 500</h6>
          <span className='text-gray-600 font-medium'>4546.78</span>
        </div>
      </div>
      <div className='text-right text-xs flex flex-col justify-center'>
        <span className='text-green-500 font-bold text-sm'>+0.30%</span>
        <span className='text-green-400 font-bold'>+13.02</span>
      </div>
    </div>
  );
};

export default StockIcon;
