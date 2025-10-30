import React, { useState } from 'react'
import Container from '../components/Container'
import Card from '../components/Card'
import QuestionCard from '../components/QuestionCard'
import NoDataFound from '../components/NoDataFound'

const Saved = () => {
  const [showpapers,setshowpapers] =useState()
  const [showcourses,setshowcourses] =useState()
  return (
    <>
      <Container>
        <h1 className="text-center">Your Saved Items</h1>
        <div className='flex items-start justify-between my-6'>
          <div >
            <h2 className=" text-3xl">Saved Courses</h2>
            <p>Access the courses you’ve bookmarked to continue learning anytime.</p>

          </div>
          <span className='btn-primary whitespace-nowrap cursor-pointer'>{showcourses ? 'show more' : 'show less'}</span>
        </div>
        {/* saved carsoule */}
        <div className='grid md:grid-cols-3 place-items-center sm:grid-cols-2 grid-cols-1 lg:grid-cols-4   overflow-hidden gap-5'>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
       {/* <NoDataFound></NoDataFound> */}


        <div className='flex items-start justify-between my-6'>
          <div >
            <h2 className=" text-3xl">Saved Question Papers</h2>
            <p>Practice with your saved question papers and track your progress.</p>

          </div>
          <span className='btn-primary whitespace-nowrap cursor-pointer'>{showpapers ? 'show more' : 'show less'}</span>
        </div>
        <div className='grid md:grid-cols-3 place-items-center sm:grid-cols-2 grid-cols-1 lg:grid-cols-4   overflow-hidden gap-5'>
          <QuestionCard></QuestionCard>
          <QuestionCard></QuestionCard>
          <QuestionCard></QuestionCard>
          <QuestionCard></QuestionCard>
          <QuestionCard></QuestionCard>
          <QuestionCard></QuestionCard>
        </div>

      </Container>
    </>
  )
}

export default Saved