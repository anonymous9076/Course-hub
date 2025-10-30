import { Star, StarHalf } from "lucide-react";
import React from "react";

const Rating = ({ rating = 0, reviews = 0 }) => {
  const getStarColor = () => {
    if (rating < 3) return "red";
    if (rating < 4) return "orange";
    return "green";
  };

  return (
    <div className="flex items-center ">
       <div className="flex items-center">
  {Array.from({ length: Math.floor(rating) }, (_, index) => (
    <Star key={index} fill={getStarColor()} size={20} stroke="0" />
  ))}

  {rating % Math.floor(rating) !== 0 && (
    <StarHalf fill={getStarColor()} size={20} stroke="0" />
  )}
</div>

      
      {reviews > 0 && (
        <>
          <p
            href="#"
            className="text-sm font-medium text-gray-600 "
          >
            {`(${reviews})`} 
          </p>
        </>
      )}
    </div>
  );
};

export default Rating;
