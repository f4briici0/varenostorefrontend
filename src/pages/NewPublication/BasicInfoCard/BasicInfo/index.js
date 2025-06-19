import { useState } from "react";
import Upload from "../Upload";

export default function BasicInfo({
  previews,
  setPreviews,
  publicationDescription,
  setPublicationDescription,
  setPriceCents,
  setPublicationFiles,
  onNext,
}) {
  const [tPriceCents, setTPriceCents] = useState("");

  const handlePriceChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, "");
    if (value.length > 6) {
      value = value.slice(0, 6);
    }
    setPriceCents(value);
    setTPriceCents(value);
  };

  return (
    <div className="w-11/12 sm:w-[450px] m-auto">
      <p className="font-bold mb-1 text-xl ml-3 mt-3">Informações básicas</p>

      <Upload
        previews={previews}
        setPreviews={setPreviews}
        setFiles={setPublicationFiles}
      />

      <hr className="w-11/12 m-auto mt-7 mb-5" />

      <div className="ml-3">
        <label className="block mb-1 font-semibold text-gray-700">
          Descrição
        </label>
        <input
          type="text"
          className="w-11/12 p-2 border border-gray-300 rounded-md"
          placeholder="Digite a descrição aqui"
          value={publicationDescription}
          onChange={(e) => setPublicationDescription(e.target.value)}
        />
      </div>

      <div className="mt-3 ml-3">
        <label className="block mb-1 font-semibold text-gray-700">Preço</label>
        <input
          type="text"
          inputMode="numeric"
          className="w-11/12 p-2 border border-gray-300 rounded-md"
          placeholder="Ex. 8990"
          value={tPriceCents}
          onChange={handlePriceChange}
          maxLength={6}
        />
      </div>

      <div className="flex justify-center mt-5">
        <button
          onClick={onNext}
          className="flex items-center border border-gray-500 px-4 py-2 rounded hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          type="button"
        >
          Próximo
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 ml-2"
          >
            <path
              fillRule="evenodd"
              d="M2 8c0 .414.336.75.75.75h8.69l-1.22 1.22a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 1 0-1.06 1.06l1.22 1.22H2.75A.75.75 0 0 0 2 8Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
