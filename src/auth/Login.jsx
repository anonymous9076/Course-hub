import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Formik,ErrorMessage,Field } from "formik";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useLoginUser } from "../hooks/useAuth";

const Login = () => {
  const userSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8,"password must be at least 8 characters"),
  });

  const loginMutation = useLoginUser()

  return (
    <div className=" h-screen w-full flex bg-bgPrimary items-center justify-center">
      <ToastContainer></ToastContainer>
      <div className="max-w-md bg-gray-50 w-full p-6 rounded-3xl mx-auto">
        <p className="text-3xl font-bold text-primary text-center py-4 pb-6">
         Welcome Back !{" "}
        </p>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={toFormikValidationSchema(userSchema)}
          onSubmit={(values) => 
            loginMutation.mutateAsync(values)
            }
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
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

              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
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
           
              <div className="w-full flex justify-end">
                <button type="submit" className="btn-primary ">
                  Submit
                </button>
              </div>
              <div className=" text-center text-gray-600 py-4  ">Don't have an account! <Link to={'/register'} className="text-primary underline">Register Now</Link></div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
