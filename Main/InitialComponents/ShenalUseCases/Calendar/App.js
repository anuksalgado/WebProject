import React, { useState } from 'react';
import { generateDate, months } from './Calendar';
import cn from './cn';
import dayjs from 'dayjs';
import Navbar from './Navbar';
import SideBar from './Sidebar';
import { GrFormNext, GrFormPin, GrFormPrevious, IconName } from "react-icons/gr";

export default function App() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [events, setEvents] = useState({});

  const addEvent = () => {
    const eventInput = prompt('Enter event:');
    if (!eventInput || !eventInput.trim()) return;
    const dateKey = selectDate.format('YYYY-MM-DD');
    setEvents({
      ...events,
      [dateKey]: [...(events[dateKey] || []), eventInput.trim()]
    });
  };

  const deleteEvent = (date, index) => {
    const dateKey = date.format('YYYY-MM-DD');
    const updatedEvents = [...events[dateKey]];
    updatedEvents.splice(index, 1);
    setEvents({
      ...events,
      [dateKey]: updatedEvents
    });
  };

  const hasEvents = (date) => {
    const dateKey = date.format('YYYY-MM-DD');
    return events[dateKey] && events[dateKey].length > 0;
  };

  return (
    <div>
      <div className='flex'>
        <Navbar />
        <div className="flex">
          <SideBar />
          <div className="flex w-auto mx-60 mt-30 divide-x-2 gap-10 h-screen items-center">
            <div className="mx-20 my-20 w-96 h-96">
              <div className="flex justify-between">
                <h1 className="font-semibold">
                  {months[today.month()]}, {today.year()}
                </h1>
                <div className="flex items-center gap-5">
          <GrFormPrevious className="w-5 h-5 cursor-pointer" 
          onClick={()=>[setToday(today.month(today.month() - 1))]}/>
          <h1 className="cursor-pointer" onClick={() => [setToday(currentDate)]}>Today</h1>
          <GrFormNext className="w-5 h-5 cursor-pointer"
          onClick={()=>[setToday(today.month(today.month() + 1))]}/>
        </div>
              </div>
              <div className="w-full grid grid-cols-7 text-gray-500">
                {days.map((day, index) => (
                  <h1 key={index} className="h-14 grid place-content-center text-sm">{day}</h1>
                ))}
              </div>
              <div className="w-full grid grid-cols-7">
                {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => (
                  <div key={index} className="h-14 border-t grid place-content-center text-sm">
                    <h1 className={cn(
                      currentMonth ? "" : "text-gray-400",
                      today ? "bg-red-600 text-white" : "",
                      selectDate.toDate().toDateString() === date.toDate().toDateString() ? "bg-black text-white" : "",
                      "h-10 w-10 grid place-content-center rounded-full hover:bg-black hover:text-white transition-all cursor-pointer",
                      hasEvents(date) ? "relative" : ""
                    )}
                      onClick={() => setSelectDate(date)}
                    >
                      {date.date()}
                      {hasEvents(date) && <span className="absolute bottom-3 top-7 mx-4 w-2 h-2 bg-gray-400 rounded-full"></span>}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-96 w-96 px-5">
              <h1 className="font-semibold">Schedule for {selectDate.format("YYYY-MM-DD")}</h1>
              <ul>
                {events[selectDate.format("YYYY-MM-DD")] && events[selectDate.format("YYYY-MM-DD")].map((event, index) => (
                  <li key={index} className="relative">
                    {event}
                    <button className="absolute right-0 bg-slate-500 text-white rounded-full px-2 h-5" onClick={() => deleteEvent(selectDate, index)}>Delete</button>
                  </li>
                ))}
              </ul>
              <button className="mt-5 bg-blue-900 text-white rounded-full px-2" onClick={addEvent}>Add Event</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
