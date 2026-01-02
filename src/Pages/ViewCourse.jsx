import React from 'react'
import Container from '../components/Container'
import Rating from '../components/Rating'
import { useParams, useNavigate } from 'react-router-dom'
import { Clock, Edit2, Trash2, PlayCircle } from 'lucide-react'
import { useGetCourseById, useDeleteCourse } from '../hooks/useCourse'
import { useUserDetails } from '../hooks/useAuth'
import DeleteConfirmModal from '../components/elements/DeleteConfirmModal'
import { useState } from 'react'

const ViewCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { data: courseData, isLoading, error } = useGetCourseById(id);
    const { data: userData } = useUserDetails();
    const deleteCourseMutation = useDeleteCourse();

    const course = courseData?.data;
    const currentUser = userData?.user;

    const isCreator = currentUser && course && (currentUser._id === course.created_by || currentUser.role === 'admin');

    const handleDelete = async () => {
        await deleteCourseMutation.mutateAsync(id);
        navigate("/home");
    };

    const handleEdit = () => {
        navigate(`/upload-resources?edit=${id}&type=course`);
    };

    if (isLoading) return <Container><div className="flex items-center justify-center min-h-[400px]">Loading...</div></Container>;
    if (error) return <Container><div className="text-red-500 text-center py-20">Error loading course</div></Container>;
    if (!course) return <Container><div className="text-center py-20 text-gray-500 text-xl font-bold">Course not found</div></Container>;

    return (
        <Container>
            <div className="flex flex-col lg:flex-row gap-10 py-10">
                {/* Left Side: Content info */}
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="bg-blue-400 text-white py-1.5 px-4 rounded-full text-sm font-bold shadow-sm uppercase tracking-wider">
                            {course.category}
                        </span>

                        {isCreator && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleEdit}
                                    className="p-2 bg-white text-gray-600 rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-colors"
                                    title="Edit Course"
                                >
                                    <Edit2 size={20} />
                                </button>
                                <button
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    className="p-2 bg-white text-gray-600 rounded-xl hover:bg-red-100 hover:text-red-600 transition-colors"
                                    title="Delete Course"
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
                        title="Delete Course"
                        message={`Are you sure you want to delete "${course.title}"? This action cannot be undone.`}
                    />

                    <h1 className="text-4xl md:text-5xl font-black text-[#2C3E50] leading-tight">
                        {course.title}
                    </h1>

                    <div className="flex items-center gap-4">
                        <Rating rating={course.rating || 0} reviews={course.reviews || 0} />
                        <div className="h-4 w-[1px] bg-gray-300"></div>
                        <div className="flex items-center text-gray-500 font-medium">
                            <Clock size={18} className="mr-1" />
                             {course.createdAt
                ? new Date(course.createdAt).toLocaleDateString()
                : "Just now"}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-[#2C3E50]">Course Description</h2>
                        <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                            {course.description || "No description available."}
                        </p>
                    </div>
                </div>

                {/* Right Side: Video Player */}
                <div className="lg:w-[45%]">
                    <div className="sticky top-24">
                        <div className="rounded-[40px] overflow-hidden shadow-2xl shadow-blue-100 border-8 border-white bg-black aspect-video relative group">
                            <video
                                src={course.courseFile?.url}
                                controls
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ViewCourse