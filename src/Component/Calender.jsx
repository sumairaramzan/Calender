import React, { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
  getDate,
  addMinutes,
} from "date-fns";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentDay, setCurrentDay] = useState(getDate(new Date()));
  const [currentTimeRange, setCurrentTimeRange] = useState("");
  const [visibleStartDate, setVisibleStartDate] = useState(1);
  const [visibleEndDate, setVisibleEndDate] = useState(10);
  const [currentTimeRanges, setCurrentTimeRanges] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateTimeRange = () => {
      const now = new Date();
      const roundedMinutes = Math.floor(now.getMinutes() / 15) * 15;
      const startTime = new Date(now.setMinutes(roundedMinutes, 0, 0));
      const endTime = addMinutes(startTime, 45); // 45 minutes later

      setCurrentTimeRange(
        `${format(startTime, "HH:mm")} - ${format(endTime, "HH:mm")}`
      );
    };

    updateTimeRange();
    const timer = setInterval(updateTimeRange, 60000);
    return () => clearInterval(timer);
  }, []);
  const nextDates = () => {
    const lastDateOfMonth = getDate(endOfMonth(currentDate));
    if (visibleEndDate < lastDateOfMonth) {
      const newStartDate = visibleStartDate + maxDatesToShow;
      const newEndDate = Math.min(
        visibleEndDate + maxDatesToShow,
        lastDateOfMonth
      );

      setVisibleStartDate(newStartDate);
      setVisibleEndDate(newEndDate);
    }
  };

  const prevMonth = () => {
    const newDate = subMonths(currentDate, 1);
    setCurrentDate(ensureSameDayInNewMonth(newDate));
  };

  const nextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    setCurrentDate(ensureSameDayInNewMonth(newDate));
  };

  const ensureSameDayInNewMonth = (newDate) => {
    const lastDayOfNewMonth = endOfMonth(newDate);
    const lastDate = getDate(lastDayOfNewMonth);
    const dayToSet = Math.min(currentDay, lastDate);
    const newHighlightedDate = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      dayToSet
    );
    return newHighlightedDate;
  };

  const prevDates = () => {
    if (visibleStartDate > 1) {
      const newStartDate = Math.max(visibleStartDate - maxDatesToShow, 1);
      const newEndDate = newStartDate + maxDatesToShow - 1;

      setVisibleStartDate(newStartDate);
      setVisibleEndDate(newEndDate);
    }
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const maxDatesToShow =
    screenWidth <= 320
      ? 3
      : screenWidth <= 428
      ? 5
      : screenWidth <= 768
      ? 5
      : screenWidth <= 1024
      ? 8
      : 10;

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const updateTimeRanges = () => {
      const now = new Date();
      const roundedMinutes = Math.floor(now.getMinutes() / 15) * 15;
      const baseTime = new Date(now.setMinutes(roundedMinutes, 0, 0));

      const ranges = Array.from({ length: 12 }, (_, index) => {
        const startTime = addMinutes(baseTime, index * 15);
        const endTime = addMinutes(startTime, 15);
        return {
          start: format(startTime, "HH:mm"),
          end: format(endTime, "HH:mm"),
        };
      });

      setCurrentTimeRanges(ranges);
    };

    updateTimeRanges();
    const timer = setInterval(updateTimeRanges, 60000);

    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const daysToShow = daysInMonth.slice(
    visibleStartDate - 1,
    visibleStartDate - 1 + maxDatesToShow
  );

  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-8 ">
            <p className="text-muted">Please choose time & date for booking</p>
            <div className="calender">
              <div className="heading  mb-4">
                <button className="btn-previous" onClick={prevMonth}>
                  &lt;
                </button>
                <h3>{format(currentDate, "MMMM yyyy")}</h3>
                <button className="next-btn" onClick={nextMonth}>
                  &gt;
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <button className="btn-prev" onClick={prevDates}>
                  &lt;
                </button>

                <div className="date-display">
                  <div className="date-grid">
                    {daysToShow.map((day, index) => (
                      <div
                        key={index}
                        className={`calendar-day ${
                          isSameDay(
                            day,
                            new Date(
                              currentDate.getFullYear(),
                              currentDate.getMonth(),
                              currentDay
                            )
                          )
                            ? "highlight-today"
                            : ""
                        }`}
                        style={{
                          padding: "10px",
                          textAlign: "center",
                          backgroundColor: isSameDay(
                            day,
                            new Date(
                              currentDate.getFullYear(),
                              currentDate.getMonth(),
                              currentDay
                            )
                          )
                            ? "#FF0000"
                            : "#FFF",
                          color: isSameDay(
                            day,
                            new Date(
                              currentDate.getFullYear(),
                              currentDate.getMonth(),
                              currentDay
                            )
                          )
                            ? "#FFF"
                            : "#000",
                          fontWeight: isSameDay(
                            day,
                            new Date(
                              currentDate.getFullYear(),
                              currentDate.getMonth(),
                              currentDay
                            )
                          )
                            ? "500"
                            : "normal",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div>{format(day, "d")}</div>
                        <div>{weekDays[day.getDay()]}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="btn-next" onClick={nextDates}>
                  &gt;
                </button>
              </div>

              <div className="time-container">
                <div className="timer">
                  {currentTimeRanges.map((range, index) => (
                    <div key={index} className="time-set">
                      <p className="m-0">{`${range.start} - ${range.end}`}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
