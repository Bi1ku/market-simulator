import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <div className='h-screen ml-[253px] bg-[#F6F7F9]'>
        <Header />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
