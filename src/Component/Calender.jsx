// src/Calendar.js
import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const firstDayOfWeek = startOfWeek(firstDayOfMonth);
  const lastDayOfWeek = endOfWeek(lastDayOfMonth);

  const days = eachDayOfInterval({ start: firstDayOfWeek, end: lastDayOfWeek });

  return (
    <div>
      <h2>{format(currentDate, "MMMM yyyy")}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "5px",
        }}
      >
        {days.map((day, index) => (
          <div key={index} className="calendar-day">
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
