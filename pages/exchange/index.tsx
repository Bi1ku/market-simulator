import { Transition } from '@headlessui/react';
import type { NextPage } from 'next';
import SlideStock from '../../components/SlideStock';

const Exchange: NextPage = () => {
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
        <h2 className='font-semibold text-lg mb-5'>Your Watchlist 👀</h2>
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
        <h2 className='font-semibold text-lg mb-5 mt-5'>Trending Stocks 🚀</h2>
        <div className='bg-white p-4 rounded-2xl grid grid-cols-3 gap-4'>
          <SlideStock />
          <SlideStock />
          <SlideStock />
        </div>
      </Transition.Child>
    </div>
  );
};

export default Exchange;
