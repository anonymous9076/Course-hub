import React from "react";
import { Bookmark, Clock, User } from 'lucide-react'
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useGetSavedItems, useToggleSavedItem } from "../hooks/useSaved";

const Card = ({ item }) => {
  const { data: savedData } = useGetSavedItems();
  const { mutate: toggleSave } = useToggleSavedItem();

  const isSaved = savedData?.courses?.some((c) => c._id === item._id) || false;

  const handleToggleSave = () => {
    toggleSave({ id: item._id, data: { type: "course" } });
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!item) return null; // Safety check

  return (
    <>
      <div className="max-w-sm w-full bg-white! hover:translate-y-[-5px] transition-all duration-300 border border-gray-200 rounded-2xl shadow-lg overflow-hidden!">
        <div className=" relative">
          <span className={`absolute top-2 right-2 cursor-pointer`} title={isSaved ? "Unsave" : "Save"} onClick={handleToggleSave}>
            <Bookmark fill={`${isSaved ? 'red' : '#5AB2FF'}`} stroke="white" size={30} strokeWidth={0} className="rounded-lg" />
          </span>

          <img
            className="rounded-t-lg w-full h-48 object-cover"
            src={item.thumbnail ? `http://localhost:8080/diginotes/${item.thumbnail}` : "/Images/3785210.jpg"}
            alt={item.title}
          />
        </div>
        <div className="p-5 py-3 space-y-2 flex  flex-col">
          <span className="bg-gray-100 py-1 px-2 rounded-lg text-xs w-fit ">{item.category}</span>
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
              to={`/course/${item._id}`}
              className="btn-primary text-sm"
            >
              Enroll Now

            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
