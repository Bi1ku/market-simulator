import { Transition } from '@headlessui/react';
import Image from 'next/image';
import React from 'react';

type Props = {};

const PageNotFound = (props: Props) => {
  return (
    <div className='p-10 h-full grid place-items-center'>
      <Transition.Child
        enter='transition-opacity delay-100 duration-1000'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity delay-100 duration-1000'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
        className='grid place-items-center'
      >
        <div>
          <h1 className='glitch text-gray-100'>
            <span aria-hidden='true'>404 → Page Not Found</span>
            404 → Page Not Found
            <span aria-hidden='true'>404 → Page Not Found</span>
          </h1>
        </div>
      </Transition.Child>
    </div>
  );
};

export default PageNotFound;
