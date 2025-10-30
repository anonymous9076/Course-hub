// Carousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function Carousel({
  images = [],
  showPagination,
  children,
  slidesPerView = 1,
  loop = true,
  autoplay = true,
}) {
  const slides = children
    ? React.Children.toArray(children)
    : images.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-center h-80 w-full"
        >
          {typeof item === "string" ? (
            <img src={item} alt={`slide-${index}`} />
          ) : (
            item
          )}
        </div>
      ));

  return (
 <Swiper
  spaceBetween={20}
  loop={loop}
  pagination={showPagination ? { clickable: true } : false}
  navigation={true}
  modules={[Navigation, Autoplay, showPagination ? Pagination : null].filter(Boolean)}
  autoplay={autoplay ? { delay: 4000, disableOnInteraction: true } : false}
  slidesPerView={slidesPerView} // default for all
  breakpoints={{
    320: { slidesPerView: Math.min(slidesPerView, 1) }, // mobile: 1
    640: { slidesPerView: Math.min(slidesPerView, 2) }, // small tablets: max 2
    1024: { slidesPerView: Math.min(slidesPerView, 3) }, // tablets/laptop: max 3
    1280: { slidesPerView: slidesPerView }, // large screens: use prop
  }}
  className="mySwiper"

    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="py-3 bg-red-400">{slide} </SwiperSlide>
      ))}
    </Swiper>
  );
}
