import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Formik, ErrorMessage, Field } from "formik";
import { useState } from "react";
import { InputOtp } from "primereact/inputotp";
const OtpVerificaiton = () => {

  const userSchema = z.object({
    otp: z.string({ invalid_type_error: "OTP must be a number" }).min(4, "Otp must be of 4 digit only").refine((val) => /^\d{4}$/.test(val), {
      message: "OTP must be a 4-digit number"
    })
  })

  const [token, setTokens] = useState(null)

  return (
    <div className=" h-screen w-full flex bg-bgPrimary items-center justify-center">
      <div className="max-w-md bg-gray-50 w-full p-6 rounded-lg mx-auto">
        <p className="text-3xl font-bold text-primary text-center pt-4 pb-2 ">
          OTP Verification
        </p>
        <p className="mb-6 text-center text-gray-600">The otp has been send on your registered Email </p>
        <Formik
          initialValues={{ otp: "", }}
          validationSchema={toFormikValidationSchema(userSchema)}
          onSubmit={(values) => console.log(values, 'something is working')}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="bg-red-500 
               ">
                <InputOtp value={token} className="bg-red-300 border-2 w-fit mx-auto border-primary" onChange={(e) => setTokens(e.value)} integerOnly />
                <ErrorMessage
                  name="otp"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="w-full flex flex-col items-end">
                <p className=" text-center py-4 text-primary "> Resend</p>

                <button type="submit" className="btn-primary w-full">
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default OtpVerificaiton