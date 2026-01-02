import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../apis/api-client";
import { toast } from "react-toastify";



// Fetch all categories
const fetchCategories = async () => {
    const { data } = await apiClient.get('/categories');
    return data;
};

// Add category
const addCategory = async (categoryData) => {
    const { data } = await apiClient.post('/category', categoryData);
    return data;
};

// Delete category
const deleteCategory = async (id) => {
    const { data } = await apiClient.delete(`/category/${id}`);
    return data;
};

export const useGetCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });
};

export const useAddCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addCategory,
        onSuccess: (res) => {
            toast.success("Category added successfully");
            queryClient.invalidateQueries(["categories"]);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to add category");
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: (res) => {
            toast.success("Category deleted successfully");
            queryClient.invalidateQueries(["categories"]);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to delete category");
        },
    });
};
