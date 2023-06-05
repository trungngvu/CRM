/* eslint-disable */
import moment from 'moment';
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Button } from '@components';
import { AddIcon } from '@components/core/icons';
import useI18n from '@hooks/use-i18n';

import languages from './i18n';

const localizer = momentLocalizer(moment);

const Home = () => {
  const translate = useI18n(languages);
  const [events] = useState([
    {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2023, 6, 0),
      end: new Date(2023, 6, 1),
    },
    {
      id: 1,
      title: 'Long Event',
      start: new Date(2023, 6, 7),
      end: new Date(2023, 3, 10),
    },

    {
      id: 2,
      title: 'DTS STARTS',
      start: new Date(2016, 2, 13, 0, 0, 0),
      end: new Date(2016, 2, 20, 0, 0, 0),
    },

    {
      id: 3,
      title: 'DTS ENDS',
      start: new Date(2016, 10, 6, 0, 0, 0),
      end: new Date(2016, 10, 13, 0, 0, 0),
    },

    {
      id: 4,
      title: 'Some Event',
      start: new Date(2023, 3, 9, 0, 0, 0),
      end: new Date(2023, 3, 10, 0, 0, 0),
    },
    {
      id: 5,
      title: 'Conference',
      start: new Date(2023, 3, 11),
      end: new Date(2023, 3, 13),
      desc: 'Big conference for important people',
    },
    {
      id: 6,
      title: 'Meeting',
      start: new Date(2023, 3, 12, 10, 30, 0, 0),
      end: new Date(2023, 3, 12, 12, 30, 0, 0),
      desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
      id: 7,
      title: 'Lunch',
      start: new Date(2023, 3, 12, 12, 0, 0, 0),
      end: new Date(2023, 3, 12, 13, 0, 0, 0),
      desc: 'Power lunch',
    },
    {
      id: 8,
      title: 'Meeting',
      start: new Date(2023, 3, 12, 14, 0, 0, 0),
      end: new Date(2023, 3, 12, 15, 0, 0, 0),
    },
    {
      id: 9,
      title: 'Happy Hour',
      start: new Date(2023, 3, 12, 17, 0, 0, 0),
      end: new Date(2023, 3, 12, 17, 30, 0, 0),
      desc: 'Most important meal of the day',
    },
    {
      id: 10,
      title: 'Dinner',
      start: new Date(2023, 3, 12, 20, 0, 0, 0),
      end: new Date(2023, 3, 12, 21, 0, 0, 0),
    },
    {
      id: 11,
      title: 'Planning Meeting with Paige',
      start: new Date(2023, 3, 13, 8, 0, 0),
      end: new Date(2023, 3, 13, 10, 30, 0),
    },
    {
      id: 11.1,
      title: 'Inconvenient Conference Call',
      start: new Date(2023, 3, 13, 9, 30, 0),
      end: new Date(2023, 3, 13, 12, 0, 0),
    },
    {
      id: 11.2,
      title: "Project Kickoff - Lou's Shoes",
      start: new Date(2023, 3, 13, 11, 30, 0),
      end: new Date(2023, 3, 13, 14, 0, 0),
    },
    {
      id: 11.3,
      title: 'Quote Follow-up - Tea by Tina',
      start: new Date(2023, 3, 13, 15, 30, 0),
      end: new Date(2023, 3, 13, 16, 0, 0),
    },
    {
      id: 12,
      title: 'Late Night Event',
      start: new Date(2023, 3, 17, 19, 30, 0),
      end: new Date(2023, 3, 18, 2, 0, 0),
    },
    {
      id: 12.5,
      title: 'Late Same Night Event',
      start: new Date(2023, 3, 17, 19, 30, 0),
      end: new Date(2023, 3, 17, 23, 30, 0),
    },
    {
      id: 13,
      title: 'Multi-day Event',
      start: new Date(2023, 3, 20, 19, 30, 0),
      end: new Date(2023, 3, 22, 2, 0, 0),
    },
    {
      id: 14,
      title: 'Today',
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
      id: 15,
      title: 'Point in Time Event',
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
      id: 16,
      title: 'Video Record',
      start: new Date(2023, 3, 14, 15, 30, 0),
      end: new Date(2023, 3, 14, 19, 0, 0),
    },
    {
      id: 17,
      title: 'Dutch Song Producing',
      start: new Date(2023, 3, 14, 16, 30, 0),
      end: new Date(2023, 3, 14, 20, 0, 0),
    },
    {
      id: 18,
      title: 'Itaewon Halloween Meeting',
      start: new Date(2023, 3, 14, 16, 30, 0),
      end: new Date(2023, 3, 14, 17, 30, 0),
    },
    {
      id: 19,
      title: 'Online Coding Test',
      start: new Date(2023, 3, 14, 17, 30, 0),
      end: new Date(2023, 3, 14, 20, 30, 0),
    },
    {
      id: 20,
      title: 'An overlapped Event',
      start: new Date(2023, 3, 14, 17, 0, 0),
      end: new Date(2023, 3, 14, 18, 30, 0),
    },
    {
      id: 21,
      title: 'Phone Interview',
      start: new Date(2023, 3, 14, 17, 0, 0),
      end: new Date(2023, 3, 14, 18, 30, 0),
    },
    {
      id: 22,
      title: 'Cooking Class',
      start: new Date(2023, 3, 14, 17, 30, 0),
      end: new Date(2023, 3, 14, 19, 0, 0),
    },
    {
      id: 23,
      title: 'Go to the gym',
      start: new Date(2023, 3, 14, 18, 30, 0),
      end: new Date(2023, 3, 14, 20, 0, 0),
    },
    {
      id: 24,
      title: 'DST ends on this day (Europe)',
      start: new Date(2022, 9, 30, 0, 0, 0),
      end: new Date(2022, 9, 30, 4, 30, 0),
    },
    {
      id: 25,
      title: 'DST ends on this day (America)',
      start: new Date(2022, 10, 6, 0, 0, 0),
      end: new Date(2022, 10, 6, 4, 30, 0),
    },
    {
      id: 26,
      title: 'DST starts on this day (America)',
      start: new Date(2023, 2, 12, 0, 0, 0),
      end: new Date(2023, 2, 12, 4, 30, 0),
    },
    {
      id: 27,
      title: 'DST starts on this day (Europe)',
      start: new Date(2023, 2, 26, 0, 0, 0),
      end: new Date(2023, 2, 26, 4, 30, 0),
    },
  ]);
  const currentHour = new Date();
  return (
    <>
      <div className="mx-[10px] my-[20px]">
        <div className="flex items-center justify-center relative text-xl">
          <h1>{currentHour.toLocaleTimeString('vn-VN')}</h1>
          <Button
            type="submit"
            iconOptions={{
              icon: AddIcon,
              size: 18,
            }}
            shape="round"
            className="absolute right-0"
          >
            {translate('ADD_TASK')}
          </Button>
        </div>
        <h2 className="text-xl font-bold text-dark">To do</h2>
        <div>
          <div className="grid grid-rows-1 grid-flow-col gap-4">
            <div>
              <form>
                {events?.map(event =>
                  event.start.toDateString() === currentHour.toDateString() ? (
                    <div key={event.id}>
                      <input type="checkbox" value={event.id} name={event.title}></input>
                      <label className="font-bold mx-10">{event.title}</label>
                    </div>
                  ) : (
                    ''
                  )
                )}
              </form>
            </div>
            <div className="flex items-center gap-x-2"></div>
          </div>
        </div>
      </div>
      <div>
        <Calendar
          startAccessor="start"
          endAccessor="end"
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          style={{ height: '70vh', margin: '30px 20px 0px 20px', border: '1px #000 solid' }}
        />
      </div>
    </>
  );
};

export default Home;
