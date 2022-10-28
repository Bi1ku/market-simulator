import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { hookstate, useHookstate } from '@hookstate/core';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const globalLoading = hookstate(false);
export const globalAuth = hookstate(false);

function MyApp({ Component, pageProps }: AppProps) {
  const loading = useHookstate(globalLoading);
  const [isMount, setIsMount] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsMount(true);
  }, []);
  return (
    <>
      {router.pathname.startsWith('/auth') ? (
        <div className='h-screen grid place-items-center'>
          <Component {...pageProps} />{' '}
        </div>
      ) : (
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
          <div className='h-screen flex flex-col ml-[253px] bg-[#F6F7F9]'>
            <Header />
            {loading.value && (
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
            )}
            <div className={loading.value ? 'hidden' : ''}>
              <Component {...pageProps} />
            </div>
          </div>
        </Transition>
      )}
    </>
  );
}

export default MyApp;
