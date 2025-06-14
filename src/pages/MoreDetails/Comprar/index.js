import { Link } from "react-router-dom";
import f2 from "../../../common/f2.jpg";

export default function Comprar({ showMenu, toggleMenu }) {
  return (
    <div
      className={`pb-10 bottom-0 left-0 fixed bg-white w-full sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:w-[600px] rounded-tl-2xl rounded-tr-2xl h-[700px] border border-gray-400 transition-transform duration-300 z-[9998] overflow-y-auto ${
        showMenu ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="float-right font-extrabold mt-3 mr-5 text-gray-500 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-7"
          onClick={toggleMenu}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <div className="mt-16 ml-5 flex">
        <div className="w-[150px] flex">
          <img src={f2} alt="Imagem Produto" />
        </div>
        <div className="ml-2">
          <p className="font-bold text-green-600 text-xl">R$89,99</p>
          <p> Estoque: 8 </p>
        </div>
      </div>

      <h1 className="mt-5 ml-5 font text-lg">Tamanho</h1>
      <div className="flex flex-wrap gap-y-2 mt-2">
        <div className="ml-5 flex items-center justify-center bg-red-50 h-[50px] p-5 rounded-lg border border-red-500 cursor-pointer">
          <p> P </p>
        </div>
        <div className="ml-5 flex items-center justify-center h-[50px] p-5 rounded-lg border border-gray-500 cursor-pointer">
          <p> G </p>
        </div>
        <div className="ml-5 flex items-center justify-center h-[50px] p-5 rounded-lg border border-gray-500 cursor-pointer">
          <p> GG </p>
        </div>
      </div>

      <hr className="mt-5 mb-8" />
      <div className="flex items-center justify-end mr-5">
        <h1 className="mt-2 ml-5 text-lg">Quantidade</h1>
        <div className="flex ml-5 mt-2">
          <p className="text-2xl flex items-center justify-center border border-gray-300 w-[30px] h-[30px] rounded mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5 text-gray-300"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 12h14"
              />
            </svg>
          </p>
          <p className="font-bold text-xl"> 2 </p>
          <div className="text-2xl flex items-center justify-center border border-gray-500 w-[30px] h-[30px] rounded ml-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </div>
      </div>
      <Link to="/bag">
        <button
          className="mt-5 bg-customRed text-xl font-extrabold font-roboto text-white 
          w-11/12 m-auto h-[50px] text-center flex items-center justify-center rounded-lg"
        >
          COMPRAR
        </button>
      </Link>
    </div>
  );
}
