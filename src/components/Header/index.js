import { useState } from "react";
import logo from "../../common/logo.png";
import Menu from "./Menu";
import { Link } from "react-router-dom";

export default function Header() {
  const [viewMenu, setViewMenu] = useState(false);

  const toggleMenu = () => {
    setViewMenu(!viewMenu);
  };

  return (
    <header className="w-full border-b border-gray-300">
      <div className="sm:w-5/6 md:w-2/3 lg:w-[800px] bg-white flex items-center justify-between m-auto">
        <Link to="/" className="flex items-center sm:w-11/12 pt-2 pb-2">
          <img className="w-14 ml-3 mr-3" src={logo} alt="Logo Cat Store" />
          <div>
            <h1 className="text-xl font-gantari select-none"> VARENO</h1>
            {/* VAREJO + CENTRO */}
            <h1 className="text-2xl font-inter font-extrabold select-none">
              {" "}
              CAMBARÁ{" "}
            </h1>
          </div>
        </Link>

        <div className="mr-5 flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>

          <div className="bg-gray-0 rounded-full p-1 bg-gray-200">
            {viewMenu ? (
              <Menu onClose={toggleMenu} />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-9 text-gray cursor-pointer transition-all"
                onClick={() => toggleMenu()}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
