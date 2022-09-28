import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);
  }, []);
  return (
    <>
      <Transition
        show={isMount}
        enter='transition-opacity duration-500'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-500'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <Navbar />
        <div className='h-screen ml-[253px] bg-[#F6F7F9]'>
          <Header />
          <Component {...pageProps} />
        </div>
      </Transition>
    </>
  );
}

export default MyApp;
