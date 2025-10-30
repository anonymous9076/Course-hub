import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Formik, ErrorMessage, Field } from "formik";
import { useState } from "react";
import FileUpload from "../components/elements/FileUpload";
import CustomSelect from "../components/elements/CustomSelect";
import CustomTextArea from "../components/elements/CustomeTextarea";

const Upload = () => {
  const typeOptions = [
    { label: "Course Video", value: "course" },
    { label: "Question Paper", value: "ques" },
  ];

  const categoryOptions = [
    { label: "Math", value: "math" },
    { label: "Science", value: "science" },
    { label: "History", value: "history" },
  ];

  const userSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    type: z.string().nonempty("Select a type"),
    category: z.string().nonempty("Select a category"),
    description: z.string().min(2, "Description must be at least 2 characters"),
    file: z.any().optional(),
  });

  return (
    <div className="h-fit w-full py-10">
      <div className="w-[50%] bg-gray-50 p-6 rounded-3xl mx-auto">
        <p className="text-3xl font-bold text-primary text-center py-4 pb-6">
          Share Your Research
        </p>

        <Formik
          initialValues={{
            title: "",
            type: "",
            category: "",
            description: "",
            file: null,
          }}
          validationSchema={toFormikValidationSchema(userSchema)}
          onSubmit={(values) => console.log(values, "Form submitted")}
        >
          {({ handleSubmit, formik, setFieldValue, values }) => (
            <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4">
              
              {/* Title */}
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-900">
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Type Select */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-900">
                  Type
                </label>
                <CustomSelect
                  name="type"
                  options={typeOptions}
                  formik={{ values, setFieldValue }} 
                  placeholder="Select type"
                  defaultValue={values?.type || ""}
                />
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Category Select */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-900">
                  Category
                </label>
                <CustomSelect
                  name="category"
                  options={categoryOptions}
                  formik={{ values, setFieldValue }} 
                  placeholder="Select category"
                  defaultValue={values?.category || ""}
                />
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Description */}
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-900">
                  {values.type === "course" ? "Course Description" : values.type === "ques" ? "Notes" : "Description"}
                </label>
                <CustomTextArea
                  name="description"
                  formik={formik}
                  placeholder={
                    values.type === "course"
                      ? "Write course description..."
                      : values.type === "ques"
                      ? "Write notes..."
                      : "Write description..."
                  }
                  rows={6}
                />
              </div>

              {/* File Upload */}
              <div className="col-span-4">
                <FileUpload
                  name="file"
                  placeholder="Upload your source file" 
                />
              </div>

              {/* Submit */}
              <div className="w-full col-span-4 flex justify-end">
                <button type="submit" className="btn-primary">
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

export default Upload;
