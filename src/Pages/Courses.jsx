import React, { useState } from "react";
import Container from "../components/Container";
import Carousel from "../components/Carousel";
import Card from "../components/Card";
import Paginaiton from "../components/Paginaiton";
import Searchbar from "../components/elements/Searchbar";
import { CalendarArrowDown, CalendarArrowUp } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCourses } from "../hooks/useCourse";
import { useGetCategories } from "../hooks/useCategory";

import Skeleton from "../components/elements/Skeleton";

const Courses = () => {
  const { category: urlCategory } = useParams();
  const navigate = useNavigate();
  const carouselImages = ["/Images/3784896.jpg", "/Images/3785210.jpg"];
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState();
  const [category, setCategory] = useState(urlCategory || "");
  const [search, setSearch] = useState("");
  const { data: categoryData } = useGetCategories();

  // Sync state with URL parameter
  React.useEffect(() => {
    if (urlCategory) {
      setCategory(urlCategory);
    }
  }, [urlCategory]);

  const { data: coursesData, isLoading, error } = useGetCourses({ page, limit: 12, sort, category, keyword: search });
  console.log(coursesData, 'course');
  const courses = coursesData?.data || [];
  const totalPages = coursesData?.totalPages || 1;

  if (error) return <div>Error loading courses</div>;

  return (
    <>
      <Container>
        <div className=" text-default   h-fit w-full">
          <div className=" rounded-4xl overflow-hidden w-full h-fit ">
            <Carousel images={carouselImages}></Carousel>
          </div>
          <div className="py-20 space-y-2">
            <h1 className="text-center ">Explore All The Courses </h1>
            <p className="text-center ">
              “Gain in-depth knowledge from curated, high-quality courses.
              Start learning today and build
              <br></br>  a foundation for lifelong success.”
            </p>
          </div>
          {/* filter part */}
          <div className="flex items-center pb-10 gap-3 ">
            <Searchbar
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
            />
            <div className="w-full  max-w-md rounded-full pr-2 bg-white">
              <select
                value={category}
                onChange={(e) => {
                  const val = e.target.value;
                  setCategory(val);
                  if (val) {
                    navigate(`/courses/${val}`);
                  } else {
                    navigate('/courses');
                  }
                }}
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
            ) : courses.length > 0 ? (
              courses.map((course) => (
                <Card key={course._id} item={course} />
              ))
            ) : (
              <p>No courses found.</p>
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
      </Container>
    </>
  );
};

export default Courses;
