import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Formik, ErrorMessage, Field } from "formik";
import { toast, ToastContainer } from "react-toastify";
import FileUpload from "../components/elements/FileUpload";
import CustomSelect from "../components/elements/CustomSelect";
import CustomTextArea from "../components/elements/CustomeTextarea";
import { useCreateCourse } from "../hooks/useCourse";
import { useCreateQuestionPaper } from "../hooks/useQuestion";
import { useAddCategory, useGetCategories, useDeleteCategory } from "../hooks/useCategory";
import { useUserDetails } from "../hooks/useAuth";
import { useState } from "react";
import { X, Layout, BookOpen, FileText, Plus } from "lucide-react";

import { useSearchParams, useNavigate } from "react-router-dom";
import { useUpdateCourse, useGetCourseById, useGetCourses } from "../hooks/useCourse";
import { useUpdateQuestionPaper, useGetQuestionPaperById, useGetQuestionPapers } from "../hooks/useQuestion";
import Card from "../components/Card";
import QuestionCard from "../components/QuestionCard";

const Upload = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const editId = searchParams.get("edit");
  const editType = searchParams.get("type");

  // State for Tabs
  const [activeTab, setActiveTab] = useState(editId ? "upload" : "upload");

  const createCourseMutation = useCreateCourse();
  const updateCourseMutation = useUpdateCourse();
  const createQuestionPaperMutation = useCreateQuestionPaper();
  const updateQuestionPaperMutation = useUpdateQuestionPaper();

  const { data: categoryData } = useGetCategories();
  const { mutate: addCategory } = useAddCategory();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { data: userData } = useUserDetails();
  const user = userData?.user;

  // Fetch User's Content
  const { data: myCourses, isLoading: loadingMyCourses } = useGetCourses(user?._id ? { created_by: user._id } : null);
  const { data: myPapers, isLoading: loadingMyPapers } = useGetQuestionPapers(user?._id ? { created_by: user._id } : null);

  // Fetch data if editing
  const { data: existingCourse, isLoading: loadingCourse } = useGetCourseById(editType === 'course' ? editId : null);
  const { data: existingPaper, isLoading: loadingPaper } = useGetQuestionPaperById(editType === 'ques' ? editId : null);

  const [newCat, setNewCat] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isEditing = !!editId;
  const isLoadingData = (editType === 'course' && loadingCourse) || (editType === 'ques' && loadingPaper);

  const handleAddCategory = () => {
    if (!newCat.trim()) {
      toast.error("Category name is required");
      return;
    }
    addCategory({ name: newCat }, {
      onSuccess: () => {
        setIsModalOpen(false);
        setNewCat("");
      }
    });
  };

  const handleDeleteCategory = (category) => {
    if (window.confirm(`Are you sure you want to delete "${category.label}"?`)) {
      deleteCategory(category.id);
    }
  };

  const typeOptions = [
    { label: "Course Video", value: "course" },
    { label: "Question Paper", value: "ques" },
  ];

  const categoryOptions = categoryData?.categories?.map((c) => ({
    label: c.name,
    value: c.name,
    id: c._id,
    canDelete: user?._id === c.createdBy || user?.role === 'admin'
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
          navigate(values.type === 'course' ? `/view-course/${editId}` : `/view-paper/${editId}`);
        } else {
          resetForm();
          setActiveTab(values.type === 'course' ? 'courses' : 'questions'); // Switch to view content
          toast.success("Content uploaded successfully!");
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
      <div className="w-[95%] xl:w-[85%] mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#2C3E50]">Creator Studio</h1>
            <p className="text-gray-500">Manage your content and share new knowledge</p>
          </div>

          {/* Custom Tabs */}
          <div className="bg-white p-1.5 rounded-xl shadow-sm border border-gray-200 flex items-center gap-1">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'upload' ? 'bg-[#5AB2FF] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Plus size={18} />
              Share Content
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'courses' ? 'bg-[#5AB2FF] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <BookOpen size={18} />
              My Courses
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'questions' ? 'bg-[#5AB2FF] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <FileText size={18} />
              My Papers
            </button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'upload' && (
          <div className="w-full md:w-[70%] lg:w-[60%] bg-white p-8 rounded-[40px] mx-auto border border-gray-100 shadow-2xl shadow-blue-100/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
              <p className="text-xl font-bold text-gray-800">
                {isEditing ? `Edit ${editType === 'course' ? 'Course' : 'Paper'}` : "Upload New Content"}
              </p>
              {isEditing && (
                <button onClick={() => navigate(-1)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X size={20} /></button>
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
                    <label className="block text-sm font-medium text-gray-900 mb-1">Title</label>
                    <Field
                      type="text"
                      name="title"
                      placeholder="Enter title"
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-xl w-full p-3 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                    <ErrorMessage name="title" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                  </div>

                  {/* Type Select */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-900 mb-1">Type</label>
                    <CustomSelect
                      name="type"
                      options={typeOptions}
                      formik={{ values, setFieldValue }}
                      placeholder="Select type"
                      disabled={isEditing}
                    />
                    <ErrorMessage name="type" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                  </div>

                  {/* Category Select */}
                  <div className="col-span-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-900">Category</label>
                      <button type="button" onClick={() => setIsModalOpen(true)} className="text-[#5AB2FF] text-xs font-bold hover:underline">+ Add New</button>
                    </div>
                    <CustomSelect
                      name="category"
                      options={categoryOptions}
                      formik={{ values, setFieldValue }}
                      placeholder="Select category"
                      onDelete={handleDeleteCategory}
                    />
                    <ErrorMessage name="category" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                  </div>

                  {/* Description */}
                  <div className="col-span-4">
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      {values.type === "course" ? "Course Description" : values.type === "ques" ? "Notes" : "Description"}
                    </label>
                    <CustomTextArea
                      name="description"
                      placeholder="Write details..."
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
                      placeholder={values.type === 'ques' ? "Drop images here..." : "Drop video here..."}
                      multiple={values.type === 'ques'}
                      accept={values.type === 'ques' ? "image/*" : "video/*"}
                    />
                  </div>

                  {/* Submit */}
                  <div className="w-full col-span-4 flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={isUploading}
                      className={`w-full py-4 bg-[#5AB2FF] text-white font-bold rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 hover:translate-y-[-2px] active:translate-y-px transition-all flex items-center justify-center gap-2 ${isUploading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isUploading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : (isEditing ? 'Update Content' : 'Publish Content')}
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        )}

        {/* My Courses Tab */}
        {activeTab === 'courses' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {loadingMyCourses ? (
              <div className="text-center py-20"><div className="inline-block w-10 h-10 border-4 border-blue-200 border-t-[#5AB2FF] rounded-full animate-spin"></div></div>
            ) : myCourses?.data?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {myCourses.data.map(course => <Card key={course._id} item={course} />)}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                <BookOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">You haven't uploaded any courses yet.</p>
                <button onClick={() => setActiveTab('upload')} className="mt-4 text-[#5AB2FF] font-bold hover:underline">Upload your first course</button>
              </div>
            )}
          </div>
        )}

        {/* My Papers Tab */}
        {activeTab === 'questions' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {loadingMyPapers ? (
              <div className="text-center py-20"><div className="inline-block w-10 h-10 border-4 border-blue-200 border-t-[#5AB2FF] rounded-full animate-spin"></div></div>
            ) : myPapers?.data?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {myPapers.data.map(paper => <QuestionCard key={paper._id} item={paper} />)}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                <FileText className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">You haven't uploaded any question papers yet.</p>
                <button onClick={() => setActiveTab('upload')} className="mt-4 text-[#5AB2FF] font-bold hover:underline">Upload your first paper</button>
              </div>
            )}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl relative animate-in zoom-in-95 duration-200">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Add Category</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  placeholder="Category Name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  autoFocus
                />
                <button onClick={handleAddCategory} className="w-full bg-[#5AB2FF] text-white py-3 rounded-xl font-bold hover:bg-[#4a90e2] transition-colors">Create Category</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
