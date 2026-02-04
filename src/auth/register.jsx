import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Formik, ErrorMessage, Field } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterUser, useGoogleLoginUser } from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import { User, Mail, Lock, UserPlus, Loader2, CheckCircle2 } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
const registerHero = "/Images/43.jpg";

const Register = () => {
  const registerSchema = z
    .object({
      name: z.preprocess(
        (val) => (typeof val === "string" ? val.trim() : ""),
        z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters")
      ),
      email: z.preprocess(
        (val) => (typeof val === "string" ? val.trim() : ""),
        z.string().min(1, "Email is required").email("Invalid email address")
      ),
      password: z.preprocess(
        (val) => (typeof val === "string" ? val.trim() : ""),
        z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters")
      ),
      confirmPassword: z.preprocess(
        (val) => (typeof val === "string" ? val.trim() : ""),
        z.string().min(1, "Confirm Password is required")
      ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const navigate = useNavigate();
  const registerMutation = useRegisterUser();
  const googleLoginMutation = useGoogleLoginUser();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await googleLoginMutation.mutateAsync({ token: tokenResponse.access_token });
    },
    onError: () => toast.error("Google Signup Failed"),
  });

  return (
    <div className="min-h-screen w-full flex bg-[#F0F7FF] items-center justify-center p-4 font-['Inter',sans-serif]">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-5xl w-full bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row-reverse min-h-[650px]">
        {/* Left Side (Illustration) */}
        <div className="md:w-[45%] bg-[#2D5CFE] p-10 text-white hidden md:flex flex-col justify-between relative overflow-hidden">
          {/* Abstract Shapes */}
          <div className="absolute top-10 right-10 w-8 h-12 bg-[#FFD66B] rounded-full opacity-80 transform rotate-[30deg]"></div>
          <div className="absolute top-40 left-10 w-6 h-10 bg-[#FF7E5F] rounded-full opacity-80 transform rotate-[-15deg]"></div>
          <div className="absolute center-20 right-20 w-10 h-10 bg-[#4ADE80] rounded-full opacity-80"></div>
          <div className="absolute bottom-20 left-20 w-8 h-12 bg-[#38BDF8] rounded-full opacity-80 transform rotate-[45deg]"></div>

          <div className="relative z-10 flex flex-col items-center justify-center flex-grow">
            <div className="relative w-full max-w-[280px]">
              {/* Main Card UI Mockup */}
              <div className="bg-white rounded-3xl p-5 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl overflow-hidden">
                    <img src="/Images/43.jpg" alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-[#1E293B] font-bold text-xs">Join Our Community</h3>
                    <p className="text-gray-400 text-[10px] text-[#2D5CFE]">Professional Learning</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-1.5 bg-gray-100 rounded-full"></div>
                  <div className="w-3/4 h-1.5 bg-gray-50 rounded-full"></div>
                </div>
              </div>

              {/* Smaller floating elements */}
              <div className="absolute -left-6 top-1/4 bg-white rounded-2xl p-2.5 shadow-xl transform -rotate-12">
                <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center text-xs">
                  🎓
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold mb-3">Empower Your <br /> Future</h2>
              <p className="text-blue-100 text-xs opacity-80 max-w-[240px] mx-auto">
                Create an account to start your journey today.
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-2 relative z-10">
            <div className="w-1.5 h-1 bg-white/30 rounded-full"></div>
            <div className="w-5 h-1 bg-white rounded-full"></div>
            <div className="w-1.5 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="md:w-[55%] p-8 lg:p-12 flex flex-col justify-center bg-white">
          <div className="mb-8 flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
              <div className="text-blue-600 font-bold text-lg flex flex-col items-center">
                <div className="h-0.5 w-5 bg-blue-600 mb-0.5 rounded-full"></div>
                <div className="h-0.5 w-3 bg-blue-400 mb-0.5 rounded-full"></div>
                <div className="h-0.5 w-5 bg-blue-600 rounded-full"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-[#1E293B] mb-1.5">Create Account</h1>
            <p className="text-gray-400 text-center text-xs">
              Sign up today and join our learning family.
            </p>
          </div>

          <Formik
            initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
            validationSchema={toFormikValidationSchema(registerSchema)}
            onSubmit={async (values) => {
              try {
                await registerMutation.mutateAsync(values);
              } catch (error) {
                // Handled in mutation
              }
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit} className="space-y-3.5 max-w-[380px] mx-auto w-full">
                <div className="space-y-1">
                  <div className="relative">
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Full Name"
                      className="block w-full px-5 py-3 bg-gray-50 border border-transparent rounded-[16px] outline-none focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-300 placeholder-gray-400 text-[#1E293B] text-sm"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300">
                      <User size={16} />
                    </div>
                  </div>
                  <ErrorMessage name="name" component="div" className="text-red-500 text-[10px] ml-2 font-medium" />
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      className="block w-full px-5 py-3 bg-gray-50 border border-transparent rounded-[16px] outline-none focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-300 placeholder-gray-400 text-[#1E293B] text-sm"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300">
                      <Mail size={16} />
                    </div>
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-[10px] ml-2 font-medium" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <div className="relative">
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        className="block w-full px-5 py-3 bg-gray-50 border border-transparent rounded-[16px] outline-none focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-300 placeholder-gray-400 text-[#1E293B] text-sm"
                      />
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-500 text-[10px] ml-2 font-medium" />
                  </div>

                  <div className="space-y-1">
                    <div className="relative">
                      <Field
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm"
                        className="block w-full px-5 py-3 bg-gray-50 border border-transparent rounded-[16px] outline-none focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-300 placeholder-gray-400 text-[#1E293B] text-sm"
                      />
                    </div>
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-[10px] ml-2 font-medium" />
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting || registerMutation.isPending}
                    className="w-full flex items-center justify-center py-3.5 bg-[#2D5CFE] text-white rounded-[16px] text-base font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting || registerMutation.isPending ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>

                <div className="relative flex items-center justify-center py-1">
                  <div className="border-t border-gray-100 w-full absolute"></div>
                  <span className="bg-white px-3 text-gray-400 text-[10px] relative z-10">OR</span>
                </div>

                <button
                  type="button"
                  className="w-full flex items-center justify-center py-3 bg-white border border-gray-100 text-gray-600 rounded-[16px] text-xs font-semibold hover:bg-gray-50 transition-all duration-300 gap-2.5"
                  onClick={() => handleGoogleLogin()}
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google" />
                  Sign up with Google
                </button>

                <div className="pt-4 text-center">
                  <p className="text-gray-400 text-[11px]">
                    Already have an account?
                    <Link to="/login" className="text-blue-600 font-bold ml-1 hover:underline">
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div >
  );
};

export default Register;
