import { useState, useEffect } from "react";

import "../shared/styles/clock.css";

const Clock = ({ onOfferEnd }) => {
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  useEffect(() => {
    const destination = new Date("2023-12-30").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const different = destination - now;
      const days = Math.floor(different / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (different % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((different % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((different % (1000 * 60)) / 1000);

      if (different < 0) {
        clearInterval(interval.current);
        onOfferEnd();
      } else {
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    });

    return () => {
      clearInterval(interval);
    };
  }, [onOfferEnd]);

  return (
    <div className="clock__wrapper d-flex align-items-center gap-3 ">
      <div className="clock__data d-flex align-items-center  gap-2">
        <div className="text-center">
          <h1 className="text-white fs-3 mb-1">{days}</h1>
          <span className="text-white fs-6">Days</span>
        </div>
        <span className="text-white fs-3">:</span>
      </div>

      <div className="clock__data d-flex align-items-center  gap-2">
        <div className="text-center">
          <h1 className="text-white fs-3 mb-1">{hours}</h1>
          <span className="text-white fs-6">Hours</span>
        </div>
        <span className="text-white fs-3">:</span>
      </div>

      <div className="clock__data d-flex align-items-center  gap-2">
        <div className="text-center">
          <h1 className="text-white fs-3 mb-1">{minutes}</h1>
          <span className="text-white fs-6">Minutes</span>
        </div>
        <span className="text-white fs-3">:</span>
      </div>

      <div className="clock__data d-flex align-items-center  gap-2">
        <div className="text-center">
          <h1 className="text-white fs-3 mb-1">{seconds}</h1>
          <span className="text-white fs-6">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default Clock;
