"use client";
import React, { useState, useEffect } from "react";
import { BsArrowReturnRight } from "react-icons/bs";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { toast } from "react-toastify";

const Card = ({ paper, date, startTime, endTime, index }) => {
  const [tick, setTick] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const [day, month, year] = date.split("/");
    const examDate = new Date(year, month - 1, day);

    const currentDate = new Date();
    const today = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    const isToday = examDate.getTime() === today.getTime();
    const currentHour = currentDate.getHours();
    const alertShown = sessionStorage.getItem("alertShown") === "true";

    if (!alertShown && isToday && currentHour >= 13 && currentHour <= 23) {
      toast.info(`How was your today's paper? 
        Hope you enjoyed it!`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
      toast.success(`Hope you enjoyed it!`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
      sessionStorage.setItem("alertShown", "true");
    }

    const examHasPassed = examDate <= today;
    const localStorageKey = `tick_${date}`;
    let persistedTick = localStorage.getItem(localStorageKey) === "true";

    if (examHasPassed && !persistedTick) {
      localStorage.setItem(localStorageKey, "true");
      persistedTick = true;
    }

    setTick(persistedTick);
  }, [date]);

  return (
    <div className="group relative m-6 bg-gradient-to-br from-indigo-600 to-blue-500 w-78 h-75 md:w-68 md:h-68 rounded-3xl shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="absolute top-4 left-6 flex items-center">
        <h5 className="text-2xl font-bold text-white drop-shadow-lg">
          Paper
        </h5>
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

      <div className="absolute bottom-4 left-6 text-white">
        <p className="mb-1 text-2xl absolute top-[-60px] left-1">Date</p>
        <BsArrowReturnRight className="absolute top-[-30px] left-12 text-xl" />
        <span className="font-bold text-gray-300 bg-zinc-600 px-3 py-1 text-lg rounded-lg absolute top-[-37px] left-19">
          {date}
        </span>
        <p className="mb-1 text-lg mt-2 font-bold">Start: {startTime}</p>
        <p className="mb-1 text-lg font-bold">End: {endTime}</p>
      </div>

      <div className="absolute inset-0 rounded-3xl pointer-events-none group-hover:bg-black/10 transition duration-300"></div>
    </div>
  );
};

export default Card;
