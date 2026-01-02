import React from "react";
import BoxCard from "./BoxCard";
import { useGetCategories } from "../hooks/useCategory";

const TopCategories = () => {
   const { data: categoryData } = useGetCategories();
   console.log(categoryData?.categories);
  return (
    <>
      <div className="py-10 h-fit">
        <div className=" space-y-2">
          <h1 className="text-center  ">Explore Courses by Category</h1>
          <p className="text-center ">
            {" "}
            Find the right learning path for your academic and professional
            growth.
          </p>
        </div>
        <div className="grid pt-15 pb-10 lg:grid-cols-4 w-full gap-3 place-items-center md:grid-cols-3 grid-cols-2 xl:grid-cols-5">
          {categoryData?.categories?.map((category) => (
            <BoxCard key={category._id} item={category} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TopCategories;
