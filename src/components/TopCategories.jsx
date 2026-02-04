import React from "react";
import BoxCard from "./BoxCard";
import { useGetCategories } from "../hooks/useCategory";
import { motion } from "framer-motion";

const TopCategories = () => {
  const { data: categoryData } = useGetCategories();

  return (
    <div className="py-16 w-full max-w-7xl mx-auto px-4">
      <div className="text-center space-y-3 mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-black text-gray-900"
        >
          Explore <span className="text-blue-600">Categories</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base"
        >
          Find the right learning path for your academic and professional growth.
        </motion.p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {categoryData?.categories?.map((category, index) => (
          <BoxCard key={category._id} item={category} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
