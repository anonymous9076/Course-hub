import { Field, ErrorMessage } from "formik";

export default function CustomTextArea({
    name,
    label,
    formik,
    placeholder = "Enter text...",
    className = "",
}) {
    return (
        <div className={`w-full ${className}`}>
            <label
                htmlFor="confirm-password"
                className="block  text-sm font-medium text-gray-900"
            >
                {label}
            </label>
            <Field
                as="textarea"
                id={name}
                name={name}
                placeholder={placeholder}
                rows={3}
                className="w-full p-2.5 border bg-white border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
                name={name}
                component="div"
                className="text-red-500 text-sm mt-1"
            />
        </div>
    );
}
