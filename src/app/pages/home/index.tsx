/* eslint-disable */
import moment from 'moment';
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Button } from '@components';
import { AddIcon } from '@components/core/icons';
import useI18n from '@hooks/use-i18n';

import eventData from './events';
import languages from './i18n';

const localizer = momentLocalizer(moment);

const Home = () => {
  const translate = useI18n(languages);
  const [events] = useState(eventData);
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
