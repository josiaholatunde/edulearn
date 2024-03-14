import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const StreakCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <Calendar
        onChange={onDateChange}
        value={date}
        showNeighboringMonth={false}
        tileClassName={({ date }) => {
          // Add custom logic to highlight streak dates
          // Example: Highlight dates with even days
          return date.getDate() % 2 === 0 ? 'highlight-streak' : '';
        }}
      />
    </div>
  );
};

export default StreakCalendar;
