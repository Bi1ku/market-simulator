import { Transition } from '@headlessui/react';
import {
  ArrowTopRightOnSquareIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ReceiptPercentIcon,
} from '@heroicons/react/24/outline';
import type { NextPage } from 'next';
import SlideStock from '../components/SlideStock';

const Home: NextPage = () => {
  return (
    <div className='p-10'>
      <Transition.Child
        enter='transition-opacity delay-100 duration-1000'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity delay-100 duration-1000'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <h2 className='font-semibold text-lg mb-5'>Your Stock Portfolio 📈</h2>
        <div className='bg-white p-4 rounded-2xl grid grid-cols-3 gap-4'>
          <SlideStock />
          <SlideStock />
          <SlideStock />
        </div>
      </Transition.Child>
      <Transition.Child
        enter='transition-opacity delay-200 duration-1000'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity delay-200 duration-1000'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <h2 className='font-semibold text-lg mb-5 mt-5'>
          Your Crypto Portfolio ⚡️
        </h2>
        <div className='bg-white p-4 rounded-2xl grid grid-cols-3 gap-4'>
          <SlideStock />
          <SlideStock />
          <SlideStock />
        </div>
      </Transition.Child>
      <Transition.Child
        enter='transition-opacity delay-300 duration-1000'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity delay-300 duration-1000'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='grid grid-cols-4 gap-4 mt-5'>
          <div className='bg-white h-full w-full rounded-xl p-4 flex items-center justify-between'>
            <span className='font-semibold text-gray-500 text-sm uppercase'>
              Global Market Cap
              <div className='text-xl mt-2 font-semibold text-black'>
                $41.239 M
              </div>
            </span>
            <ChartBarIcon className='w-10 h-10 text-gray-400' />
          </div>
          <div className='bg-white h-full w-full rounded-xl p-4 flex items-center justify-between'>
            <span className='font-semibold text-gray-500 text-sm uppercase'>
              Total Profits
              <div className='text-xl mt-2 font-semibold text-green-600'>
                +$42,145
              </div>
            </span>
            <CurrencyDollarIcon className='w-10 h-10 text-gray-400' />
          </div>
          <div className='bg-white h-full w-full rounded-xl p-4 flex items-center justify-between'>
            <span className='font-semibold text-gray-500 text-sm uppercase'>
              Growth Percentage
              <div className='text-xl mt-2 font-semibold text-green-600'>
                +3.06%
              </div>
            </span>
            <ReceiptPercentIcon className='w-10 h-10 text-gray-400' />
          </div>
          <a
            className='bg-white h-full w-full rounded-xl p-4 flex items-center justify-between cursor-pointer'
            href='https://www.marketwatch.com/'
            target='_blank'
            rel='noreferrer'
          >
            <div className='font-semibold text-gray-500 text-sm'>
              <span className='uppercase'>News</span>
              <div className='text-sm mt-2 font-semibold text-black'>
                Get the latest news from the market!
              </div>
            </div>
            <ArrowTopRightOnSquareIcon className='w-10 h-10 text-gray-400' />
          </a>
        </div>
      </Transition.Child>
    </div>
  );
};

export default Home;
