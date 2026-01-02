import React from 'react'
const Skeleton = () => {
    return (
        <div role="status" className="max-w-sm w-full bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden animate-pulse">
            {/* Image Placeholder */}
            <div className="h-48 bg-gray-200 w-full"></div>

            <div className="p-5 py-3 space-y-3 flex flex-col">
                {/* Category Placeholder */}
                <div className="h-6 bg-gray-200 rounded-lg w-24"></div>

                {/* Title Placeholder */}
                <div className="h-6 bg-gray-200 rounded w-3/4 mt-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>

                {/* Rating Placeholder */}
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>

                {/* Footer Placeholder (Clock + Button) */}
                <div className="flex items-center justify-between border-t-2 border-gray-100 pt-3 mt-2">
                    <div className="h-5 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default Skeleton