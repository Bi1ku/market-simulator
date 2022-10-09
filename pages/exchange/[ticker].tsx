import { Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  ResponsiveContainer,
} from 'recharts';
import { NameType } from 'recharts/types/component/DefaultTooltipContent';
import dayjs from 'dayjs';
import { scraper } from '../../scrapers';

type BaseValueType = number | 'auto' | 'dataMin' | 'dataMax';
type Props = {};
interface ChartData {
  name: string;
  value: string;
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
      <div className='bg-gray-200 p-4 rounded-lg w-52'>
        <p className='label mb-2'>{`${label} → $${payload?.[0].payload.value}`}</p>
        <p className='intro'>{`High: ${payload?.[0].payload.high}`}</p>
        <p className='intro'>{`Low: ${payload?.[0].payload.low}`}</p>
        <p className='intro'>{`Close: ${payload?.[0].payload.close}`}</p>
      </div>
    );
  }

  return null;
};

const Ticker = (props: Props) => {
  const router = useRouter();
  const { ticker } = router.query;
  const [chartData, setChartData] = useState<ChartData[]>();

  useEffect(() => {
    const fetchStockData = async () => {};
    fetchStockData();
  }, [ticker]);

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
        <div className='px-4 py-10 bg-white rounded-3xl'>
          <ResponsiveContainer width='99%' height={400}>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <Line type='monotone' dataKey='value' stroke='#8884d8' />
              <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
              <XAxis dataKey='name' dy={15} minTickGap={75} />
              <YAxis domain={['dataMin', 'dataMax']} />
              <Tooltip content={<StockToolTip />} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Transition.Child>
    </div>
  );
};

export default Ticker;
