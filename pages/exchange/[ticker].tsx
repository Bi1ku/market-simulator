import { Transition } from '@headlessui/react';
import axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ALPHA_VANTAGE_BASE_API } from '../../constants';

type Props = {};

const Ticker = (props: Props) => {
  const router = useRouter();
  const { ticker } = router.query;

  useEffect(() => {
    const fetchStockData = async () => {
      const response = await axios.get(
        `${ALPHA_VANTAGE_BASE_API}&function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=5min&outputsize=full`,
      );
      console.log(response);
    };
    fetchStockData();
  }, [ticker]);

  useEffect(() => {}, []);
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
        {ticker}
      </Transition.Child>
    </div>
  );
};

export default Ticker;
