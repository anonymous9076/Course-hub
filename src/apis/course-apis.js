import apiClient from "./api-client"

export const CreateCourse = async (data) => {
  const res = await apiClient.post('/upload-course', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data;
}
export const GetCourses = async (params) => {
  // params = { title, category, sort, page, limit }
  const res = await apiClient.get('/get-courses', { params });
  return res.data;
};
export const UpdateCourse = async (id, data) => {
  const res = await apiClient.post(`/upload-course/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data;
}
export const DeleteCourse = async (id) => {
  const res = await apiClient.delete(`/delete-course/${id}`)
  return res.data;
}
export const LikeCourse = async (id) => {
  const res = await apiClient.put(`/like-course/${id}`)
  return res.data;
}
export const GetCourseById = async (id) => {
  const res = await apiClient.get(`/get-courses/${id}`);
  return res.data;
};