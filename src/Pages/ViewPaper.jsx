import React from 'react'
import Container from '../components/Container'
import Rating from '../components/Rating'
import { useParams, useNavigate } from 'react-router-dom'
import { Clock, Edit2, Trash2, FileText, ZoomIn } from 'lucide-react'
import { useGetQuestionPaperById, useDeleteQuestionPaper } from '../hooks/useQuestion'
import { useUserDetails } from '../hooks/useAuth'
import DeleteConfirmModal from '../components/elements/DeleteConfirmModal'
import ImageFullViewModal from '../components/elements/ImageFullViewModal'
import { useState } from 'react'

const ViewPaper = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const { data: paperData, isLoading, error } = useGetQuestionPaperById(id);
    const { data: userData } = useUserDetails();
    const deletePaperMutation = useDeleteQuestionPaper();

    const paper = paperData?.data;
    const currentUser = userData?.user;

    const isCreator = currentUser && paper && (currentUser._id === paper.created_by || currentUser.role === 'admin');

    const handleDelete = async () => {
        await deletePaperMutation.mutateAsync(id);
        navigate("/home");
    };

    const handleEdit = () => {
        navigate(`/upload-resources?edit=${id}&type=ques`);
    };

    if (isLoading) return <Container><div className="flex items-center justify-center min-h-[400px]">Loading...</div></Container>;
    if (error) return <Container><div className="text-red-500 text-center py-20">Error loading paper</div></Container>;
    if (!paper) return <Container><div className="text-center py-20 text-gray-500 text-xl font-bold">Paper not found</div></Container>;

    return (
        <Container>
            <div className="flex flex-col lg:flex-row gap-10 py-10">
                {/* Left Side: Info */}
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="bg-blue-400 text-white py-1.5 px-4 rounded-full text-sm font-bold shadow-sm uppercase tracking-wider">
                            {paper.category}
                        </span>

                        {isCreator && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleEdit}
                                    className="p-2 bg-white text-gray-600 rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-colors"
                                    title="Edit Paper"
                                >
                                    <Edit2 size={20} />
                                </button>
                                <button
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    className="p-2 bg-white text-gray-600 rounded-xl hover:bg-red-100 hover:text-red-600 transition-colors"
                                    title="Delete Paper"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        )}
                    </div>

                    <DeleteConfirmModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onConfirm={handleDelete}
                        title="Delete Question Paper"
                        message={`Are you sure you want to delete "${paper.title}"? This action cannot be undone.`}
                    />

                    <ImageFullViewModal
                        isOpen={!!selectedImage}
                        onClose={() => setSelectedImage(null)}
                        imageUrl={selectedImage}
                        title={paper.title}
                    />

                    <h1 className="text-4xl md:text-5xl font-black text-[#2C3E50] leading-tight">
                        {paper.title}
                    </h1>

                    <div className="flex items-center gap-4">
                        <Rating rating={paper.rating || 0} reviews={paper.reviews || 0} />
                        <div className="h-4 w-[1px] bg-gray-300"></div>
                        <div className="flex items-center text-gray-500 font-medium">
                            <Clock size={18} className="mr-1" />
                            {paper.createdAt ? new Date(paper.createdAt).toLocaleDateString() : 'N/A'}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-[#2C3E50]">Notes</h2>
                        <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                            {paper.notes || paper.description || "No description available."}
                        </p>
                    </div>
                </div>

                {/* Right Side: Paper Content */}
                <div className="lg:w-[45%]">
                    <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-4 custom-scrollbar">
                        {paper.questionFiles && paper.questionFiles.length > 0 ? (
                            paper.questionFiles.map((file, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedImage(file.url)}
                                    className="w-full rounded-[30px] overflow-hidden border-8 border-white bg-white group cursor-zoom-in active:scale-95 transition-all duration-300"
                                >
                                    <img
                                        src={file.url}
                                        alt={`${paper.title} - Page ${index + 1}`}
                                        className='w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500'
                                    />
                                    <div className="p-4 bg-gray-50 text-center text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                                        Page {index + 1}
                                        <ZoomIn size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div
                                onClick={() => setSelectedImage(paper.questionFile?.url || paper.thumbnail)}
                                className="w-full rounded-[30px] overflow-hidden shadow-md  border-8 border-white bg-white cursor-zoom-in active:scale-95 transition-all duration-300"
                            >
                                <img
                                    src={paper.questionFile?.url || paper.thumbnail || 'https://i.pinimg.com/236x/5d/4c/e1/5d4ce19972fe38e8abb1449585fa8f52.jpg'}
                                    alt={paper.title}
                                    className='w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-500'
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ViewPaper