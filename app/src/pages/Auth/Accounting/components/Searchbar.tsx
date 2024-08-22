import { useSearchFilter } from "@/hooks";
import { SearchInput, SelectInput } from "@/components/Form";
import type { ISearchbar } from "@/interfaces";

const Searchbar = ({ searchbarProps }: ISearchbar) => {
  const defaultFilters = {
    currency: "",
    type: "",
    q: "",
  };

  const { filters, handleSearch } = useSearchFilter(defaultFilters);

  return (
    <search className="max-w-lg mx-auto mt-6">
      <div className="flex flex-col md:flex-row">
        <SelectInput
          ariaLabel="Currency"
          value={filters.currency}
          onChange={(value: string) => handleSearch("currency", value)}
          options={Object.entries(
            searchbarProps.filters.currencies.options
          ).map(([key, value]) => ({ value: key, label: value }))}
          placeholder={searchbarProps.filters.currencies.mainOption}
          className="rounded-lg md:rounded-s-lg md:rounded-none"
        />
        <SelectInput
          ariaLabel="Type"
          value={filters.type}
          onChange={(value: string) => handleSearch("type", value)}
          options={Object.entries(searchbarProps.filters.types.options).map(
            ([key, value]) => ({ value: key, label: value })
          )}
          placeholder={searchbarProps.filters.types.mainOption}
          className="rounded-lg md:rounded-none"
        />
        <SearchInput
          ariaLabel="Search accountings"
          type="search"
          value={filters.q}
          onChange={(value: string) => handleSearch("q", value)}
          placeholder={searchbarProps.search}
          inputClassName="rounded-lg md:rounded-e-lg md:rounded-none"
        />
      </div>
    </search>
  );
};

export default Searchbar;
