import { useSearchParams } from "react-router-dom";

const CurrencySelector = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelect = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    setSearchParams(params);
  };

  return (
    <div className="flex flex-wrap justify-end">
      <div className="flex items-center me-4">
        <input
          aria-label="Currency USD"
          id="usd"
          name="currency"
          type="radio"
          onChange={(e) => handleSelect("currency", e.target.id)}
          defaultChecked={
            searchParams.get("currency") === "usd" ||
            !searchParams.get("currency")
          }
          className="w-4 h-4"
        />
        <label
          htmlFor="usd"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          USD
        </label>
      </div>
      <div className="flex items-center me-4">
        <input
          aria-label="Currency MXN"
          id="mxn"
          name="currency"
          type="radio"
          onChange={(e) => handleSelect("currency", e.target.id)}
          defaultChecked={searchParams.get("currency") === "mxn"}
          className="w-4 h-4"
        />
        <label
          htmlFor="mxn"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          MXN
        </label>
      </div>
      <div className="flex items-center me-4">
        <input
          aria-label="Currency EUR"
          id="eur"
          name="currency"
          type="radio"
          onChange={(e) => handleSelect("currency", e.target.id)}
          defaultChecked={searchParams.get("currency") === "eur"}
          className="w-4 h-4"
        />
        <label
          htmlFor="eur"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          EUR
        </label>
      </div>
      <div className="flex items-center me-4">
        <input
          aria-label="Currency GBP"
          id="gbp"
          name="currency"
          type="radio"
          onChange={(e) => handleSelect("currency", e.target.id)}
          defaultChecked={searchParams.get("currency") === "gbp"}
          className="w-4 h-4"
        />
        <label
          htmlFor="gbp"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          GBP
        </label>
      </div>
    </div>
  );
};

export default CurrencySelector;
