import React from "react";
import { Bookmark, Clock } from 'lucide-react'
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useGetSavedItems, useToggleSavedItem } from "../hooks/useSaved";

const QuestionCard = ({ item }) => {
  const { data: savedData } = useGetSavedItems();
  const { mutate: toggleSave } = useToggleSavedItem();

  const isSaved = savedData?.questions?.some((q) => q._id === item._id) || false;

  const handleToggleSave = () => {
    toggleSave({ id: item._id, data: { type: "question" } });
  };

  if (!item) return null;

  return (
    <>
      <div className="max-w-sm bg-white! border border-gray-200 hover:translate-y-[-5px] transition-all duration-300 rounded-2xl shadow-lg overflow-hidden!">
        <div className=" relative">
          <span
            className={`absolute top-2 right-2 cursor-pointer`}
            title={isSaved ? "Unsave" : "Save"}
            onClick={handleToggleSave}
          >
            <Bookmark
              fill={`${isSaved ? "red" : "#5AB2FF"}`}
              stroke="white"
              size={30}
              strokeWidth={0}
              className="rounded-lg"
            />
          </span>

          <img
            className="rounded-t-lg w-full max-h-40 h-fit object-cover"
            src={
              (item.questionFiles && item.questionFiles[0]?.url) ||
              item.questionFile?.url ||
              item.thumbnail ||
              "/Images/istockphoto-1168608995-612x612.jpg"
            }
            alt={item.title}
          />
        </div>
        <div className="p-5 py-3 space-y-2 flex  flex-col">
          <span className="bg-gray-100 py-1 px-2 rounded-lg text-xs w-fit ">
            {item.category}
          </span>
          <p className=" text-xl font-semibold text-start  text-gray-700 mt-2 ">
            {item.title}
          </p>
          <div>
            <Rating rating={item.rating || 0} reviews={item.reviews || 0}></Rating>
          </div>
          <div className="flex items-center justify-between border-t-2 border-gray-300 pt-3 ">
            <p className="flex gap-1 items-center text-gray-600">
              <Clock size={20} />
              {item.createdAt
                ? new Date(item.createdAt).toLocaleDateString()
                : "Just now"}
            </p>
            <Link
              to={`/question-paper/${item._id}`}
              className="btn-primary text-sm"
            >
              Try Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;