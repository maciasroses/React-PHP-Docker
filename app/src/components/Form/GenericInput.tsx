import clsx from "clsx";

interface IGenericInput {
  id: string;
  ariaLabel: string;
  type: string;
  step?: string;
  rows?: number;
  options?: { value: string; label: string }[];
  defaultValue?: string;
  defaultChecked?: boolean;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  error?: string;
}

const GenericInput: React.FC<IGenericInput> = ({
  id,
  ariaLabel,
  type,
  step,
  rows = 3,
  options,
  defaultValue,
  defaultChecked,
  placeholder,
  className = "",
  labelClassName = "",
  error,
}) => {
  const commonProps = {
    id,
    name: id,
    "aria-label": ariaLabel,
    defaultValue,
    className: clsx(
      "border w-full p-2.5 text-sm rounded-lg dark:bg-gray-700",
      className,
      error
        ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
        : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
    ),
  };

  return (
    <>
      <label htmlFor={id} className={labelClassName}>
        {ariaLabel}
      </label>
      {type === "textarea" ? (
        <textarea placeholder={placeholder} rows={rows} {...commonProps} />
      ) : type === "select" && options ? (
        <select {...commonProps}>
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          placeholder={placeholder}
          type={type}
          step={step}
          defaultChecked={defaultChecked}
          {...commonProps}
        />
      )}
      {error && <small className="text-red-600">{error}</small>}
    </>
  );
};

export default GenericInput;
