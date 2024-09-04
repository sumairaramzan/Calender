import Calendar from "react-calendar";
import "./App.css";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

function App() {
  const [value, onChange] = useState(new Date());
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const today = new Date();
      const todayDate = today.getDate();

      if (date.getDate() === todayDate) {
        return "react-calendar__tile--active";
      }
    }
    return null;
  };

  return (
    <div className="App">
      <div className="CalendarContainer">
        <Calendar
          onChange={onChange}
          value={value}
          tileClassName={tileClassName}
        />
      </div>
    </div>
  );
}

export default App;
