import React, { useState, useRef, useEffect } from "react";
import { RiArrowDropDownFill, RiFilter3Line } from "react-icons/ri";

function FiltersDropdown({ val, setVal }) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const ref = useRef();

  const Languages = [
    "All languages",
    "JavaScript",
    "Python",
    "Java",
    "TypeScript",
    "C#",
    "C++",
    "PHP",
    "C",
    "React",
    "Ruby",
  ];

  // close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // detect whether to open up or down
  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setDropUp(spaceBelow < 300);
    }
  }, [open]);

  // handlers
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setVal((prev) => ({
      ...prev,
      language: lang === "All languages" ? "" : lang,
    }));
  };

  const handleStarsChange = (e) => {
    setVal((prev) => ({
      ...prev,
      minStars: Number(e.target.value),
    }));
  };

  const handleCreatedChange = (e) => {
    setVal((prev) => ({
      ...prev,
      created: e.target.value,
    }));
  };

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 
                   flex items-center gap-2 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 
                    hover:shadow-lg font-medium text-purple-800"
      >
        <RiFilter3Line className="text-lg" />
        <span className="md:text-base text-sm">Filters</span>
        <RiArrowDropDownFill
          className={`text-2xl transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className={`absolute ${dropUp ? "bottom-full mb-2" : "top-full mt-2"} w-80 bg-white shadow-xl border border-purple-100 rounded-2xl p-5 z-20 backdrop-blur-sm`}
        >
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-purple-100">
            <RiFilter3Line className="text-purple-600 text-lg" />
            <h2 className="text-lg font-bold text-purple-800">Advanced Filters</h2>
          </div>

          {/* Language */}
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2 text-purple-700">Language</label>
            <div className="relative">
              <select
                value={val.language || "All languages"}
                onChange={handleLanguageChange}
                className="w-full px-4 py-2.5 border border-purple-200 rounded-xl bg-purple-50 
                         focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                         transition-all duration-200 appearance-none"
              >
                {Languages.map((lang, idx) => (
                  <option key={idx} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              <RiArrowDropDownFill className="absolute right-3 top-3 text-xl text-purple-500 pointer-events-none" />
            </div>
          </div>

          {/* Minimum Stars */}
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2 text-purple-700">
              Minimum Stars: <span className="text-purple-600 font-bold">{val.minStars ?? 0}</span>
            </label>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={val.minStars ?? 0}
              onChange={handleStarsChange}
              className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer 
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 
                       [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full 
                       [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:border-0
                       [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <div className="flex justify-between text-xs text-purple-500 mt-2">
              <span>0</span>
              <span>10000+</span>
            </div>
          </div>

          {/* Created */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-2 text-purple-700">Created</label>
            <div className="relative">
              <select
                value={val.created || "Any time"}
                onChange={handleCreatedChange}
                className="w-full px-4 py-2.5 border border-purple-200 rounded-xl bg-purple-50 
                         focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                         transition-all duration-200 appearance-none"
              >
                <option value="Any time">Any time</option>
                <option value="Past week">Past week</option>
                <option value="Past month">Past month</option>
              </select>
              <RiArrowDropDownFill className="absolute right-3 top-3 text-xl text-purple-500 pointer-events-none" />
            </div>
          </div>

          {/* Active filters indicator */}
          <div className="mt-4 pt-3 border-t border-purple-100">
            <p className="text-xs text-purple-600">
              Active filters:{" "}
              {[val.language && `Language: ${val.language}`, 
                val.minStars > 0 && `Stars: ${val.minStars}+`,
                val.created && val.created !== "Any time" && `Created: ${val.created}`]
                .filter(Boolean).join(", ") || "None"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FiltersDropdown;