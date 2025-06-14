import { Link } from "react-router-dom";
import share from "../../../common/send.png";
import { useState, useRef, useEffect } from "react";

export default function Card(props) {
  const [active, setActive] = useState(false);

  const toggleWishList = () => {
    setActive(!active);
    alert("WISHLIST");
  };

  const imageUrls =
    Array.isArray(props.publicationImageUrls) &&
    props.publicationImageUrls.length > 0
      ? props.publicationImageUrls
      : [];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

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

    if (diff > threshold) {
      nextImage();
    } else if (diff < -threshold) {
      prevImage();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + imageUrls.length) % imageUrls.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, [imageUrls.length]);

  function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (days > 0) return `há ${days} dia${days > 1 ? "s" : ""}`;
    if (hours > 0) return `há ${hours} hora${hours > 1 ? "s" : ""}`;
    if (minutes > 0) return `há ${minutes} minuto${minutes > 1 ? "s" : ""}`;
    if (seconds > 5) return `há ${seconds} segundos`;

    return "agora mesmo";
  }

  function formatPrice(cents) {
    return `R$${(cents / 100).toFixed(2).replace(".", ",")}`;
  }

  return (
    <div className="bg-white pt-5 pb-10">
      <div className="flex items-center w-11/12 sm:w-[450px] m-auto">
        <img
          src={props.profileImageUrl}
          className="bg-gray-500 w-20 h-20 rounded-full cursor-pointer"
          onClick={() => alert("IR_LOJA")}
          alt="Imagem da Loja"
        />
        <div className="ml-3">
          <h1 className="text-xl font-roboto font-bold">{props.storeName}</h1>
          <p className="text-sm text-slate-500 select-none">
            {timeAgo(props.createdAt)}
          </p>
          <h1>{props.publicationDescription}</h1>
        </div>
      </div>

      <div
        className="relative mt-5 w-11/12 sm:w-[450px] m-auto min-h-[250px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {imageUrls.length > 1 && (
          <>
            <p className="absolute select-none top-2 right-2 bg-black bg-opacity-60 text-white text-sm w-11 h-6 flex justify-center items-center rounded-2xl">
              {activeImageIndex + 1}/{imageUrls.length}
            </p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute size-10 text-white top-1/2 right-3 cursor-pointer hidden md:block"
              onClick={nextImage}
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                clipRule="evenodd"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute size-10 text-white top-1/2 left-3 cursor-pointer hidden md:block"
              onClick={prevImage}
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                clipRule="evenodd"
              />
            </svg>
          </>
        )}

        <Link to={props.link}>
          <img
            src={imageUrls[activeImageIndex]}
            alt="Imagem Produto"
            className="w-full object-cover rounded-md min-h-[250px]"
          />
        </Link>
      </div>

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

      <div className="w-11/12 sm:w-[450px] mt-2 m-auto flex items-start justify-between">
        <p className="font-roboto font-bold text-green-600 text-xl">
          {formatPrice(props.priceCents)}
        </p>

        <div className="flex items-center gap-3">
          {active ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-9 text-red-500 cursor-pointer"
              onClick={toggleWishList}
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-9 cursor-pointer"
              onClick={toggleWishList}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          )}

          <img
            onClick={() => alert("COMPARTILHAR")}
            className="cursor-pointer flex mr-1"
            src={share}
            alt="Compartilhar"
            width={28}
            height={28}
          />
        </div>
      </div>
    </div>
  );
}
