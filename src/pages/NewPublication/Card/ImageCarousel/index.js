import React, { useState, useEffect, useRef } from "react";
import profileImageUrlPlaceHolder from "../../imgs/profileImageUrlPlaceHolder.jpg";

export default function ImageCarousel({ imageUrls }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const nextImage = () => {
    if (imageUrls.length === 0) return;
    setActiveImageIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const prevImage = () => {
    if (imageUrls.length === 0) return;
    setActiveImageIndex(
      (prev) => (prev - 1 + imageUrls.length) % imageUrls.length
    );
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold) nextImage();
    else if (diff < -threshold) prevImage();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Reseta índice ativo sempre que imageUrls mudar
  useEffect(() => {
    setActiveImageIndex(0);
  }, [imageUrls]);

  // Intervalo automático para trocar imagens
  useEffect(() => {
    if (imageUrls.length === 0) return;
    const interval = setInterval(() => nextImage(), 5000);
    return () => clearInterval(interval);
  }, [imageUrls.length]);

  return (
    <div
      className="relative mt-5 min-h-[250px]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {imageUrls.length > 1 && (
        <>
          <p className="absolute select-none top-2 right-2 bg-black bg-opacity-60 text-white text-sm w-11 h-6 flex justify-center items-center rounded-2xl">
            {activeImageIndex + 1}/{imageUrls.length}
          </p>

          <button
            className="absolute size-10 text-white top-1/2 right-3 cursor-pointer hidden md:block -translate-y-1/2"
            onClick={nextImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-10"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            className="absolute size-10 text-white top-1/2 left-3 cursor-pointer hidden md:block -translate-y-1/2"
            onClick={prevImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-10"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </>
      )}

      <img
        src={
          imageUrls.length > 0
            ? imageUrls[activeImageIndex]
            : profileImageUrlPlaceHolder
        }
        alt="Imagem Produto"
        className="w-full max-h-[450px] rounded-md"
      />
      <div className="flex justify-center gap-2 mt-3">
        {imageUrls.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === activeImageIndex ? "bg-blue-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
