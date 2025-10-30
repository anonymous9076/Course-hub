import React, { useState } from "react";
import {Bookmark, Clock} from 'lucide-react'
import { Link } from "react-router-dom";
import Rating from "./Rating";
const QuestionCard = () => {
    const [saved,setSaved] =useState(false)
  
  return (
     <>
      <div className="max-w-sm !bg-white border border-gray-200 rounded-2xl shadow-lg !overflow-hidden">
        <div className=" relative">
          <span className={`absolute top-2 right-2 `} title="save" onClick={()=>setSaved(prev=>!prev)}>
            <Bookmark fill={`${saved? 'red':'#5AB2FF'}`} stroke="white" size={30} strokeWidth={0} className="rounded-lg"/>
          </span>

          <img
            className="rounded-t-lg"
            src="Images\istockphoto-1168608995-612x612.jpg"
            alt=""
            />
            </div>
        <div className="p-5 py-3 space-y-2 flex  flex-col">
          <span className="bg-gray-100 py-1 px-2 rounded-lg text-xs w-fit ">Web Develpement</span>
            <p className=" text-xl font-semibold text-start  text-gray-700 mt-2 ">
              React js MasterClass for Beginners
            </p>
          <div>
            <Rating rating={3.5} reviews={45}></Rating>
          </div>
          <div className="flex items-center justify-between border-t-2 border-gray-300 pt-3 ">
          <p className="flex gap-1 items-center text-gray-600"><Clock size={20} />1minute ago</p>
          <Link
            to='/'
            className="btn-primary text-sm"
            >
            Try Now
           
          </Link>
            </div>
        </div>
      </div>
    </>
  )
}

export default QuestionCard