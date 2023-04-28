import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import CopyButton from "../Etc/Button/CopyButton";
import 'moment/locale/ko'; 

function Calendar() {
  const [date, setDate] = useState<Moment>(moment());

  function onYearChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setDate(date.clone().year(parseInt(event.target.value)));
  }

  function onMonthChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setDate(date.clone().month(parseInt(event.target.value)));
  }

  function onDateChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setDate(date.clone().date(parseInt(event.target.value)));
  }

  const monthName: string = date.locale('ko').format('MMMM');
  const year: number = date.year();
  const month: number = date.month();
  const daysInMonth: number = date.daysInMonth();
  const dates: number[] = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const selectClassName = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5";
  const labelClassName = "block mb-2 text-sm font-medium text-white";

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
        <div>
          <label className={labelClassName}>Year</label>
          <select className={selectClassName} value={year} onChange={onYearChange}>
            {Array.from({ length: 250 }, (_, i) => year - 100 + i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClassName}>Month</label>
          <select className={selectClassName} value={month} onChange={onMonthChange}>
            {Array.from({ length: 12 }, (_, i) => i).map((m) => (
              <option key={m} value={m}>{moment().locale('ko').month(m).format('MMMM')}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClassName}>Date</label>
          <select className={selectClassName} value={date.date()} onChange={onDateChange}>
            {dates.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="mb-4 text-xl font-bold text-white py-2 pl-2">결과 확인</h2>
        <div className="break-all border border-plusGreen100 py-5 rounded-2xl bg-white relative">
          <div className="text-black p-3" id="">
            {date.locale('ko').format('dddd')}
          </div>
          <div className="absolute bottom-0 right-0 mr-2 mb-2">
            <CopyButton text={date.locale('ko').format('dddd')}></CopyButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
