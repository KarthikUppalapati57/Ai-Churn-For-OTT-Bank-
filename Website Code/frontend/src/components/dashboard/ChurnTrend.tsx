import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { TimeSeriesPoint } from '../../types';

interface ChurnTrendProps {
  data: TimeSeriesPoint[];
}

const ChurnTrend: React.FC<ChurnTrendProps> = ({ data }) => {
  const options = {
    chart: {
      type: 'area' as const,
      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth' as const,
      width: 2,
    },
    colors: ['#3466F6', '#22C55E'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
    },
    title: {
      text: 'Churn Rate & New Customers',
      align: 'left' as const,
      style: {
        fontSize: '16px',
        fontWeight: 600,
        fontFamily: 'Inter, sans-serif',
        color: '#111827',
      },
    },
    subtitle: {
      text: 'Past 12 months trend',
      align: 'left' as const,
      style: {
        fontSize: '13px',
        fontWeight: 400,
        color: '#6B7280',
      },
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      type: 'category' as const,
      categories: data.map((item) => {
        const date = new Date(item.date);
        return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      }),
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: [
      {
        title: {
          text: 'Churn Rate (%)',
          style: {
            fontSize: '12px',
            fontWeight: 500,
            color: '#3466F6',
          },
        },
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
          },
          formatter: (value: number) => `${value.toFixed(1)}%`,
        },
        min: 0,
        max: (max: number) => Math.ceil(max) + 2,
      },
      {
        opposite: true,
        title: {
          text: 'New Customers',
          style: {
            fontSize: '12px',
            fontWeight: 500,
            color: '#22C55E',
          },
        },
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
          },
          formatter: (value: number) => `${value.toFixed(0)}`,
        },
        min: 0,
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'light',
      y: {
        formatter: (value: number, { seriesIndex }: { seriesIndex: number }) => {
          if (seriesIndex === 0) {
            return `${value.toFixed(1)}%`;
          }
          return `${value}`;
        },
      },
    },
    legend: {
      position: 'top' as const,
      horizontalAlign: 'right' as const,
      fontSize: '13px',
      fontFamily: 'Inter, sans-serif',
      offsetY: -25,
      markers: {
        radius: 12,
      },
    },
  };

  const series = [
    {
      name: 'Churn Rate',
      type: 'area',
      data: data.map((item) => item.churnRate),
    },
    {
      name: 'New Customers',
      type: 'column',
      data: data.map((item) => item.newCustomers),
    },
  ];

  return (
    <div className="card h-[400px] animate-fadeIn">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default ChurnTrend;