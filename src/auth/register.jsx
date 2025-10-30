import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Formik, ErrorMessage, Field } from "formik";
import { Link } from "react-router-dom";

const Register = () => {
  const userSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "password must be at least 8 characters"),
  })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });;

  return (
    <div className=" h-screen w-full flex bg-bgPrimary items-center justify-center">
      <div className="max-w-md bg-gray-50 w-full p-6 rounded-3xl mx-auto">
        <p className="text-3xl font-bold text-primary text-center py-4 pb-6">
          Create a new Account{" "}
        </p>
        <Formik
          initialValues={{ name: "", email: "", password: "",confirmPassword:"" }}
          validationSchema={toFormikValidationSchema(userSchema)}
          onSubmit={(values) => console.log(values, 'something is working')}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="">
                <label
                  htmlFor="email"
                  className="block  text-sm font-medium text-gray-900"
                >
                  Full Name
                </label>
                <Field
                  type="name"
                  name="name"
                  id="name"
                  placeholder="John wick"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="">
                <label
                  htmlFor="email"
                  className="block  text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@example.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="">
                <label
                  htmlFor="password"
                  className="block  text-sm font-medium text-gray-900"
                >
                  Your password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="********"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="">
                <label
                  htmlFor="confirm-password"
                  className="block  text-sm font-medium text-gray-900"
                >
                  Confirm password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="password1"
                  placeholder="********"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="w-full flex justify-end">
                <button type="submit" className="btn-primary ">
                  Submit
                </button>
              </div>
              <div className=" text-center text-gray-600   ">Already have an account! <Link to={'/login'} className="text-primary underline">Login Now</Link></div>

            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
