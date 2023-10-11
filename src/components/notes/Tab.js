import React from "react";

const Tab = ({ tab, setTab }) => {
  return (
    <div className="flex justify-center">
      <div className="w-screen max-w-2xl">
        <ul className="text-sm font-medium text-center text-gray-500 divide-gray-200 rounded-lg shadow flex dark:divide-gray-700 dark:text-gray-400">
          <li onClick={() => setTab("ALL")} className="w-full cursor-pointer">
            <span
              className={`${
                tab === "ALL"
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "bg-white dark:bg-gray-800"
              } ${"inline-block w-full p-4  hover:text-gray-700 rounded-l-lg hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white  dark:hover:bg-gray-700"}`}
            >
              Notes
            </span>
          </li>
          <li onClick={() => setTab("SAVED")} className="w-full cursor-pointer">
            <span
              className={`${
                tab === "SAVED"
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "bg-white dark:bg-gray-800"
              } ${"inline-block w-full p-4  hover:text-gray-700 rounded-r-lg hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white  dark:hover:bg-gray-700"}`}
            >
              Saved
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tab;
