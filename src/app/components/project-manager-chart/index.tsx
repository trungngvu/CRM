import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Controller, useForm } from 'react-hook-form';

import useI18n from '@hooks/use-i18n';
import useSelect from '@hooks/use-select';
import { LANGUAGES } from '@types';

import DatePicker from '../core/date-picker';
import { en, vi } from './i18n';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

type ProjectManagerChartProps = {
  data: {
    labels: string[];
    datasets: {
      label?: string;
      data: Array<number | null>;
      backgroundColor?: string;
    }[];
  };
};

const plugin = [
  {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (
      chart: {
        width: number;
        height: number;
        ctx: {
          /* eslint-disable  @typescript-eslint/no-explicit-any */
          [key: string]: any;
        };
      },
      _: object,
      options: {
        color: string;
      }
    ) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color;
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  },
];

const options = {
  indexAxis: 'y' as const,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    datalabels: {
      color: 'white',
    },
    customCanvasBackgroundColor: {
      color: 'white',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
  maintainAspectRatio: false,
};

const ProjectManagerChart = ({ data }: ProjectManagerChartProps) => {
  const labelsLength: number = data.labels.length;

  const translate = useI18n({
    name: ProjectManagerChart.name,
    data: [
      {
        key: LANGUAGES.EN,
        value: en,
      },
      {
        key: LANGUAGES.VI,
        value: vi,
      },
    ],
  });
  const { Select } = useSelect({
    data: [
      {
        value: '7day',
        label: translate('LAST_SEVEN_DAYS'),
      },
      {
        value: '30day',
        label: translate('ONE_MONTH_AGO'),
      },
    ],
  });

  const style = {
    height: labelsLength * 60,
  };

  const chartRef = useRef();

  const defaultValues = {
    startDate: null,
    endDate: null,
  };

  const { control } = useForm({ defaultValues });
  const downloadChartAsPng = () => {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const chart: any = chartRef.current;
    const link = document.createElement('a');

    link.download = 'chart.png';
    link.href = chart.canvas.toDataURL();
    link.click();
  };

  return (
    <div className="p-4 mb-4 bg-white border rounded border-secondary">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold">{translate('TASKS_BY_PERSON')}</h3>
        </div>

        <div className="flex">
          <div className="flex items-center justify-center">
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => {
                const fieldData = { ...field };
                return (
                  <>
                    <DatePicker
                      fieldData={fieldData}
                      className="mr-4 border-neutral-300 w-[150px] [&>div>div]:!h-[32px] [&>div>div>div>button>svg]:!h-[20px]"
                      placeholder="Từ ngày"
                      size="small"
                    />{' '}
                    -{' '}
                  </>
                );
              }}
            />
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => {
                const fieldData = { ...field };
                return (
                  <>
                    <DatePicker
                      fieldData={fieldData}
                      className="ml-4 border-neutral-300 w-[150px] [&>div>div]:!h-[32px] [&>div>div>div>button>svg]:!h-[20px]"
                      placeholder="Đến ngày"
                      size="small"
                    />
                  </>
                );
              }}
            />
          </div>
          <div className="mx-4">
            <Select className="h-[32px] rounded border-neutral-300" />
          </div>

          <div className="flex items-center justify-between" onClick={() => downloadChartAsPng()}>
            <img className="cursor-pointer" src="/assets/icons/save.svg" alt="save" />
          </div>
        </div>
      </div>

      <div className="[&>canvas]:!w-full" style={style}>
        <Bar ref={chartRef} options={options} data={data} plugins={plugin} />
      </div>
    </div>
  );
};

export default ProjectManagerChart;
