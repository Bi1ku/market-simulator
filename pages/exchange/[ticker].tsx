import { Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
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
import { globalLoading } from '../_app';
import { customAxios } from '../../constants';

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

const tabs = [
  { name: 'My Account', href: '#', current: false },
  { name: 'Company', href: '#', current: false },
  { name: 'Team Members', href: '#', current: true },
  { name: 'Billing', href: '#', current: false },
];

type Periods = '3_MONTHS' | '1_YEAR' | '1_MONTH';

const Ticker = (props: Props) => {
  const router = useRouter();
  const { ticker } = router.query;
  const [chartData, setChartData] = useState<ChartData[]>();
  const loading = useHookstate(globalLoading);
  const [period, setPeriod] = useState<Periods>('3_MONTHS');

  useEffect(() => {
    const fetchStockData = async () => {
      loading.set(true);
      const data = await customAxios.get('/stocks', {
        params: { ticker },
      });
      setChartData(data.data);
      loading.set(false);
    };
    if (ticker && !chartData) fetchStockData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker]);

  const handleTimePeriod = (period: Periods) => {
    if (period === '3_MONTHS') {
      return chartData?.slice(0, 90);
    } else if (period === '1_YEAR') {
      return chartData;
    } else if (period === '1_MONTH') {
      return chartData?.slice(0, 30);
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
              period === '1_MONTH' && 'bg-gray-50'
            }`}
            onClick={() => setPeriod('1_MONTH')}
          >
            1 Month
          </div>
          <div
            className={`w-full p-4 cursor-pointer bg-white hover:bg-gray-50 duration-300 cursor-pointe grid place-items-center ${
              period === '3_MONTHS' && 'bg-gray-50'
            }`}
            onClick={() => setPeriod('3_MONTHS')}
          >
            3 Months
          </div>
          <div
            className={`w-full p-4 bg-white rounded-r-xl hover:bg-gray-50 duration-300 cursor-pointer grid place-items-center ${
              period === '1_YEAR' && 'bg-gray-50'
            }`}
            onClick={() => setPeriod('1_YEAR')}
          >
            1 Year
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
              <XAxis dataKey='name' dy={15} minTickGap={75} />
              <YAxis domain={['dataMin', 'dataMax']} />
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
