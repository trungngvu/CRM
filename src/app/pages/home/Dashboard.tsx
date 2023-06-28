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
    console.log(foundItem);
    if (foundItem) {
      setUnfinish(prevUnFinish => prevUnFinish.filter(event => event.id !== foundItem?.id));
      foundItem.finished = true;
      setFinish(prevFinish => [...prevFinish, foundItem]);
    }
  };
  return (
    <>
      <div className="mx-[10px] my-[20px]">
        <div className="grid grid-rows-1 grid-flow-col gap-4 mx-[10px] my-[20px]">
          <div className="row-span-3">
            <h2 className="text-xl font-bold text-dark text-center">To do</h2>
            <form>
              {unfinish?.map(event => (
                <div key={event.id}>
                  <div className="bg-slate-200 my-[5px] rounded-full hover:bg-blue-300">
                    <input
                      type="checkbox"
                      className="mx-[10px]"
                      value={event.id}
                      name={event.title}
                      onClick={e => handleCheck(e)}
                    ></input>
                    <label className="font-bold mx-[10px]">{event.title}</label>
                  </div>
                </div>
              ))}
            </form>
          </div>
          <div className="row-span-3 border-solid border-2">
            <h2 className="text-xl font-bold text-dark text-center">Finished</h2>
            {/* <div> */}
            <div className="grid grid-rows-1 grid-flow-col gap-4">
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
          <div className="row-span-3 relative">
            <Button
              type="submit"
              iconOptions={{
                icon: AddIcon,
                size: 20,
              }}
              shape="round"
              className="h-[32px] px-[18px] absolute right-0 text-base bg-primary hover:bg-primary-dark text-light rounded-[20px] whitespace-nowrap "
            >
              {translate('ADD_TASK')}
            </Button>
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
