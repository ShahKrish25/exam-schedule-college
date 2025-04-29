"use client";
import React, { useState, useEffect } from "react";
import { BsArrowReturnRight } from "react-icons/bs";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaRegHourglassHalf } from "react-icons/fa6";
const Card = ({ paper, date, startTime, endTime, index }) => {
  const [tick, setTick] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [daysLeft, setDaysLeft] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState("");


  useEffect(() => {
    setIsMounted(true);
    
    const [day, month, year] = date.split("/");
    const examDate = new Date(year, month - 1, day);
    const dayName = examDate.toLocaleDateString("en-US", { weekday: "long" });
    setDayOfWeek(dayName);
    const currentDate = new Date();
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    const isToday = examDate.getTime() === today.getTime();
    const currentHour = currentDate.getHours();
    const alertShown = sessionStorage.getItem("alertShown") === "true";

    // Show toast if conditions match
    if (!alertShown && isToday && currentHour >= 13 && currentHour <= 23) {
      toast.info(`How was your today's paper? Hope you enjoyed it!`, {
        position: "top-left",
        autoClose: 5000,
        theme: "dark",
      });
      toast.success(`Hope you enjoyed it!`, {
        position: "top-left",
        autoClose: 5000,
        theme: "dark",
      });
      sessionStorage.setItem("alertShown", "true");
    }

    // Set tick if exam date has passed
    const examHasPassed = examDate <= today;
    const localStorageKey = `tick_${date}`;
    let persistedTick = localStorage.getItem(localStorageKey) === "true";
    if (examHasPassed && !persistedTick) {
      localStorage.setItem(localStorageKey, "true");
      persistedTick = true;
    }
    setTick(persistedTick);

    // Calculate days left
    const timeDiff = examDate.getTime() - today.getTime();
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    if (days > 0) setDaysLeft(days);
  }, [date]);

  // Determine text color for countdown
  const countdownTextColor = daysLeft !== null && daysLeft <= 5 ? "text-red-500" : "text-green-300";

  return (
    <>
    <div className="group relative m-6 bg-gradient-to-br from-indigo-600 to-blue-500 w-78 h-75 md:w-68 md:h-68 rounded-3xl shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="absolute top-4 left-6 flex items-center">
        <h5 className="text-2xl font-bold text-white drop-shadow-lg">Paper</h5>
        {isMounted && tick && (
          <IoCheckmarkDoneCircle className="ml-2 text-2xl text-green-400 drop-shadow-lg" />
        )}
      </div>

      <h2 className="absolute top-13 bg-gradient-to-br from-indigo-600 to-blue-500 p-2 rounded-2xl left-6 text-2xl font-bold text-white drop-shadow-lg">
        {paper}
      </h2>

      <div className="absolute top-[0.3rem] right-6">
        <span className="text-xl font-bold text-yellow-300 drop-shadow-md p-2 px-3 bg-zinc-800 rounded-b-full">
          {index}
        </span>
      </div>

      {/* Days Left Countdown Badge */}
      {daysLeft !== null && (
        <div className="absolute top-[4.2rem] right-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-xl animate-pulse">
          <FaRegHourglassHalf  className={`text-lg ${countdownTextColor}`} />
          <span className={`font-semibold ${countdownTextColor}`}>
            {daysLeft} day{daysLeft !== 1 && "s"} left
          </span>
        </div>
      )}

      <div className="absolute bottom-4 left-6 text-white">
        <p className="mb-1 text-2xl absolute top-[-60px] left-1">Date</p>
        <BsArrowReturnRight className="absolute top-[-30px] left-12 text-xl" />
        <span className="font-bold text-gray-300 bg-zinc-600 px-3 py-1 text-lg rounded-lg absolute top-[-37px] left-19">
          {date}
        </span>
        <p className="mb-1 text-lg mt-2 font-bold">Start: {startTime}</p>
        <p className="mb-1 text-lg font-bold">End: {endTime}</p>
      </div>
      <p className="absolute bottom-[-4px] right-5 text-gray-100 mb-1 text-md font-bold">Day: {dayOfWeek}</p>

      <div className="absolute inset-0 rounded-3xl pointer-events-none group-hover:bg-black/10 transition duration-300"></div>
    </div>
    </>
  );
};

export default Card;
