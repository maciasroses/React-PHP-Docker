import { ReactNode } from "react";
import { SearchInput } from "@/components";
import { useSearchParams } from "react-router-dom";

const CurrencySelector = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelect = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    setSearchParams(params);
  };

  return (
    <div className="flex flex-wrap justify-end gap-2">
      <GenericDiv>
        <SearchInput
          id="usd"
          ariaLabel="USD"
          type="radio"
          value="usd"
          checked={
            searchParams.get("currency") === "usd" ||
            !searchParams.get("currency")
          }
          onChange={(value) => handleSelect("currency", value)}
        />
      </GenericDiv>
      <GenericDiv>
        <SearchInput
          id="mxn"
          ariaLabel="MXN"
          type="radio"
          value="mxn"
          checked={searchParams.get("currency") === "mxn"}
          onChange={(value) => handleSelect("currency", value)}
        />
      </GenericDiv>
      <GenericDiv>
        <SearchInput
          id="eur"
          ariaLabel="EUR"
          type="radio"
          value="eur"
          checked={searchParams.get("currency") === "eur"}
          onChange={(value) => handleSelect("currency", value)}
        />
      </GenericDiv>
      <GenericDiv>
        <SearchInput
          id="gbp"
          ariaLabel="GBP"
          type="radio"
          value="gbp"
          checked={searchParams.get("currency") === "gbp"}
          onChange={(value) => handleSelect("currency", value)}
        />
      </GenericDiv>
    </div>
  );
};

export default CurrencySelector;

const GenericDiv = ({ children }: { children: ReactNode }) => {
  return <div className="flex items-center">{children}</div>;
};
