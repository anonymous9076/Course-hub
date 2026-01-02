import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetSavedData, ToggleSaved } from "../apis/saved-api";
import { toast } from "react-toastify";


export const useGetSavedItems = () => {
  return useQuery({
    queryKey: ["savedItems"],
    queryFn: GetSavedData,
    select: (data) => data.data,
    onError: (error) =>
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        " Failed to fetch saved items"
      ),
  });
};


export const useToggleSavedItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => ToggleSaved(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["savedItems"] });

      const previousSavedItems = queryClient.getQueryData(["savedItems"]);

      queryClient.setQueryData(["savedItems"], (old) => {
        if (!old) return old;

        const newRes = { ...old };
        if (!newRes.data) return old;

        const targetKey = data.type === "question" ? "questions" : "courses";
        const list = newRes.data[targetKey] || [];

        const exists = list.some((item) => item._id === id);

        let newList;
        if (exists) {
          newList = list.filter((item) => item._id !== id);
        } else {
          newList = [...list, { _id: id }];
        }

        newRes.data = {
          ...newRes.data,
          [targetKey]: newList,
        };

        return newRes;
      });

      return { previousSavedItems };
    },

    onError: (error, _newItem, context) => {
      if (context?.previousSavedItems) {
        queryClient.setQueryData(["savedItems"], context.previousSavedItems);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["savedItems"] });
    },
  });
};
