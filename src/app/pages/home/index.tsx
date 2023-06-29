/* eslint-disable */
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Bar } from 'react-chartjs-2';

// import { Button } from '@components';
// import { AddIcon } from '@components/core/icons';
// import history from '@history';
// import useI18n from '@hooks/use-i18n';
// import { PAGES } from '@src/app/types';
import { useGetTasksQuery } from '@store';

import { chartData } from './events';
import eventData from './events';

// import languages from './i18n';

const localizer = momentLocalizer(moment);

const Home = (): JSX.Element => {
  // const gotoAddTask = () => {
  //   history.push(`${PAGES.DAY_TASK}?projectId=15`);
  // };

  const { data } = useGetTasksQuery({ projectId: 15 }, { refetchOnMountOrArgChange: true });
  const [events] = useState(eventData);
  useEffect(() => {}, [data]);

  // const isTodayJob = (event: any, currentHour: Date) => {
  //   return event.start.toDateString() === currentHour.toDateString();
  // };
  // const isJobFinished = (event: any) => {
  //   return event.finished === true;
  // };
  // const translate = useI18n(languages);
  // const currentHour = new Date();
  // const todayEvent = events.filter(event => isTodayJob(event, currentHour));
  // const finishedEvent = todayEvent.filter(event => isJobFinished(event));
  // const unfinishedEvent = todayEvent.filter(event => isJobFinished(event) === false);
  // const [finish, setFinish] = useState(finishedEvent);
  // const [unfinish, setUnfinish] = useState(unfinishedEvent);

  const date = new Date();
  const year = date.getFullYear().toString();
  const month = date.getMonth().toString();
  const day = date.getDate().toString();
  const threeDay = (date.getDate() + 3).toString();
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
      title: {
        display: true,
        text: 'ĐÁNH GIÁ MỨC ĐỘ HOÀN THÀNH CÔNG VIỆC',
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
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);
  return (
    <>
      <div className="flex flex-row mt-[3px]">
        <div className="flex flex-col w-[75%] justify-center ">
          <div className="flex flex-col mx-[20px]">
            {/*Progress bar */}
            <div className="[&>canvas]:!w-full " style={{ height: '23vh', margin: '1px', borderRadius: '3px' }}>
              <Bar options={options} plugins={plugin} data={chartData}></Bar>
            </div>
          </div>

          <div>
            <div>
              <Calendar
                startAccessor="start"
                endAccessor="end"
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={events}
                style={{ height: '70vh', margin: '20px 20px 0px 20px', border: '1px #000 solid' }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[25%] border border-black px-[10px] py-[5px] bg-white rounded-[3px]  h-[100vh] overflow-auto">
          <div>
            <h1 className="text-xl font-bold text-dark text-center">Danh sách công việc cần làm</h1>
            <div className=" p-3 gap-3 border border-black flex flex-col rounded-[3px] ">
              <h2 className="text-lg font-bold text-dark text-left top-20">Dự án</h2>
              <div className="p-3 border border-black rounded-[3px] border-4 border-red-600	">
                <div>
                  <div className="text-md font-bold text-dark">Maybeline</div>
                  <div className="text-red-600 text-xl font-bold">Design Wireframe</div>
                </div>
                <div>
                  <div>
                    <strong>Ngay bat dau:</strong>
                    <span>{day.concat('/').concat(month).concat('/').concat(year)}</span>
                  </div>
                  <div>
                    <strong>Ngay kết thúc:</strong>
                    <span>{threeDay.concat('/').concat(month).concat('/').concat(year)}</span>
                  </div>
                </div>
              </div>
              <div className="p-3 border border-black rounded-[3px] border-4 border-lime-600	">
                <div>
                  <div className="text-md font-bold text-dark">Maybeline</div>
                  <div className="text-lime-600 text-xl font-bold">Design Wireframe</div>
                </div>
                <div>
                  <div>
                    <strong>Ngay bat dau:</strong>
                    <span>{day.concat('/').concat(month).concat('/').concat(year)}</span>
                  </div>
                  <div>
                    <strong>Ngay kết thúc:</strong>
                    <span>{threeDay.concat('/').concat(month).concat('/').concat(year)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className=" p-3 gap-3 border border-black flex flex-col rounded-[3px]">
              <h2 className="text-lg font-bold text-dark text-left">Công việc cá nhân</h2>
              <div className="p-3 border border-black rounded-[3px] border-4 border-red-600	">
                <div>
                  <div className="text-md font-bold text-dark">KTPM</div>
                  <div className="text-red-600 text-xl font-bold">Họp với team dev</div>
                </div>
                <div>
                  <div>
                    <strong>Thời gian:</strong>
                    <span>14:00</span>
                  </div>
                  <div>
                    <strong>Ngày:</strong>
                    <span>30/6/2023</span>
                  </div>
                </div>
              </div>
              <div className="p-3 border border-black rounded-[3px] border-4 border-lime-600	">
                <div>
                  <div className="text-md font-bold text-dark">CodeLoverVietnam</div>
                  <div className="text-lime-600 text-xl font-bold">Họp với team marketing</div>
                </div>
                <div>
                  <div>
                    <strong>Thời gian:</strong>
                    <span>14:00</span>
                  </div>
                  <div>
                    <strong>Ngày:</strong>
                    <span>30/6/2023</span>
                  </div>
                </div>
              </div>
              <div className="p-3 border border-black rounded-[3px] border-4 border-lime-600	">
                <div>
                  <div className="text-md font-bold text-dark">CodeLoverVietnam</div>
                  <div className="text-lime-600 text-xl font-bold">Phỏng vấn Intern</div>
                </div>
                <div>
                  <div>
                    <strong>Thời gian:</strong>
                    <span>14:00</span>
                  </div>
                  <div>
                    <strong>Ngày:</strong>
                    <span>30/6/2023</span>
                  </div>
                </div>
              </div>
              <div className="p-3 border border-black rounded-[3px] border-4 border-lime-600	">
                <div>
                  <div className="text-md font-bold text-dark">Sinh nhật vợ</div>
                  <div className="text-lime-600 text-xl font-bold">Mua quà tại PNJ</div>
                </div>
                <div>
                  <div>
                    <strong>Thời gian:</strong>
                    <span>14:00</span>
                  </div>
                  <div>
                    <strong>Ngày:</strong>
                    <span>30/6/2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
