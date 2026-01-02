import React, { useState } from "react";
import Container from "../components/Container";
import Carousel from "../components/Carousel";
import Card from "../components/Card";
import Paginaiton from "../components/Paginaiton";
import Searchbar from "../components/elements/Searchbar";
import { CalendarArrowDown, CalendarArrowUp } from "lucide-react";
import QuestionCard from "../components/QuestionCard";
import { useGetQuestionPapers } from "../hooks/useQuestion";
import { useGetCategories } from "../hooks/useCategory";

import Skeleton from "../components/elements/Skeleton";

const Paper = () => {
  const carouselImages = ["/Images/3784896.jpg", "/Images/3785210.jpg"];
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState();
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const { data: categoryData } = useGetCategories();
  const { data: papersData, isLoading, error } = useGetQuestionPapers({ page, limit: 12, sort, category, keyword: search });
  const papers = papersData?.data || [];
  const totalPages = papersData?.totalPages || 1;

  if (error) return <div>Error loading papers</div>;

  return (
    <>
      <Container>
        <div className=" text-default   h-fit w-full">
          <div className=" rounded-4xl overflow-hidden w-full h-fit ">
            <Carousel images={carouselImages}></Carousel>
          </div>
          <div className="py-20 space-y-2 flex flex-col items-center">
            <h1 className="text-center">Explore Our Latest Question Papers</h1>
            <p className="text-center max-w-[700px]">
              “Access a wide range of carefully curated question papers.
              Practice, revise, and excel in your exams with confidence.”
            </p>

          </div>
          {/* filter part */}
          <div className="flex items-center pb-10 gap-3 ">
            <Searchbar
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search question papers..."
            />
            <div className="w-full  max-w-md rounded-full pr-2 bg-white">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 outline-none! text-gray-400 w-full py-2.5 rounded-full bg-white p-4"
              >
                <option value=''>Select Category</option>
                {categoryData?.categories?.map((c) => (
                  <option key={c._id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              {sort ? <CalendarArrowDown className="text-primary" onClick={() => setSort(false)} /> :
                <CalendarArrowUp className="text-primary" onClick={() => setSort(true)} />}
            </div>
          </div>
          <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {isLoading ? (
              Array(8).fill(0).map((_, i) => <Skeleton key={i} />)
            ) : papers.length > 0 ? (
              papers.map((paper) => (
                <QuestionCard key={paper._id} item={paper} />
              ))
            ) : (
              <p>No papers found.</p>
            )}
          </div>
          <div className="w-full flex items-center justify-center py-10">
            <Paginaiton
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        </div>
      </Container >
    </>
  );
};

export default Paper;
