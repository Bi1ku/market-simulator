import { Transition } from '@headlessui/react';
import type { NextPage } from 'next';

const Contact: NextPage = () => {
  return (
    <div className='p-10'>
      <Transition.Child
        enter='transition-opacity delay-100 duration-1000'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity delay-100 duration-1000'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      ></Transition.Child>
    </div>
  );
};

export default Contact;
