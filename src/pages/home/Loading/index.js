export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="w-11/12 sm:w-[450px]">
        <div className="flex">
          <div className="bg-gray-500 w-20 h-20 rounded-full cursor-pointer animate-pulse"></div>
          <div>
            <div className="bg-gray-500 w-24 h-5 ml-5 cursor-pointer animate-pulse"></div>
            <div className="bg-gray-500 w-32 h-5 mt-3 ml-5 cursor-pointer animate-pulse"></div>
          </div>
        </div>
        <div className="mt-5 bg-gray-500 w-full object-cover rounded-md min-h-[250px] animate-pulse"></div>
        <div className="bg-gray-500 w-20 h-5 mt-3 cursor-pointer animate-pulse"></div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 animate-spin mt-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>

      <p className="mt-4 text-black font-medium">Carregando...</p>
    </div>
  );
}
