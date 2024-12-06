'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { STRINGS } from '@/constants/Strings';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Stats {
  totalPurchases: number;
  totalDownloads: number;
  totalSignIns: number;
  dailyEarnings: { date: string; earnings: number }[];
}

interface EventDto {
  eventName: string;
  eventDate: string;
  username: string;
  amount: number | null;
}

interface StatsChartProps {
  stats: Stats;
  events: EventDto[];
  onBackClick: () => void;
}

const StatsChart = ({ stats, events, onBackClick }: StatsChartProps) => {
  const calculateTotalEarnings = () => {
    const payEvents = events.filter(event => event.eventName === 'pay');
    let total = 0;
    payEvents.forEach(event => {
      if (event.amount) {
        total += event.amount;
      }
    });
    return total;
  };

  const getDailyTotals = () => {
    const payEvents = events.filter(event => event.eventName === 'pay');
    const dailyTotals: { [key: string]: number } = {};

    payEvents.forEach(event => {
      const dateStr = event.eventDate.split('T')[0];
      if (!dailyTotals[dateStr]) {
        dailyTotals[dateStr] = 0;
      }
      if (event.amount) {
        dailyTotals[dateStr] += event.amount;
      }
    });

    const sortedDates = Object.keys(dailyTotals)
      .sort((a, b) => a.localeCompare(b));

    return {
      dates: sortedDates,
      totals: sortedDates.map(date => dailyTotals[date])
    };
  };

  const totalEarnings = calculateTotalEarnings();
  const { dates, totals } = getDailyTotals();

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Daily Earnings',
        data: totals,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return `$${Number(value).toLocaleString('en-US')}`;
          }
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 15,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `$${context.parsed.y.toLocaleString('en-US')}`;
          },
          title: function(tooltipItems) {
            const date = new Date(tooltipItems[0].label);
            return date.toLocaleDateString('en-US');
          },
        },
      },
    },
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{STRINGS.STATS.TITLE}</h1>
        <button
          onClick={onBackClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {STRINGS.BACK_TO_USERS}
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="text-lg font-bold">{STRINGS.STATS.PURCHASES}</h2>
          <p className="text-2xl">{stats.totalPurchases}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-lg font-bold">{STRINGS.STATS.DOWNLOADS}</h2>
          <p className="text-2xl">{stats.totalDownloads}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="text-lg font-bold">{STRINGS.STATS.SIGNIN}</h2>
          <p className="text-2xl">{stats.totalSignIns}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow">
          <h2 className="text-lg font-bold">Last 90 Days Total Earnings</h2>
          <p className="text-2xl">${totalEarnings.toLocaleString('en-US')}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Daily Earnings Chart</h2>
        <div style={{ height: '400px' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default StatsChart;
