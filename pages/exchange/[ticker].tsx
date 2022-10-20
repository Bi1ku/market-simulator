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
import dayjs from 'dayjs';
import axios from 'axios';
import Image from 'next/image';

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
  const [chartData, setChartData] = useState<ChartData[]>([
    {
      'name': 'Oct 19, 2022',
      'open': '141.69',
      'high': '144.95',
      'low': '141.50',
      'close': '143.86',
    },
    {
      'name': 'Oct 18, 2022',
      'open': '145.49',
      'high': '146.70',
      'low': '140.61',
      'close': '143.75',
    },
    {
      'name': 'Oct 17, 2022',
      'open': '141.07',
      'high': '142.90',
      'low': '140.27',
      'close': '142.41',
    },
    {
      'name': 'Oct 14, 2022',
      'open': '144.31',
      'high': '144.52',
      'low': '138.19',
      'close': '138.38',
    },
    {
      'name': 'Oct 13, 2022',
      'open': '134.99',
      'high': '143.59',
      'low': '134.37',
      'close': '142.99',
    },
    {
      'name': 'Oct 12, 2022',
      'open': '139.13',
      'high': '140.36',
      'low': '138.16',
      'close': '138.34',
    },
    {
      'name': 'Oct 11, 2022',
      'open': '139.90',
      'high': '141.35',
      'low': '138.22',
      'close': '138.98',
    },
    {
      'name': 'Oct 10, 2022',
      'open': '140.42',
      'high': '141.89',
      'low': '138.57',
      'close': '140.42',
    },
    {
      'name': 'Oct 07, 2022',
      'open': '142.54',
      'high': '143.10',
      'low': '139.45',
      'close': '140.09',
    },
    {
      'name': 'Oct 06, 2022',
      'open': '145.81',
      'high': '147.54',
      'low': '145.22',
      'close': '145.43',
    },
    {
      'name': 'Oct 05, 2022',
      'open': '144.07',
      'high': '147.38',
      'low': '143.01',
      'close': '146.40',
    },
    {
      'name': 'Oct 04, 2022',
      'open': '145.03',
      'high': '146.22',
      'low': '144.26',
      'close': '146.10',
    },
    {
      'name': 'Oct 03, 2022',
      'open': '138.21',
      'high': '143.07',
      'low': '137.69',
      'close': '142.45',
    },
    {
      'name': 'Sep 30, 2022',
      'open': '141.28',
      'high': '143.10',
      'low': '138.00',
      'close': '138.20',
    },
    {
      'name': 'Sep 29, 2022',
      'open': '146.10',
      'high': '146.72',
      'low': '140.68',
      'close': '142.48',
    },
    {
      'name': 'Sep 28, 2022',
      'open': '147.64',
      'high': '150.64',
      'low': '144.84',
      'close': '149.84',
    },
    {
      'name': 'Sep 27, 2022',
      'open': '152.74',
      'high': '154.72',
      'low': '149.95',
      'close': '151.76',
    },
    {
      'name': 'Sep 26, 2022',
      'open': '149.66',
      'high': '153.77',
      'low': '149.64',
      'close': '150.77',
    },
    {
      'name': 'Sep 23, 2022',
      'open': '151.19',
      'high': '151.47',
      'low': '148.56',
      'close': '150.43',
    },
    {
      'name': 'Sep 22, 2022',
      'open': '152.38',
      'high': '154.47',
      'low': '150.91',
      'close': '152.74',
    },
    {
      'name': 'Sep 21, 2022',
      'open': '157.34',
      'high': '158.74',
      'low': '153.60',
      'close': '153.72',
    },
    {
      'name': 'Sep 20, 2022',
      'open': '153.40',
      'high': '158.08',
      'low': '153.08',
      'close': '156.90',
    },
    {
      'name': 'Sep 19, 2022',
      'open': '149.31',
      'high': '154.56',
      'low': '149.10',
      'close': '154.48',
    },
    {
      'name': 'Sep 16, 2022',
      'open': '151.21',
      'high': '151.35',
      'low': '148.37',
      'close': '150.70',
    },
    {
      'name': 'Sep 15, 2022',
      'open': '154.65',
      'high': '155.24',
      'low': '151.38',
      'close': '152.37',
    },
    {
      'name': 'Sep 14, 2022',
      'open': '154.79',
      'high': '157.10',
      'low': '153.61',
      'close': '155.31',
    },
    {
      'name': 'Sep 13, 2022',
      'open': '159.90',
      'high': '160.54',
      'low': '153.37',
      'close': '153.84',
    },
    {
      'name': 'Sep 12, 2022',
      'open': '159.59',
      'high': '164.26',
      'low': '159.30',
      'close': '163.43',
    },
    {
      'name': 'Sep 09, 2022',
      'open': '155.47',
      'high': '157.82',
      'low': '154.75',
      'close': '157.37',
    },
    {
      'name': 'Sep 08, 2022',
      'open': '154.64',
      'high': '156.36',
      'low': '152.68',
      'close': '154.46',
    },
    {
      'name': 'Sep 07, 2022',
      'open': '154.82',
      'high': '156.67',
      'low': '153.61',
      'close': '155.96',
    },
    {
      'name': 'Sep 06, 2022',
      'open': '156.47',
      'high': '157.09',
      'low': '153.69',
      'close': '154.53',
    },
    {
      'name': 'Sep 02, 2022',
      'open': '159.75',
      'high': '160.36',
      'low': '154.97',
      'close': '155.81',
    },
    {
      'name': 'Sep 01, 2022',
      'open': '156.64',
      'high': '158.42',
      'low': '154.67',
      'close': '157.96',
    },
    {
      'name': 'Aug 31, 2022',
      'open': '160.31',
      'high': '160.58',
      'low': '157.14',
      'close': '157.22',
    },
    {
      'name': 'Aug 30, 2022',
      'open': '162.13',
      'high': '162.56',
      'low': '157.72',
      'close': '158.91',
    },
    {
      'name': 'Aug 29, 2022',
      'open': '161.15',
      'high': '162.90',
      'low': '159.82',
      'close': '161.38',
    },
    {
      'name': 'Aug 26, 2022',
      'open': '170.57',
      'high': '171.05',
      'low': '163.56',
      'close': '163.62',
    },
    {
      'name': 'Aug 25, 2022',
      'open': '168.78',
      'high': '170.14',
      'low': '168.35',
      'close': '170.03',
    },
    {
      'name': 'Aug 24, 2022',
      'open': '167.32',
      'high': '168.11',
      'low': '166.25',
      'close': '167.53',
    },
    {
      'name': 'Aug 23, 2022',
      'open': '167.08',
      'high': '168.71',
      'low': '166.65',
      'close': '167.23',
    },
    {
      'name': 'Aug 22, 2022',
      'open': '169.69',
      'high': '169.86',
      'low': '167.14',
      'close': '167.57',
    },
    {
      'name': 'Aug 19, 2022',
      'open': '173.03',
      'high': '173.74',
      'low': '171.31',
      'close': '171.52',
    },
    {
      'name': 'Aug 18, 2022',
      'open': '173.75',
      'high': '174.90',
      'low': '173.12',
      'close': '174.15',
    },
    {
      'name': 'Aug 17, 2022',
      'open': '172.77',
      'high': '176.15',
      'low': '172.57',
      'close': '174.55',
    },
    {
      'name': 'Aug 16, 2022',
      'open': '172.78',
      'high': '173.71',
      'low': '171.66',
      'close': '173.03',
    },
    {
      'name': 'Aug 15, 2022',
      'open': '171.52',
      'high': '173.39',
      'low': '171.35',
      'close': '173.19',
    },
    {
      'name': 'Aug 12, 2022',
      'open': '169.82',
      'high': '172.17',
      'low': '169.40',
      'close': '172.10',
    },
    {
      'name': 'Aug 11, 2022',
      'open': '170.06',
      'high': '170.99',
      'low': '168.19',
      'close': '168.49',
    },
    {
      'name': 'Aug 10, 2022',
      'open': '167.68',
      'high': '169.34',
      'low': '166.90',
      'close': '169.24',
    },
    {
      'name': 'Aug 09, 2022',
      'open': '164.02',
      'high': '165.82',
      'low': '163.25',
      'close': '164.92',
    },
    {
      'name': 'Aug 08, 2022',
      'open': '166.37',
      'high': '167.81',
      'low': '164.20',
      'close': '164.87',
    },
    {
      'name': 'Aug 05, 2022',
      'open': '163.21',
      'high': '165.85',
      'low': '163.00',
      'close': '165.35',
    },
    {
      'name': 'Aug 04, 2022',
      'open': '166.01',
      'high': '167.19',
      'low': '164.43',
      'close': '165.81',
    },
    {
      'name': 'Aug 03, 2022',
      'open': '160.84',
      'high': '166.59',
      'low': '160.75',
      'close': '166.13',
    },
    {
      'name': 'Aug 02, 2022',
      'open': '160.10',
      'high': '162.41',
      'low': '159.63',
      'close': '160.01',
    },
    {
      'name': 'Aug 01, 2022',
      'open': '161.01',
      'high': '163.59',
      'low': '160.89',
      'close': '161.51',
    },
    {
      'name': 'Jul 29, 2022',
      'open': '161.24',
      'high': '163.63',
      'low': '159.50',
      'close': '162.51',
    },
    {
      'name': 'Jul 28, 2022',
      'open': '156.98',
      'high': '157.64',
      'low': '154.41',
      'close': '157.35',
    },
    {
      'name': 'Jul 27, 2022',
      'open': '152.58',
      'high': '157.33',
      'low': '152.16',
      'close': '156.79',
    },
    {
      'name': 'Jul 26, 2022',
      'open': '152.26',
      'high': '153.09',
      'low': '150.80',
      'close': '151.60',
    },
    {
      'name': 'Jul 25, 2022',
      'open': '154.01',
      'high': '155.04',
      'low': '152.28',
      'close': '152.95',
    },
    {
      'name': 'Jul 22, 2022',
      'open': '155.39',
      'high': '156.28',
      'low': '153.41',
      'close': '154.09',
    },
    {
      'name': 'Jul 21, 2022',
      'open': '154.50',
      'high': '155.57',
      'low': '151.94',
      'close': '155.35',
    },
    {
      'name': 'Jul 20, 2022',
      'open': '151.12',
      'high': '153.72',
      'low': '150.37',
      'close': '153.04',
    },
    {
      'name': 'Jul 19, 2022',
      'open': '147.92',
      'high': '151.23',
      'low': '146.91',
      'close': '151.00',
    },
    {
      'name': 'Jul 18, 2022',
      'open': '150.74',
      'high': '151.57',
      'low': '146.70',
      'close': '147.07',
    },
    {
      'name': 'Jul 15, 2022',
      'open': '149.78',
      'high': '150.86',
      'low': '148.20',
      'close': '150.17',
    },
    {
      'name': 'Jul 14, 2022',
      'open': '144.08',
      'high': '148.95',
      'low': '143.25',
      'close': '148.47',
    },
    {
      'name': 'Jul 13, 2022',
      'open': '142.99',
      'high': '146.45',
      'low': '142.12',
      'close': '145.49',
    },
    {
      'name': 'Jul 12, 2022',
      'open': '145.76',
      'high': '148.45',
      'low': '145.05',
      'close': '145.86',
    },
    {
      'name': 'Jul 11, 2022',
      'open': '145.67',
      'high': '146.64',
      'low': '143.78',
      'close': '144.87',
    },
    {
      'name': 'Jul 08, 2022',
      'open': '145.26',
      'high': '147.55',
      'low': '145.00',
      'close': '147.04',
    },
    {
      'name': 'Jul 07, 2022',
      'open': '143.29',
      'high': '146.55',
      'low': '143.28',
      'close': '146.35',
    },
    {
      'name': 'Jul 06, 2022',
      'open': '141.35',
      'high': '144.12',
      'low': '141.08',
      'close': '142.92',
    },
    {
      'name': 'Jul 05, 2022',
      'open': '137.77',
      'high': '141.61',
      'low': '136.93',
      'close': '141.56',
    },
    {
      'name': 'Jul 01, 2022',
      'open': '136.04',
      'high': '139.04',
      'low': '135.66',
      'close': '138.93',
    },
    {
      'name': 'Jun 30, 2022',
      'open': '137.25',
      'high': '138.37',
      'low': '133.77',
      'close': '136.72',
    },
    {
      'name': 'Jun 29, 2022',
      'open': '137.46',
      'high': '140.67',
      'low': '136.67',
      'close': '139.23',
    },
    {
      'name': 'Jun 28, 2022',
      'open': '142.13',
      'high': '143.42',
      'low': '137.32',
      'close': '137.44',
    },
    {
      'name': 'Jun 27, 2022',
      'open': '142.70',
      'high': '143.49',
      'low': '140.97',
      'close': '141.66',
    },
    {
      'name': 'Jun 24, 2022',
      'open': '139.90',
      'high': '141.91',
      'low': '139.77',
      'close': '141.66',
    },
    {
      'name': 'Jun 23, 2022',
      'open': '136.82',
      'high': '138.59',
      'low': '135.63',
      'close': '138.27',
    },
    {
      'name': 'Jun 22, 2022',
      'open': '134.79',
      'high': '137.76',
      'low': '133.91',
      'close': '135.35',
    },
    {
      'name': 'Jun 21, 2022',
      'open': '133.42',
      'high': '137.06',
      'low': '133.32',
      'close': '135.87',
    },
    {
      'name': 'Jun 17, 2022',
      'open': '130.07',
      'high': '133.08',
      'low': '129.81',
      'close': '131.56',
    },
    {
      'name': 'Jun 16, 2022',
      'open': '132.08',
      'high': '132.39',
      'low': '129.04',
      'close': '130.06',
    },
    {
      'name': 'Jun 15, 2022',
      'open': '134.29',
      'high': '137.34',
      'low': '132.16',
      'close': '135.43',
    },
    {
      'name': 'Jun 14, 2022',
      'open': '133.13',
      'high': '133.89',
      'low': '131.48',
      'close': '132.76',
    },
    {
      'name': 'Jun 13, 2022',
      'open': '132.87',
      'high': '135.20',
      'low': '131.44',
      'close': '131.88',
    },
    {
      'name': 'Jun 10, 2022',
      'open': '140.28',
      'high': '140.76',
      'low': '137.06',
      'close': '137.13',
    },
    {
      'name': 'Jun 09, 2022',
      'open': '147.08',
      'high': '147.95',
      'low': '142.53',
      'close': '142.64',
    },
    {
      'name': 'Jun 08, 2022',
      'open': '148.58',
      'high': '149.87',
      'low': '147.46',
      'close': '147.96',
    },
    {
      'name': 'Jun 07, 2022',
      'open': '144.35',
      'high': '149.00',
      'low': '144.10',
      'close': '148.71',
    },
    {
      'name': 'Jun 06, 2022',
      'open': '147.03',
      'high': '148.57',
      'low': '144.90',
      'close': '146.14',
    },
    {
      'name': 'Jun 03, 2022',
      'open': '146.90',
      'high': '147.97',
      'low': '144.46',
      'close': '145.38',
    },
    {
      'name': 'Jun 02, 2022',
      'open': '147.83',
      'high': '151.27',
      'low': '146.86',
      'close': '151.21',
    },
    {
      'name': 'Jun 01, 2022',
      'open': '149.90',
      'high': '151.74',
      'low': '147.68',
      'close': '148.71',
    },
    {
      'name': 'May 31, 2022',
      'open': '149.07',
      'high': '150.66',
      'low': '146.84',
      'close': '148.84',
    },
  ]);
  const [loading, setLoading] = useState(false); // Redux later => global states
  const [period, setPeriod] = useState<Periods>('3_MONTHS');

  useEffect(() => {
    const fetchStockData = async () => {
      const data = await axios.get('/api/stocks', {
        params: { ticker },
      });
      setChartData(data.data);
      setLoading(false);
    };
    if (ticker) fetchStockData();
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

  return loading ? (
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
  ) : (
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
            className={`w-full p-4 bg-white hover:bg-gray-50 duration-300 cursor-pointe grid place-items-center ${
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
