import clsx from "clsx";

interface ISearchInput {
  id?: string;
  ariaLabel: string;
  type: string;
  step?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const SearchInput: React.FC<ISearchInput> = ({
  id,
  ariaLabel,
  type,
  step,
  value,
  onChange,
  placeholder,
  labelClassName = "",
  inputClassName = "",
}) => {
  return (
    <>
      {id && (
        <label
          htmlFor={id}
          className={clsx(
            `w-full mx-2 text-gray-500 dark:text-gray-100 ${labelClassName}`
          )}
        >
          {ariaLabel}
        </label>
      )}
      <input
        id={id}
        type={type}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={clsx(
          `w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${inputClassName}`
        )}
      />
    </>
  );
};

export default SearchInput;
