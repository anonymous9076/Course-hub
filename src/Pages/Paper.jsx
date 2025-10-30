import React, { useState } from "react";
import Container from "../components/Container";
import Carousel from "../components/Carousel";
import Card from "../components/Card";
import Paginaiton from "../components/Paginaiton";
import Searchbar from "../components/elements/Searchbar";
import { CalendarArrowDown, CalendarArrowUp } from "lucide-react";
import QuestionCard from "../components/QuestionCard";

const Paper = () => {
  const carouselImages = ["/Images/3784896.jpg", "/Images/3785210.jpg"];
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState()
  console.log(sort)
  return (
    <>
      <Container>
        <div className=" text-default   h-fit w-full">
          <div className=" rounded-4xl overflow-hidden w-full h-fit ">
            <Carousel images={carouselImages}></Carousel>
          </div>
          <div className="py-20 space-y-2">
            <h1 className="text-center">Explore Our Latest Question Papers</h1>
            <p className="text-center">
              “Access a wide range of carefully curated question papers.
              <br />Practice, revise, and excel in your exams with confidence.”
            </p>
         
        </div>
        {/* filter part */}
        <div className="flex items-center pb-10 gap-3 ">
          <Searchbar></Searchbar>
          <div className="w-full  max-w-md rounded-full pr-2 bg-gray-100">
            <select className="px-4 !outline-none text-gray-400 w-full py-[10px] rounded-full bg-gray-100 p-4">
              <option value=''>Select Category</option>
              <option value=''>Select Category</option>
              <option value=''>Select Category</option>
              <option value=''>Select Category</option>
              <option value=''>Select Category</option>
              <option value=''>Select Category</option>
            </select>
          </div>
          <div>
            {sort ? <CalendarArrowDown className="text-primary" onClick={() => setSort(false)} /> :
              <CalendarArrowUp className="text-primary" onClick={() => setSort(true)} />}
          </div>
        </div>
        <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          <QuestionCard></QuestionCard>
          <QuestionCard></QuestionCard>
          <QuestionCard></QuestionCard>
          <QuestionCard></QuestionCard>
          <QuestionCard></QuestionCard>
        </div>
        <div className="w-full flex items-center justify-center py-10">
          <Paginaiton
            currentPage={page}
            totalPages={5}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </div>
    </Container >
    </>
  );
};

export default Paper;
