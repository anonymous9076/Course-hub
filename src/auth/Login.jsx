import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Formik, ErrorMessage, Field } from "formik";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useLoginUser } from "../hooks/useAuth";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
const loginHero = "/Images/43.jpg";

const Login = () => {
  const loginSchema = z.object({
    email: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : ""),
      z.string().min(1, "Email is required").email("Invalid email address")
    ),
    password: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : ""),
      z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters")
    ),
  });

  const loginMutation = useLoginUser();

  return (
    <div className="min-h-screen w-full flex bg-[#F0F7FF] items-center justify-center p-4 font-['Inter',sans-serif]">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-5xl w-full bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row min-h-[650px]">
        {/* Left Side - Illustration Section */}
        <div className="md:w-[45%] bg-[#2D5CFE] p-10 text-white hidden md:flex flex-col justify-between relative overflow-hidden">
          {/* Abstract Shapes */}
          <div className="absolute top-10 right-10 w-8 h-12 bg-[#FFD66B] rounded-full opacity-80 transform rotate-[30deg]"></div>
          <div className="absolute top-40 left-10 w-6 h-10 bg-[#FF7E5F] rounded-full opacity-80 transform rotate-[-15deg]"></div>
          <div className="absolute center-20 right-20 w-10 h-10 bg-[#4ADE80] rounded-full opacity-80"></div>
          <div className="absolute bottom-20 left-20 w-8 h-12 bg-[#38BDF8] rounded-full opacity-80 transform rotate-[45deg]"></div>

          <div className="relative z-10 flex flex-col items-center justify-center flex-grow">
            <div className="relative w-full max-w-[280px]">
              {/* Main Card UI Mockup */}
              <div className="bg-white rounded-3xl p-5 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl overflow-hidden">
                    <img src="/Images/43.jpg" alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-[#1E293B] font-bold text-xs">Fantasy Salad with Side Dish</h3>
                    <p className="text-gray-400 text-[10px]">$12 - 40 min</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] text-gray-500">
                    <span>Counting calories carefully</span>
                    <span className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center">
                      <div className="w-0.5 h-2.5 bg-blue-500 rounded-full"></div>
                    </span>
                  </div>
                </div>
              </div>

              {/* Smaller floating elements */}
              <div className="absolute -right-6 top-1/2 bg-white rounded-2xl p-2.5 shadow-xl transform rotate-6">
                <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center text-xs">
                  🍃
                </div>
              </div>

              <div className="absolute -left-10 bottom-8 bg-white rounded-2xl p-3 shadow-xl transform -rotate-6 w-28">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <div className="w-14 h-1 bg-gray-100 rounded-full"></div>
                </div>
                <div className="w-18 h-1 bg-gray-50 rounded-full"></div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold mb-3">New Scheduling <br /> And Routing</h2>
              <p className="text-blue-100 text-xs opacity-80 max-w-[240px] mx-auto">
                We updated our podcast format and reward system.
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-2 relative z-10">
            <div className="w-5 h-1 bg-white rounded-full"></div>
            <div className="w-1.5 h-1 bg-white/30 rounded-full"></div>
            <div className="w-1.5 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="md:w-[55%] p-8 lg:p-14 flex flex-col justify-center bg-white">
          <div className="mb-8 flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
              <div className="text-blue-600 font-bold text-lg flex flex-col items-center">
                <div className="h-0.5 w-5 bg-blue-600 mb-0.5 rounded-full"></div>
                <div className="h-0.5 w-3 bg-blue-400 mb-0.5 rounded-full"></div>
                <div className="h-0.5 w-5 bg-blue-600 rounded-full"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-[#1E293B] mb-2">Hello Again!</h1>
            <p className="text-gray-400 text-center text-xs max-w-[250px]">
              Enter your credentials to access your account.
            </p>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={toFormikValidationSchema(loginSchema)}
            onSubmit={async (values) => {
              await loginMutation.mutateAsync(values);
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit} className="space-y-5 max-w-[360px] mx-auto w-full">
                <div className="space-y-1.5">
                  <div className="relative">
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      className="block w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-[18px] outline-none focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-300 placeholder-gray-400 text-[#1E293B] text-sm"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300">
                      <Mail size={16} />
                    </div>
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-[10px] ml-2 font-medium" />
                </div>

                <div className="space-y-1.5">
                  <div className="relative">
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="block w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-[18px] outline-none focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-300 placeholder-gray-400 text-[#1E293B] text-sm"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300">
                      <Lock size={16} />
                    </div>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-[10px] ml-2 font-medium" />
                </div>

                <div className="flex justify-between items-center text-[11px] px-1">
                  <label className="flex items-center text-gray-400 cursor-pointer">
                    <input type="checkbox" className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5" />
                    Remember Me
                  </label>
                  <Link to="/forgot-password" size="small" className="text-blue-600 hover:underline font-semibold">
                    Recovery Password
                  </Link>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting || loginMutation.isPending}
                    className="w-full flex items-center justify-center py-3.5 bg-[#2D5CFE] text-white rounded-[18px] text-base font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting || loginMutation.isPending ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>

                <div className="relative flex items-center justify-center py-1">
                  <div className="border-t border-gray-100 w-full absolute"></div>
                  <span className="bg-white px-3 text-gray-400 text-[10px] relative z-10">OR</span>
                </div>

                <button
                  type="button"
                  className="w-full flex items-center justify-center py-3 bg-white border border-gray-100 text-gray-600 rounded-[18px] text-xs font-semibold hover:bg-gray-50 transition-all duration-300 gap-2.5"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google" />
                  Sign in with Google
                </button>

                <div className="pt-4 text-center">
                  <p className="text-gray-400 text-xs">
                    Don't have an account yet?
                    <Link to="/register" className="text-blue-600 font-bold ml-1 hover:underline">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
