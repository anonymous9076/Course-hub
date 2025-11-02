import apiClient from "./api-client"

export const CreateQuestionPaper = async(data)=>{
    const res = await apiClient.post('/upload-question-papers',data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    return res;
}
export const GetQuestionPapers = async (params) => {
  // params = { title, category, sort, page, limit }
  const res = await apiClient.get('/question-papers', { params });
  return res.data;
};
export const UpdateQuestionPaper = async(id,data)=>{
    const res = await apiClient.post(`/upload-question-papers/${id}`,data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    return res;
}
export const DeleteQuestionPaper = async(id)=>{
    const res = await apiClient.delete(`/delete-question-papers/${id}`)
    return res;
}
export const LikeQuestionPaper = async(id)=>{
    const res = await apiClient.put(`/like-question-papers/${id}`)
    return res;
}