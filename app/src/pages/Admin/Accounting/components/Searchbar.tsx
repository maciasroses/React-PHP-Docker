import { SearchInput, SelectInput } from "@/components/Form";
import { useSearchFilter } from "@/hooks";
import type { IAdminUser } from "@/interfaces";
import { ReactNode } from "react";

interface ISearchbar {
  users: IAdminUser[];
}

const Searchbar = ({ users }: ISearchbar) => {
  const defaultFilters = {
    date_from: "",
    date_to: "",
    amount_from: "",
    amount_to: "",
    user_id: "",
    currency: "",
    type: "",
    q: "",
  };

  const { filters, handleSearch, clearFilters } =
    useSearchFilter(defaultFilters);

  return (
    <search className="w-full my-6">
      <div className="flex flex-col xl:flex-row">
        <div className="flex flex-col sm:flex-row items-center w-full xl:w-1/2">
          <FlexComponent>
            <SearchInput
              id="date_from"
              ariaLabel="Date from"
              type="date"
              value={filters.date_from}
              onChange={(value) => handleSearch("date_from", value)}
            />
          </FlexComponent>
          <FlexComponent>
            <SearchInput
              id="date_to"
              ariaLabel="Date to"
              type="date"
              value={filters.date_to}
              onChange={(value) => handleSearch("date_to", value)}
            />
          </FlexComponent>
        </div>
        <div className="flex flex-col sm:flex-row items-center w-full xl:w-1/2">
          <FlexComponent>
            <SearchInput
              id="amount_from"
              ariaLabel="Amount from"
              type="number"
              step="0.01"
              value={filters.amount_from}
              onChange={(value) => handleSearch("amount_from", value)}
              placeholder="100"
            />
          </FlexComponent>
          <FlexComponent>
            <SearchInput
              id="amount_to"
              ariaLabel="Amount to"
              type="number"
              step="0.01"
              value={filters.amount_to}
              onChange={(value) => handleSearch("amount_to", value)}
              placeholder="900"
            />
          </FlexComponent>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row">
        <div className="flex flex-col sm:flex-row w-full xl:w-1/2">
          <SelectInput
            ariaLabel="User"
            value={filters.user_id}
            onChange={(value: string) => handleSearch("user_id", value)}
            options={users.map((user) => ({
              value: user.id,
              label: user.name,
            }))}
            placeholder="Select a user"
          />

          <select
            aria-label="Currency"
            value={filters.currency}
            onChange={(e) => handleSearch("currency", e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select a currency</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="MXN">MXN</option>
          </select>

          <select
            aria-label="Type"
            value={filters.type}
            onChange={(e) => handleSearch("type", e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select a type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
            <option value="Transfer">Transfer</option>
          </select>
        </div>
        <div className="flex flex-col sm:flex-row w-full xl:w-1/2">
          <input
            aria-label="Search accounting"
            placeholder="Search accounting"
            type="search"
            value={filters.q}
            onChange={(e) => {
              handleSearch("q", e.target.value);
            }}
            className="block p-2.5 w-full sm:w-2/3 z-20 text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          />
          <button
            type="button"
            onClick={clearFilters}
            className="bg-red-500 text-white text-sm p-2.5 w-full sm:w-1/3 border border-red-300 focus:ring-red-500 focus:border-red-500 dark:bg-red-500 dark:border-red-500 dark:text-white dark:focus:border-red-500"
          >
            Clear filters
          </button>
        </div>
      </div>
    </search>
  );
};

export default Searchbar;

const FlexComponent = ({ children }: { children: ReactNode }) => {
  return <div className="flex w-full items-center">{children}</div>;
};
