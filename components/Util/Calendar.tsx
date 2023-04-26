import React, { useState } from 'react';
import moment, { Moment } from 'moment';

function Calendar() {
  const [date, setDate] = useState<Moment>(moment());

  function prevMonth() {
    setDate(date.clone().subtract(1, 'month'));
  }

  function nextMonth() {
    setDate(date.clone().add(1, 'month'));
  }

  function onYearChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setDate(date.clone().year(parseInt(event.target.value)));
  }

  function onMonthChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setDate(date.clone().month(parseInt(event.target.value)));
  }

  function onDateChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setDate(date.clone().date(parseInt(event.target.value)));
  }

  const monthName: string = date.format('MMMM');
  const year: number = date.year();
  const month: number = date.month();
  const daysInMonth: number = date.daysInMonth();
  const dates: number[] = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div>
      <div>
        <label>Year:</label>
        <select value={year} onChange={onYearChange}>
          {Array.from({ length: 100 }, (_, i) => year - 5 + i).map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <label>Month:</label>
        <select value={month} onChange={onMonthChange}>
          {Array.from({ length: 12 }, (_, i) => i).map((m) => (
            <option key={m} value={m}>{moment().month(m).format('MMMM')}</option>
          ))}
        </select>
        <label>Date:</label>
        <select value={date.date()} onChange={onDateChange}>
          {dates.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Calendar;
