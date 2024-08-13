import { useDebouncedCallback } from "use-debounce";
import { useSearchParams } from "react-router-dom";

interface ISearchbar {
  searchbarProps: {
    search: string;
    filters: {
      currencies: {
        title: string;
        description: string;
        mainOption: string;
        options: {
          usd: string;
          mxn: string;
          eur: string;
          gbp: string;
        };
      };
      types: {
        title: string;
        description: string;
        mainOption: string;
        options: {
          income: string;
          expense: string;
          transfer: string;
        };
      };
    };
  };
}

const Searchbar = ({ searchbarProps }: ISearchbar) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = useDebouncedCallback((key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", "1");
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  }, 300);

  return (
    <search className="max-w-lg mx-auto mt-6">
      <div className="flex flex-col md:flex-row">
        <select
          aria-label="Currency"
          onChange={(e) => handleSearch("currency", e.target.value)}
          defaultValue={searchParams.get("currency")?.toString()}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-s-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">
            {searchbarProps.filters.currencies.mainOption}
          </option>
          {Object.entries(searchbarProps.filters.currencies.options).map(
            ([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            )
          )}
        </select>

        <select
          aria-label="Type"
          onChange={(e) => handleSearch("type", e.target.value)}
          defaultValue={searchParams.get("type")?.toString()}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">{searchbarProps.filters.types.mainOption}</option>
          {Object.entries(searchbarProps.filters.types.options).map(
            ([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            )
          )}
        </select>

        <div className="relative w-full">
          <input
            aria-label="Search events"
            placeholder={searchbarProps.search}
            type="search"
            onChange={(e) => {
              handleSearch("q", e.target.value);
            }}
            defaultValue={searchParams.get("q")?.toString()}
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          />
        </div>
      </div>
    </search>
  );
};

export default Searchbar;
