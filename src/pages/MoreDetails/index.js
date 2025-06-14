import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import Menu from "../MoreDetails/Menu";
import Avaliacoes from "../MoreDetails/Avaliacoes";
import Comprar from "../MoreDetails/Comprar";

export default function MoreDetails() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.0.197:8080/publication")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        alert(error.message);
        console.error("Erro:", error);
      });
  }, []);

  const [showMenu, setShowMenu] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMenu]);

  const imageUrls = data?.[2]?.publicationImageUrls || [];

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

  function formatPrice(cents) {
    return `R$${(cents / 100).toFixed(2).replace(".", ",")}`;
  }

  return (
    <div className="bg-white pt-5 pb-10 relative">
      <Menu />

      {/* BACKDROP */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
          onClick={toggleMenu}
        />
      )}

      <div className="w-full flex flex-col justify-center items-center">
        <img
          src={data[0]?.profileImageUrl}
          className="bg-gray-500 w-20 h-20 rounded-full cursor-pointer"
          onClick={() => alert("IR_LOJA")}
          alt="Imagem da Loja"
        />
        <h1 className="text-xl mt-3 font-roboto font-bold">
          {data[0]?.storeName || "Nome da Loja"}
        </h1>
      </div>

      <div
        className="relative bg-gray-100 mt-5 w-11/12 sm:w-[450px] m-auto min-h-[250px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {imageUrls.length > 1 && (
          <>
            <p className="absolute select-none top-2 right-2 bg-black w-11 h-6 flex justify-center items-center rounded-2xl bg-opacity-60 text-white text-sm">
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

        <div>
          {/* Usar somente a imagem ativa */}
          <img
            src={imageUrls[activeImageIndex]}
            alt="Imagem do produto"
            className="w-full object-cover rounded-md min-h-[250px]"
          />
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-3 w-11/12 sm:w-[450px] m-auto">
        {imageUrls.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              index === activeImageIndex ? "bg-blue-500" : "bg-gray-400"
            }`}
            onClick={() => setActiveImageIndex(index)}
          />
        ))}
      </div>

      <div className="w-11/12 sm:w-[450px] mt-3 m-auto flex flex-col">
        <p className="font-geist">{data[0]?.publicationDescription}</p>
        <p className="font-bold text-green-600 text-xl">
          {formatPrice(data[0]?.priceCents)}
        </p>

        <div className="flex mt-2 h-[50px] rounded-lg">
          <button
            onClick={toggleMenu}
            className="bg-customRed text-xl font-extrabold font-roboto text-white 
              w-[250px] h-full text-center flex items-center justify-center rounded-lg"
          >
            COMPRAR
          </button>

          <div className="ml-3 flex items-center">
            <div className="w-[50px] h-[50px] border border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 
                1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 
                1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 
                0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
          </div>
        </div>

        <Avaliacoes />
      </div>

      <Comprar showMenu={showMenu} toggleMenu={toggleMenu} />

      <div className="mt-10"></div>
      <div className="h-[200px]"></div>
    </div>
  );
}
