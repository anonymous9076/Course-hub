import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreateQuestionPaper,
  GetQuestionPapers,
  UpdateQuestionPaper,
  DeleteQuestionPaper,
  LikeQuestionPaper,
} from "../apis/question-api";
import { toast } from "react-toastify";

// ✅ Create Question Paper
export const useCreateQuestionPaper = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateQuestionPaper,
    onSuccess: () => {
      toast.success("📄 Question paper created successfully");
      queryClient.invalidateQueries(["questionPapers"]);
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || error.message || "❌ Failed to create question paper"),
  });
};


// ✅ Get All Question Papers (supports filters, sort, pagination)
export const useGetQuestionPapers = (filters) => {
  return useQuery({
    queryKey: ["questionPapers", filters],
    queryFn: () => GetQuestionPapers(filters),
    onError: (error) =>
      toast.error(error?.response?.data?.message || error.message || "❌ Failed to fetch question papers"),
  });
};


// ✅ Update Question Paper
export const useUpdateQuestionPaper = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => UpdateQuestionPaper(id, data),
    onSuccess: () => {
      toast.success("📝 Question paper updated successfully");
      queryClient.invalidateQueries(["questionPapers"]);
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || error.message || "❌ Failed to update question paper"),
  });
};


// ✅ Delete Question Paper
export const useDeleteQuestionPaper = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteQuestionPaper,
    onSuccess: () => {
      toast.success("🗑️ Question paper deleted successfully");
      queryClient.invalidateQueries(["questionPapers"]);
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || error.message || "❌ Failed to delete question paper"),
  });
};


// ✅ Like Question Paper
export const useLikeQuestionPaper = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: LikeQuestionPaper,
    onSuccess: () => {
      toast.success("❤️ Question paper liked");
      queryClient.invalidateQueries(["questionPapers"]);
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || error.message || "❌ Failed to like question paper"),
  });
};
