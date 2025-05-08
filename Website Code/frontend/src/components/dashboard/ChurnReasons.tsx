import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ChurnReason } from '../../types';

interface ChurnReasonsProps {
  data: ChurnReason[];
}

const ChurnReasons: React.FC<ChurnReasonsProps> = ({ data }) => {
  const options = {
    chart: {
      type: 'pie' as const,
      height: 300,
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#3466F6', '#EF4444', '#F59E0B', '#10B981', '#6366F1'],
    labels: data.map((item) => item.reason),
    legend: {
      position: 'bottom' as const,
      fontFamily: 'Inter, sans-serif',
      fontSize: '13px',
      markers: {
        radius: 12,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 280,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    title: {
      text: 'Churn Reasons',
      align: 'left' as const,
      style: {
        fontSize: '16px',
        fontWeight: 600,
        fontFamily: 'Inter, sans-serif',
        color: '#111827',
      },
    },
    subtitle: {
      text: 'Distribution by percentage',
      align: 'left' as const,
      style: {
        fontSize: '13px',
        fontWeight: 400,
        color: '#6B7280',
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${Math.round(val)}%`,
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 'bold',
        colors: ['#fff'],
      },
      dropShadow: {
        enabled: true,
        blur: 3,
        opacity: 0.5,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '0%',
        },
      },
    },
    stroke: {
      width: 0,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}%`,
      },
    },
  };

  const series = data.map((item) => item.percentage);

  return (
    <div className="card h-[350px] animate-fadeIn">
      <ReactApexChart options={options} series={series} type="pie" height={300} />
    </div>
  );
};

export default ChurnReasons;