import { ReactNode } from "react";
import { useSearchFilter } from "@/hooks";
import { SearchInput, SelectInput } from "@/components";
import type { IAdminUser, ISearchbar } from "@/interfaces";

interface ISearchbarComponent extends ISearchbar {
  users: IAdminUser[];
}

const Searchbar = ({ users, searchbarProps }: ISearchbarComponent) => {
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
    <search className="w-full my-6 flex flex-col gap-2">
      <GenericParentDiv>
        <GenericDiv>
          <FlexComponent>
            <SearchInput
              id="date_from"
              ariaLabel={searchbarProps.filters.date.from}
              type="date"
              value={filters.date_from}
              onChange={(value) => handleSearch("date_from", value)}
            />
          </FlexComponent>
          <FlexComponent>
            <SearchInput
              id="date_to"
              ariaLabel={searchbarProps.filters.date.to}
              type="date"
              value={filters.date_to}
              onChange={(value) => handleSearch("date_to", value)}
            />
          </FlexComponent>
        </GenericDiv>
        <GenericDiv>
          <FlexComponent>
            <SearchInput
              id="amount_from"
              ariaLabel={searchbarProps.filters.amount.from}
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
              ariaLabel={searchbarProps.filters.amount.to}
              type="number"
              step="0.01"
              value={filters.amount_to}
              onChange={(value) => handleSearch("amount_to", value)}
              placeholder="900"
            />
          </FlexComponent>
        </GenericDiv>
      </GenericParentDiv>
      <GenericParentDiv>
        <GenericDiv>
          <SelectInput
            ariaLabel="User"
            value={filters.user_id}
            onChange={(value: string) => handleSearch("user_id", value)}
            options={users.map((user) => ({
              value: user.id,
              label: user.name,
            }))}
            placeholder={searchbarProps.filters.user}
          />
          <SelectInput
            ariaLabel="Currency"
            value={filters.currency}
            onChange={(value: string) => handleSearch("currency", value)}
            options={Object.entries(
              searchbarProps.filters.currencies.options
            ).map(([key, value]) => ({ value: key, label: value }))}
            placeholder={searchbarProps.filters.currencies.mainOption}
          />
          <SelectInput
            ariaLabel="Type"
            value={filters.type}
            onChange={(value: string) => handleSearch("type", value)}
            options={Object.entries(searchbarProps.filters.types.options).map(
              ([key, value]) => ({ value: key, label: value })
            )}
            placeholder={searchbarProps.filters.types.mainOption}
          />
        </GenericDiv>
        <GenericDiv>
          <SearchInput
            ariaLabel="Search accountings"
            type="search"
            value={filters.q}
            onChange={(value: string) => handleSearch("q", value)}
            placeholder={searchbarProps.search}
          />
          <button
            type="button"
            onClick={clearFilters}
            className="bg-red-500 text-white text-sm p-2.5 w-full sm:w-1/3 border border-red-300 focus:ring-red-500 focus:border-red-500 dark:bg-red-500 dark:border-red-500 dark:text-white dark:focus:border-red-500"
          >
            {searchbarProps.clearFilters}
          </button>
        </GenericDiv>
      </GenericParentDiv>
    </search>
  );
};

export default Searchbar;

const GenericParentDiv = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col xl:flex-row gap-2">{children}</div>;
};

const GenericDiv = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center w-full xl:w-1/2 gap-2">
      {children}
    </div>
  );
};

const FlexComponent = ({ children }: { children: ReactNode }) => {
  return <div className="flex w-full items-center">{children}</div>;
};
