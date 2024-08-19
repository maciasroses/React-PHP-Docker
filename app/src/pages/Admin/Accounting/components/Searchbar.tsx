import { IAdminUser } from "@/interfaces";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

interface ISearchbar {
  users: IAdminUser[];
}

const Searchbar = ({ users }: ISearchbar) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = useDebouncedCallback((key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  }, 300);
  return (
    <search className="w-full mt-6">
      <div className="flex flex-col md:flex-row">
        <select
          aria-label="User"
          onChange={(e) => handleSearch("user_id", e.target.value)}
          defaultValue={searchParams.get("user_id")?.toString()}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <input
          aria-label="Search accounting"
          placeholder="Search accounting"
          type="search"
          onChange={(e) => {
            handleSearch("q", e.target.value);
          }}
          defaultValue={searchParams.get("q")?.toString()}
          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        />
      </div>
    </search>
  );
};

export default Searchbar;
