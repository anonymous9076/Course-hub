import React from "react";
import Container from "../components/Container";
import Carousel from "../components/Carousel";
import TopCategories from "../components/TopCategories";
import Card from "../components/Card";
import QuestionCard from "../components/QuestionCard";

const Home = () => {
  const carouselImages = ["/Images/3784896.jpg", "/Images/3785210.jpg"];
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
              <Carousel slidesPerView={4}  showPagination={false} autoplay={false} >
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
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
                <QuestionCard />
                <QuestionCard />
                <QuestionCard />
                <QuestionCard />
                <QuestionCard />
                <QuestionCard />
                <QuestionCard />
              </Carousel>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
