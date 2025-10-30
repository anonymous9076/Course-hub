import React from "react";
import BoxCard from "./BoxCard";

const TopCategories = () => {
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
          <BoxCard ></BoxCard>
          <BoxCard></BoxCard>
          <BoxCard></BoxCard>
          <BoxCard></BoxCard>
          <BoxCard></BoxCard>
        </div>
      </div>
    </>
  );
};

export default TopCategories;
