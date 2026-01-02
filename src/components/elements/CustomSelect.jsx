import { useState, useEffect, useRef } from "react";

export default function CustomSelect({
  name,
  options,
  formik,
  placeholder = "Select option",
  onChange,
  className = "",
  disabled = false,
}) {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (formik?.values && name) {
      const currentValue = formik.values[name];
      const found = options.find((opt) => opt.value === currentValue);
      setSelected(found || null);
    }
  }, [formik?.values, options, name]);

  //  Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //  Handle select
  const handleSelect = (option) => {
    if (disabled) return;
    setSelected(option);
    setOpen(false);

    // update parent onChange
    if (onChange) onChange(option);

    // update Formik value
    if (formik && name) {
      formik.setFieldValue(name, option.value);
    }
    console.log(option);
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block w-full text-left ${className} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      {/* Trigger Button */}
      <button
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        type="button"
        className={`inline-flex items-center justify-between w-full py-2.5 px-4 text-sm font-medium border rounded-lg focus:outline-none transition-colors ${disabled
            ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
      >
        <span className="flex items-center truncate text-gray-800">
          {selected?.icon && <span className="mr-2">{selected.icon}</span>}
          {selected ? selected.label : placeholder}
        </span>

        <svg
          className={`w-2.5 h-2.5 ml-2.5 transition-transform duration-150 ${open ? "rotate-180" : ""
            }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-full">
          <ul className="py-2 text-sm text-gray-800 max-h-60 overflow-auto">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 text-gray-800 items-center"
                >
                  {option.icon && <span className="mr-2">{option.icon}</span>}
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
