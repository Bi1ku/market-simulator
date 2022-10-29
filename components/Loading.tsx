import { Transition } from '@headlessui/react';
import Image from 'next/image';
import React from 'react';

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className='p-10 h-full grid place-items-center'>
      <Transition.Child
        enter='transition-opacity delay-100 duration-1000'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity delay-100 duration-1000'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <Image
          src='https://media.tenor.com/pgO8hZgOW5AAAAAM/loading-bar.gif'
          className='rounded-3xl'
          width={880}
          height={460}
          alt='loading'
        />
      </Transition.Child>
    </div>
  );
};

export default Loading;
