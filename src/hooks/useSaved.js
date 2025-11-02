import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetSavedData, ToggleSaved } from "../apis/saved-api";
import { toast } from "react-toastify";


// ✅ Get All Saved Items
export const useGetSavedItems = () => {
  return useQuery({
    queryKey: ["savedItems"],
    queryFn: GetSavedData,
    select: (res) => res.data, // extract data for easier usage
    onError: (error) =>
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "❌ Failed to fetch saved items"
      ),
  });
};


// ✅ Toggle Save / Unsave Item
export const useToggleSavedItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => ToggleSaved(id, data),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "✅ Item saved/unsaved successfully");
      // Refresh saved items list automatically
      queryClient.invalidateQueries(["savedItems"]);
    },
    onError: (error) =>
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "❌ Failed to toggle saved item"
      ),
  });
};
