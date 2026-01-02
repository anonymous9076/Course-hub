import { useQuery, useMutation } from "@tanstack/react-query";
import {
  CreateCourse,
  GetCourses,
  UpdateCourse,
  DeleteCourse,
  LikeCourse,
  GetCourseById,
} from "../apis/course-apis";
import { toast } from "react-toastify";


//  Create Course
export const useCreateCourse = () => {
  return useMutation({
    mutationFn: CreateCourse,
    onSuccess: () => toast.success("🎉 Course created successfully"),
    onError: (error) =>
      toast.error(error?.response?.data?.message || error.message || " Failed to create course"),
  });
};


//  Get Single Course
export const useGetCourseById = (id) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => GetCourseById(id),
    enabled: !!id,
    onError: (error) =>
      toast.error(error?.response?.data?.message || error.message || " Failed to fetch course"),
  });
};


//  Get All Courses (supports filters, sort, pagination)
export const useGetCourses = (filters) => {
  return useQuery({
    queryKey: ["courses", filters],
    queryFn: () => GetCourses(filters),
    onError: (error) =>
      toast.error(error?.response?.data?.message || error.message || " Failed to fetch courses"),
  });
};


//  Update Course
export const useUpdateCourse = () => {
  return useMutation({
    mutationFn: ({ id, data }) => UpdateCourse(id, data),
    onSuccess: () => toast.success("📝 Course updated successfully"),
    onError: (error) =>
      toast.error(error?.response?.data?.message || error.message || " Failed to update course"),
  });
};


//  Delete Course
export const useDeleteCourse = () => {
  return useMutation({
    mutationFn: DeleteCourse,
    onSuccess: () => toast.success("🗑️ Course deleted successfully"),
    onError: (error) =>
      toast.error(error?.response?.data?.message || error.message || " Failed to delete course"),
  });
};


//  Like / Unlike Course
export const useLikeCourse = () => {
  return useMutation({
    mutationFn: LikeCourse,
    onSuccess: () => toast.success("❤️ Course liked"),
    onError: (error) =>
      toast.error(error?.response?.data?.message || error.message || " Failed to like course"),
  });
};
