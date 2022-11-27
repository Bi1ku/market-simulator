import { Transition } from '@headlessui/react';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { NameType } from 'recharts/types/component/DefaultTooltipContent';
import { useHookstate } from '@hookstate/core';
import { customAxios, globalLoading } from '../../constants';
import { StockData } from '@prisma/client';

type BaseValueType = number | 'auto' | 'dataMin' | 'dataMax';
type Props = {};
interface ChartData {
  name: string;
  open: string;
  high: string;
  low: string;
  close: string;
}

const StockToolTip = ({
  active,
  payload,
  label,
}: TooltipProps<BaseValueType, NameType>) => {
  if (active) {
    return (
      <div className='bg-gray-200 p-4 rounded-lg'>
        <p className='text-lg text-semibold mb-2 underline underline-offset-4'>{`${label}`}</p>
        <p className='desc'>{`Open: ${payload?.[0].payload.open}`}</p>
        <p className='desc'>{`Close: ${payload?.[0].payload.close}`}</p>
        <p className='desc'>{`High: ${payload?.[0].payload.high}`}</p>
        <p className='desc'>{`Low: ${payload?.[0].payload.low}`}</p>
      </div>
    );
  }

  return null;
};

type Periods = '30_DAYS' | '90_DAYS' | '180_DAYS';

const Ticker = (props: Props) => {
  const router = useRouter();
  const { ticker } = router.query;
  const [chartData, setChartData] = useState<ChartData[]>();
  const loading = useHookstate(globalLoading);
  const [period, setPeriod] = useState<Periods>('90_DAYS');

  useEffect(() => {
    const fetchStockData = async () => {
      loading.set(true);
      const { data: response } = await customAxios.get('/stocks', {
        params: { ticker },
      });
      setChartData(
        response.data.stockData.sort(
          (a: StockData, b: StockData) => +new Date(a.date) - +new Date(b.date),
        ),
      );
      loading.set(false);
    };
    if (ticker && !chartData) fetchStockData();
  }, [ticker]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTimePeriod = (period: Periods) => {
    if (period === '90_DAYS') {
      return chartData?.slice(chartData.length - 90, chartData.length);
    } else if (period === '180_DAYS') {
      return chartData;
    } else if (period === '30_DAYS') {
      return chartData?.slice(chartData.length - 30, chartData.length);
    }
  };

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
        <div className='w-4/12 bg-white rounded-3xl flex justify-between mb-4 ml-auto'>
          <div
            className={`w-full p-4 rounded-l-xl bg-white hover:bg-gray-50 duration-300 cursor-pointer grid place-items-center ${
              period === '30_DAYS' && 'bg-gray-50'
            }`}
            onClick={() => setPeriod('30_DAYS')}
          >
            30 Days
          </div>
          <div
            className={`w-full p-4 cursor-pointer bg-white hover:bg-gray-50 duration-300 cursor-pointe grid place-items-center ${
              period === '90_DAYS' && 'bg-gray-50'
            }`}
            onClick={() => setPeriod('90_DAYS')}
          >
            90 Days
          </div>
          <div
            className={`w-full p-4 bg-white rounded-r-xl hover:bg-gray-50 duration-300 cursor-pointer grid place-items-center ${
              period === '180_DAYS' && 'bg-gray-50'
            }`}
            onClick={() => setPeriod('180_DAYS')}
          >
            180 Days
          </div>
        </div>
        <div className='px-4 py-10 bg-white rounded-3xl'>
          <ResponsiveContainer width='99%' height={400}>
            <AreaChart
              data={handleTimePeriod(period)}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <Line type='monotone' dataKey='open' stroke='#8884d8' />
              <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
              <XAxis dataKey='date' dy={15} minTickGap={75} />
              <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
              <Tooltip content={<StockToolTip />} />
              <defs>
                <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type='monotone'
                dataKey='open'
                stroke='#8884d8'
                fillOpacity={1}
                fill='url(#color)'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Transition.Child>
    </div>
  );
};

export default Ticker;
