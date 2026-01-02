import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Formik, ErrorMessage, Field } from "formik";
import { toast, ToastContainer } from "react-toastify";
import FileUpload from "../components/elements/FileUpload";
import CustomSelect from "../components/elements/CustomSelect";
import CustomTextArea from "../components/elements/CustomeTextarea";
import { useCreateCourse } from "../hooks/useCourse";
import { useCreateQuestionPaper } from "../hooks/useQuestion";
import { useAddCategory, useGetCategories } from "../hooks/useCategory";
import { useState } from "react";
import { X } from "lucide-react";

import { useSearchParams, useNavigate } from "react-router-dom";
import { useUpdateCourse, useGetCourseById } from "../hooks/useCourse";
import { useUpdateQuestionPaper, useGetQuestionPaperById } from "../hooks/useQuestion";

const Upload = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const editId = searchParams.get("edit");
  const editType = searchParams.get("type");

  const createCourseMutation = useCreateCourse();
  const updateCourseMutation = useUpdateCourse();
  const createQuestionPaperMutation = useCreateQuestionPaper();
  const updateQuestionPaperMutation = useUpdateQuestionPaper();

  const { data: categoryData } = useGetCategories();
  const { mutate: addCategory } = useAddCategory();

  // Fetch data if editing
  const { data: existingCourse, isLoading: loadingCourse } = useGetCourseById(editType === 'course' ? editId : null);
  const { data: existingPaper, isLoading: loadingPaper } = useGetQuestionPaperById(editType === 'ques' ? editId : null);

  const [newCat, setNewCat] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isEditing = !!editId;
  const isLoadingData = (editType === 'course' && loadingCourse) || (editType === 'ques' && loadingPaper);

  const typeOptions = [
    { label: "Course Video", value: "course" },
    { label: "Question Paper", value: "ques" },
  ];

  const categoryOptions = categoryData?.categories?.map((c) => ({
    label: c.name,
    value: c.name,
    id: c._id
  })) || [];

  const uploadSchema = z.object({
    title: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : ""),
      z.string().min(1, "Title is required").min(2, "Title must be at least 2 characters")
    ),

    type: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : ""),
      z.string().min(1, "Select a type")
    ),

    category: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : ""),
      z.string().min(1, "Select a category")
    ),

    description: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : ""),
      z.string().min(1, "Description is required").min(2, "Description must be at least 2 characters")
    ),

    file: z.any().optional(),
  });

  const isUploading = createCourseMutation.isPending ||
    createQuestionPaperMutation.isPending ||
    updateCourseMutation.isPending ||
    updateQuestionPaperMutation.isPending;

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("category", values.category);

      let success = false;
      if (values.type === "course") {
        formData.append("description", values.description);
        if (values.file) {
          formData.append("file", values.file);
        }

        if (isEditing) {
          await updateCourseMutation.mutateAsync({ id: editId, data: formData });
          success = true;
        } else {
          await createCourseMutation.mutateAsync(formData);
          success = true;
        }
      } else if (values.type === "ques") {
        formData.append("notes", values.description);
        if (values.file) {
          if (Array.isArray(values.file)) {
            values.file.forEach((f) => formData.append("files", f));
          } else {
            formData.append("files", values.file);
          }
        }

        if (isEditing) {
          await updateQuestionPaperMutation.mutateAsync({ id: editId, data: formData });
          success = true;
        } else {
          await createQuestionPaperMutation.mutateAsync(formData);
          success = true;
        }
      }

      if (success) {
        if (isEditing) {
          // Navigate back to details
          navigate(values.type === 'course' ? `/view-course/${editId}` : `/view-paper/${editId}`);
        } else {
          resetForm();
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const initialValues = {
    title: (editType === 'course' ? existingCourse?.data?.title : existingPaper?.data?.title) || "",
    type: editType || "",
    category: (editType === 'course' ? existingCourse?.data?.category : existingPaper?.data?.category) || "",
    description: (editType === 'course' ? existingCourse?.data?.description : (existingPaper?.data?.notes || existingPaper?.data?.description)) || "",
    file: null,
  };

  if (isLoadingData) return <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-gray-500 font-bold">Loading content details...</p>
    </div>
  </div>;

  return (
    <div className="h-fit w-full py-10 bg-gray-50/50 min-h-screen">
      <ToastContainer />
      <div className="w-[90%] md:w-[60%] lg:w-[50%] bg-white p-8 rounded-[40px] mx-auto border border-gray-100 shadow-2xl shadow-blue-100/50">
        <div className="flex justify-between items-center mb-8">
          <p className="text-3xl font-black text-[#2C3E50]">
            {isEditing ? (
              <span className="flex items-center gap-3">
                <span className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                  <X className="rotate-45" size={24} />
                </span>
                Edit {editType === 'course' ? 'Course' : 'Paper'}
              </span>
            ) : "Share Your Research"}
          </p>
          {isEditing && (
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-100 text-gray-500 rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>

        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(uploadSchema)}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, setFieldValue, values }) => (
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
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Type
                </label>
                <CustomSelect
                  name="type"
                  options={typeOptions}
                  formik={{ values, setFieldValue }}
                  placeholder="Select type"
                  disabled={isEditing}
                />
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Category Select */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-900 flex justify-between items-center mb-1">
                  Category
                  {!isEditing && (
                    <button type="button" onClick={() => setIsModalOpen(true)} className="text-xs text-blue-500 font-bold hover:underline">
                      + Create New
                    </button>
                  )}
                </label>
                <CustomSelect
                  name="category"
                  options={categoryOptions}
                  formik={{ values, setFieldValue }}
                  placeholder="Select category"
                />
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Description */}
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  {values.type === "course" ? "Course Description" : values.type === "ques" ? "Notes" : "Description"}
                </label>
                <CustomTextArea
                  name="description"
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
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  {values.type === 'ques' ? "Upload Images" : "Upload Video"}
                </label>
                <FileUpload
                  name="file"
                  placeholder={values.type === 'ques' ? "Drop images here or click to browse" : "Drop video here or click to browse"}
                  multiple={values.type === 'ques'}
                />
                {isEditing && (
                  <p className="text-xs text-gray-400 mt-2 font-medium">
                    * Leave empty to keep existing {editType === 'course' ? 'video' : 'images'}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="w-full col-span-4 flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={isUploading}
                  className={`px-10 py-4 bg-blue-500 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-600 hover:translate-y-[-2px] active:translate-y-[1px] transition-all flex items-center gap-2 ${isUploading ? 'opacity-50 cursor-not-allowed shadow-none' : ''}`}
                >
                  {isUploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {isEditing ? 'Updating...' : 'Uploading...'}
                    </>
                  ) : (
                    isEditing ? 'Update Content' : 'Share Now'
                  )}
                </button>
              </div>
            </form>
          )}
        </Formik>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>

              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Create New Category</h3>

              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value)}
                    placeholder="Category Name"
                    className="w-full px-4 py-2 border rounded-lg  outline-none p-4"
                    autoFocus
                  />
                </div>

                <button
                  onClick={handleAddCategory}
                  className="w-full btn-primary py-2.5 rounded-xl"
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
