import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { Transition } from '@headlessui/react';
import { useEffect, useInsertionEffect, useState } from 'react';
import { useHookstate } from '@hookstate/core';
import { useRouter } from 'next/router';
import Loading from '../components/Loading';
import { customAxios, globalLoading, globalNotification } from '../constants';
import Notification from '../components/Notification';

function MyApp({ Component, pageProps }: AppProps) {
  const loading = useHookstate(globalLoading);
  const [isMount, setIsMount] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem('id');

    const checkValidUser = async () => {
      const user = await customAxios.get(
        `/users/${localStorage.getItem('id')}`,
      );
      if (user.data.success) {
        localStorage.setItem('user', JSON.stringify(user.data.user));
        setIsMount(true);
      } else router.push('/auth/login');
    };
    if (id) checkValidUser();
    else router.push('/auth/login');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Notification />
      {router.pathname.startsWith('/auth') ? (
        <Transition show={isMount}>
          <div className='h-screen grid place-items-center'>
            <Component {...pageProps} />
          </div>
        </Transition>
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
            {loading.value && <Loading />}
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
