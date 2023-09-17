"use client";
import { useLocale } from "@/context/LocaleContent";
import React, { useState } from "react";

enum ELANG {
  ENG = "English",
  AR = "Arabic",
}
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [lang, setLang] = useState(ELANG.ENG);
  const { locale, setLocale } = useLocale();

  return (
    <nav className="flex justify-between items-center font-ariel font-black text-[15px] text-midnight-blue bg-white shadow-lg h-[70px] px-[10px] lg:px-[60px] min-w-full">
      <>
        <img
          src="/images/Logo-2.png"
          alt="logo"
          className="h-[40px] w-auto object-cover "
        />
      </>
      <p className="hidden lg:block">Youtube Download</p>
      <p className="hidden lg:block">Youtube to mp3 converter</p>
      <div className="flex gap-[10px] items-center">
        <div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-vivid-red peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sea-green"></div>
          </label>
        </div>
        <div className="relative w-[150px]">
          <button
            className="flex justify-center items-center text-white gap-[10px] w-[100px] lg:w-full  h-[43px] bg-vivid-red rounded-[7px]"
            onClick={() => setShowMenu(!showMenu)}
          >
            {lang}
            <span>
              <img
                src="/images/down-arrow.png"
                alt="dropdown arrow"
                width={15}
              />
            </span>
          </button>
          {showMenu && (
            <div className="absolute flex flex-col gap-[10px] text-vivid-red px-[20px] py-[10px] bg-white shadow-lg w-full h-[70px] rounded-[10px] top-12">
              <p onClick={() => setLocale("en")} className="cursor-pointer">{ELANG.ENG}</p>
              <p onClick={() => setLocale("ar")} className="cursor-pointer">{ELANG.AR}</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
