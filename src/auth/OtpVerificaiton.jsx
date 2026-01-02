import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Formik, ErrorMessage } from "formik";
import { useState } from "react";
import { InputOtp } from "primereact/inputotp";
import { ShieldCheck, ArrowRight, Loader2, RefreshCw } from "lucide-react";

const OtpVerificaiton = () => {
  const userSchema = z.object({
    otp: z.string({ invalid_type_error: "OTP must be a number" }).min(4, "Otp must be 4 digits").refine((val) => /^\d{4}$/.test(val), {
      message: "OTP must be a 4-digit number"
    })
  });

  const [token, setTokens] = useState("");
  const otpHero = "/images/download.jpg";

  return (
    <div className="min-h-screen w-full flex bg-[#F0F7FF] items-center justify-center p-4 font-['Inter',sans-serif]">
      <div className="max-w-4xl w-full bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Left Side - Illustration */}
        <div className="md:w-1/2 bg-[#2D5CFE] p-10 text-white hidden md:flex flex-col justify-between relative overflow-hidden">
          {/* Abstract Shapes */}
          <div className="absolute top-10 left-10 w-8 h-12 bg-[#FFD66B] rounded-full opacity-80 transform rotate-[30deg]"></div>
          <div className="absolute bottom-20 right-10 w-6 h-10 bg-[#FF7E5F] rounded-full opacity-80 transform rotate-[-15deg]"></div>
          <div className="absolute center-20 left-20 w-10 h-10 bg-[#4ADE80] rounded-full opacity-80"></div>

          <div className="relative z-10 flex flex-col items-center justify-center flex-grow">
            <div className="relative w-full max-w-[240px]">
              {/* Security Shield Card */}
              <div className="bg-white rounded-3xl p-6 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck size={32} className="text-[#2D5CFE]" />
                </div>
                <div className="space-y-1.5 w-full text-center">
                  <div className="h-1.5 w-full bg-gray-100 rounded-full mx-auto"></div>
                  <div className="h-1.5 w-3/4 bg-gray-50 rounded-full mx-auto"></div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <h2 className="text-2xl font-bold mb-3">Security First</h2>
              <p className="text-blue-100 text-xs opacity-80 max-w-[240px]">
                We've added an extra layer of security to protect your account.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-8 lg:p-14 flex flex-col justify-center text-center">
          <div className="mb-8 flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
              <div className="text-blue-600 font-bold text-lg flex flex-col items-center">
                <div className="h-0.5 w-5 bg-blue-600 mb-0.5 rounded-full"></div>
                <div className="h-0.5 w-3 bg-blue-400 mb-0.5 rounded-full"></div>
                <div className="h-0.5 w-5 bg-blue-600 rounded-full"></div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#1E293B] mb-1.5">Verification</h1>
            <p className="text-gray-400 text-xs max-w-[260px]">
              Enter the 4-digit code sent to your email to verify your account.
            </p>
          </div>

          <Formik
            initialValues={{ otp: "" }}
            validationSchema={toFormikValidationSchema(userSchema)}
            onSubmit={(values) => console.log(values, 'OTP Submitting')}
          >
            {({ handleSubmit, setFieldValue, isSubmitting }) => (
              <form onSubmit={handleSubmit} className="space-y-6 max-w-[280px] mx-auto w-full">
                <div className="flex flex-col items-center">
                  <InputOtp
                    value={token}
                    onChange={(e) => {
                      setTokens(e.value);
                      setFieldValue("otp", e.value);
                    }}
                    integerOnly
                    length={4}
                    className="gap-3"
                    pt={{
                      input: ({ props, state }) => ({
                        className: `w-12 h-14 text-xl font-bold rounded-[16px] border-2 transition-all duration-200 outline-none text-center
                             ${state.focused ? 'border-blue-500 bg-white ring-4 ring-blue-50 focus:border-blue-300' : 'border-gray-50 bg-gray-50 text-gray-700'}`
                      })
                    }}
                  />
                  <ErrorMessage
                    name="otp"
                    component="div"
                    className="text-red-500 text-[10px] mt-3 font-medium"
                  />
                </div>

                <div className="space-y-3.5 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || token.length < 4}
                    className="w-full flex items-center justify-center py-3.5 bg-[#2D5CFE] text-white rounded-[16px] text-base font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      "Verify Account"
                    )}
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-center mx-auto text-blue-600 font-bold text-xs hover:underline transition-all group"
                  >
                    <RefreshCw size={14} className="mr-2 group-hover:rotate-180 transition-transform duration-500" />
                    Resend Code
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificaiton;