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

const Home = (): JSX.Element => {
  const isTodayJob = (event: any, currentHour: Date) => {
    return event.start.toDateString() === currentHour.toDateString();
  };
  const isJobFinished = (event: any) => {
    return event.finished === true;
  };
  const translate = useI18n(languages);
  const [events] = useState(eventData);
  const currentHour = new Date();
  const todayEvent = events.filter(event => isTodayJob(event, currentHour));
  const finishedEvent = todayEvent.filter(event => isJobFinished(event));
  const unfinishedEvent = todayEvent.filter(event => isJobFinished(event) === false);
  const [finish, setFinish] = useState(finishedEvent);
  const [unfinish, setUnfinish] = useState(unfinishedEvent);
  // console.log(finish, unfinish);
  const handleCheck = (e: any) => {
    const id = e.target.value;
    const foundItem = unfinish.find(event => event.id == id);
    if (foundItem) {
      setUnfinish(prevUnFinish => prevUnFinish.filter(event => event.id !== foundItem?.id));
      foundItem.finished = true;
      setFinish(prevFinish => [...prevFinish, foundItem]);
    }
  };
  return (
    <>
      <div className="mx-[10px] my-[20px]">
        <div className="relative flex items-center justify-center text-xl">
          {/* <h1>{currentHour.toLocaleTimeString('vn-VN')}</h1> */}
          <Button
            type="submit"
            iconOptions={{
              icon: AddIcon,
              size: 18,
            }}
            shape="round"
            className="absolute right-10"
          >
            {translate('ADD_TASK')}
          </Button>
        </div>
        <div>
          <div>
            <div className="grid grid-flow-col grid-rows-1 gap-4">
              <div className="row-span-3">
                <h2 className="text-xl font-bold text-dark">To do</h2>
                <form>
                  {unfinish?.map(event => (
                    <div key={event.id}>
                      <input type="checkbox" value={event.id} name={event.title} onClick={e => handleCheck(e)}></input>
                      <label className="mx-10 font-bold">{event.title}</label>
                    </div>
                  ))}
                </form>
              </div>
              <div className="row-span-3">
                <h2 className="text-xl font-bold text-dark">Finished</h2>
                {/* <div> */}
                <div className="grid grid-flow-col grid-rows-1 gap-4">
                  <div>
                    {finish?.map(event => (
                      <div key={event.id}>
                        <p className="font-bold">{event.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
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
