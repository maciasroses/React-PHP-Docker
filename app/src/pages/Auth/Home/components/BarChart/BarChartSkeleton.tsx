const BarChartSkeleton = () => {
  return (
    <div role="status" className="p-4 rounded shadow animate-pulse md:p-6">
      <div className="flex flex-col items-center">
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
        <div className="w-48 h-2 mb-10 bg-gray-300 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="flex items-baseline mt-4">
        <div className="w-full bg-gray-300 rounded-t-lg h-52 dark:bg-gray-700"></div>
        <div className="w-full bg-gray-300 rounded-t-lg h-40 ms-6 dark:bg-gray-700"></div>
        <div className="w-full h-36 ms-6 bg-gray-300 rounded-t-lg dark:bg-gray-700"></div>
        <div className="hidden md:block w-full bg-gray-300 rounded-t-lg h-52 ms-6 dark:bg-gray-700"></div>
        <div className="w-full bg-gray-300 rounded-t-lg h-40 ms-6 dark:bg-gray-700"></div>
        <div className="hidden md:block w-full bg-gray-300 rounded-t-lg h-52 ms-6 dark:bg-gray-700"></div>
        <div className="hidden md:block w-full h-36 ms-6 bg-gray-300 rounded-t-lg dark:bg-gray-700"></div>
        <div className="w-full bg-gray-300 rounded-t-lg h-52 ms-6 dark:bg-gray-700"></div>
        <div className="w-full bg-gray-300 rounded-t-lg h-52 ms-6 dark:bg-gray-700"></div>
        <div className="hidden md:block w-full bg-gray-300 rounded-t-lg h-40 ms-6 dark:bg-gray-700"></div>
        <div className="w-full bg-gray-300 rounded-t-lg h-52 ms-6 dark:bg-gray-700"></div>
        <div className="w-full bg-gray-300 rounded-t-lg h-40 ms-6 dark:bg-gray-700"></div>
        <div className="w-full bg-gray-300 rounded-t-lg h-36 ms-6 dark:bg-gray-700"></div>
        <div className="hidden md:block w-full bg-gray-300 rounded-t-lg h-52 ms-6 dark:bg-gray-700"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default BarChartSkeleton;
