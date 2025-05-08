import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ChurnSegment } from '../../types';

interface SegmentAnalysisProps {
  data: ChurnSegment[];
}

const SegmentAnalysis: React.FC<SegmentAnalysisProps> = ({ data }) => {
  const options = {
    chart: {
      type: 'bar' as const,
      height: 300,
      stacked: true,
      toolbar: {
        show: false,
      },
      fontFamily: 'Inter, sans-serif',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        borderRadius: 6,
        dataLabels: {
          position: 'top',
        },
      },
    },
    colors: ['#3466F6', '#EF4444'],
    dataLabels: {
      enabled: true,
      formatter: (val: number, opts: any) => {
        return opts.seriesIndex === 0 ? `${val}%` : `${val}`;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        colors: ['#6B7280'],
      },
    },
    title: {
      text: 'Churn by Customer Segment',
      align: 'left' as const,
      style: {
        fontSize: '16px',
        fontWeight: 600,
        fontFamily: 'Inter, sans-serif',
        color: '#111827',
      },
    },
    subtitle: {
      text: 'Churn rate & customer count by segment',
      align: 'left' as const,
      style: {
        fontSize: '13px',
        fontWeight: 400,
        color: '#6B7280',
      },
    },
    xaxis: {
      categories: data.map((item) => item.segment),
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
          },
          formatter: (val: number) => `${val.toFixed(1)}%`,
        },
      },
      {
        opposite: true,
        title: {
          text: 'Customer Count',
          style: {
            fontSize: '12px',
            fontWeight: 500,
            color: '#EF4444',
          },
        },
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px',
          },
        },
      },
    ],
    fill: {
      opacity: [0.85, 0.75],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: 'vertical',
        opacityFrom: 0.85,
        opacityTo: 0.55,
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
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val: number, { seriesIndex }: { seriesIndex: number }) => {
          if (seriesIndex === 0) {
            return `${val.toFixed(1)}%`;
          }
          return val.toString();
        },
      },
    },
  };

  const series = [
    {
      name: 'Churn Rate',
      data: data.map((item) => item.churnRate),
    },
    {
      name: 'Customer Count',
      data: data.map((item) => item.customerCount),
    },
  ];

  return (
    <div className="card h-[350px] animate-fadeIn">
      <ReactApexChart options={options} series={series} type="bar" height={300} />
    </div>
  );
};

export default SegmentAnalysis;