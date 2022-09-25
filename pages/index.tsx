import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className='container'>
      <Head>
        <title>Nextjs Template</title>
        <meta
          name='description'
          content='Generated by a Nextjs typescript, prisma, and tailwind template'
        />
      </Head>
      <div className='p-5 grid place-items-center'>
        <span className='text-2xl'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, minima
          laborum? Vero laudantium saepe voluptas?
        </span>
      </div>
    </div>
  );
};

export default Home;
