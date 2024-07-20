import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalId = useRef(null);
  const startTimeRef = useRef(0);
  useEffect(() => {
    if (isRunning) {
      intervalId.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => {
      clearInterval(intervalId.current);
    };
  }, [isRunning]);
  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }
  function stop() {
    setIsRunning(false);
  }
  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }
  function formatTime() {
    let mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let sec = Math.floor((elapsedTime / 1000) % 60);
    let milisec = Math.floor((elapsedTime % 1000) / 10);

    mins = String(mins).padStart(2, "0");
    sec = String(sec).padStart(2, "0");
    milisec = String(milisec).padStart(2, "0");
    return `${mins}:${sec}:${milisec}`;
  }
  return (
    <div>
      <div className="container">
        <div className="stopwatch">{formatTime()}</div>
        <div className="controls">
          <button className="start-button" onClick={start}>
            Start
          </button>
          <button className="reset-button" onClick={reset}>
            Reset
          </button>
          <button className="stop-button" onClick={stop}>
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}
export default StopWatch;
