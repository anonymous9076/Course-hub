import React from "react";
import Container from "../components/Container";
import Carousel from "../components/Carousel";
import Card from "../components/Card";
import QuestionCard from "../components/QuestionCard";
import { useGetCourses } from "../hooks/useCourse";
import { useGetQuestionPapers } from "../hooks/useQuestion";
import Skeleton from "../components/elements/Skeleton";
import { useGetCategories } from "../hooks/useCategory";
import TopCategories from "../components/TopCategories";

const Home = () => {
  const carouselImages = ["/Images/3784896.jpg", "/Images/3785210.jpg"];
  const { data: coursesData } = useGetCourses({ limit: 8 });
  const { data: papersData } = useGetQuestionPapers({ limit: 8 });
  const { data: categoryData } = useGetCategories();
  const courses = coursesData?.data || [];
  const papers = papersData?.data || [];
  return (
    <>
      <Container>
        <div className=" text-default  h-fit w-full">
          <div className=" rounded-4xl overflow-hidden w-full h-fit ">
            <Carousel slidesPerView={1} images={carouselImages}></Carousel>
          </div>
          <TopCategories></TopCategories>
          <div>
            <p className="text-4xl ">Explore Our Popular Courses </p>
            <p className="">
              Discover in-demand courses chosen by hundreds of students to boost
              their academic and career journey.{" "}
            </p>
            <div className="py-7 ">
              <Carousel slidesPerView={4} showPagination={false} autoplay={false} >
                {coursesData ? (
                  courses.length > 0 ? (
                    courses.map((course) => (
                      <Card key={course._id} item={course} />
                    ))
                  ) : (
                    <p>No courses found.</p>
                  )
                ) : (
                  /* Skeleton Loader */
                  Array(4).fill(0).map((_, i) => <Skeleton key={i} />)
                )}
              </Carousel>
            </div>
          </div>
          <div>
            <p className="text-4xl ">Popular Question Papers </p>
            <p className="">
              Access frequently searched and high-rated question papers to help
              you prepare smarter.{" "}
            </p>
            <div className="py-7">
              <Carousel slidesPerView={4} showPagination={false} autoplay={false} >
                {papersData ? (
                  papers.length > 0 ? (
                    papers.map((paper) => (
                      <QuestionCard key={paper._id} item={paper} />
                    ))
                  ) : (
                    <p>No papers found.</p>
                  )
                ) : (
                  /* Skeleton Loader */
                  Array(4).fill(0).map((_, i) => <Skeleton key={i} />)
                )}
              </Carousel>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
