import React, { useState } from 'react'
import Container from '../components/Container'
import Card from '../components/Card'
import QuestionCard from '../components/QuestionCard'
import NoDataFound from '../components/NoDataFound'
import { useGetSavedItems } from '../hooks/useSaved'
import Skeleton from '../components/elements/Skeleton'

const Saved = () => {
  const [showpapers, setshowpapers] = useState(false)
  const [showcourses, setshowcourses] = useState(false)

  const { data: savedData, isLoading, error } = useGetSavedItems();

  // Assuming API structure: { savedCourses: [], savedPapers: [] } or similar
  // Adjust access based on actual API response, but for now assuming data contains these arrays
  const courses = savedData?.courses || [];
  const questionPapers = savedData?.questions || []; // Adjust key if needed

  if (error) return <div>Error loading saved items</div>;

  return (
    <>
      <Container>
        <h1 className="text-center">Your Saved Items</h1>

        {/* Global Empty State */}
        {!isLoading && courses.length === 0 && questionPapers.length === 0 && (
          <div className="mt-10">
            <NoDataFound />
          </div>
        )}

        {/* Saved Courses Section */}
        {(isLoading || courses.length > 0) && (
          <>
            <div className='flex items-start justify-between my-6'>
              <div >
                <h2 className=" text-3xl">Saved Courses</h2>
                <p>Access the courses you’ve bookmarked to continue learning anytime.</p>

              </div>
              {showcourses && <span className='btn-primary whitespace-nowrap cursor-pointer' onClick={() => setshowcourses(!showcourses)}>{showcourses ? 'show less' : 'show more'}</span>}
            </div>
            <div className='grid md:grid-cols-3 place-items-center sm:grid-cols-2 grid-cols-1 lg:grid-cols-4   overflow-hidden gap-5'>
              {isLoading ? (
                Array(4).fill(0).map((_, i) => <Skeleton key={i} />)
              ) : (
                courses.map(course => <Card key={course._id} item={course} />)
              )}
            </div>
          </>
        )}


        {/* Saved Question Papers Section */}
        {(isLoading || questionPapers.length > 0) && (
          <>
            <div className='flex items-start justify-between my-6'>
              <div >
                <h2 className=" text-3xl">Saved Question Papers</h2>
                <p>Practice with your saved question papers and track your progress.</p>

              </div>
              {showpapers && <span className='btn-primary whitespace-nowrap cursor-pointer' onClick={() => setshowpapers(!showpapers)}>{showpapers ? 'show less' : 'show more'}</span>}
            </div>
            <div className='grid md:grid-cols-3 place-items-center sm:grid-cols-2 grid-cols-1 lg:grid-cols-4   overflow-hidden gap-5'>
              {isLoading ? (
                Array(4).fill(0).map((_, i) => <Skeleton key={i} />)
              ) : (
                questionPapers.map(paper => <QuestionCard key={paper._id} item={paper} />)
              )}
            </div>
          </>
        )}

      </Container>
    </>
  )
}

export default Saved