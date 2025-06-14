import { useState } from "react";

export default function VariationCard({
  titleVariation,
  setTitleVariation,
  onBack,
}) {
  const [variationText, setVariationText] = useState("G");
  const [stock, setStock] = useState("0");
  const [additionalVariations, setAdditionalVariations] = useState([]);

  const handleStockChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 6) value = value.slice(0, 6);
    setStock(value);
  };

  const handleAddVariation = () => {
    if (variationText.trim() === "" || stock.trim() === "") {
      alert("Preencha a variação e o estoque antes de adicionar.");
      return;
    }

    setAdditionalVariations([
      ...additionalVariations,
      { id: Date.now(), variationText: "", stock: "" },
    ]);
  };

  const handleRemoveVariation = (id) => {
    setAdditionalVariations(additionalVariations.filter((v) => v.id !== id));
  };

  const handleVariationChange = (id, field, value) => {
    setAdditionalVariations((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              [field]: field === "stock" ? value.replace(/[^0-9]/g, "") : value,
            }
          : v
      )
    );
  };

  return (
    <div className="w-11/12 sm:w-[450px] m-auto">
      {/* BANNER DE VISUALIZAÇÃO (NÃO MEXE) */}
      <div className="border border-gray-500 pb-3 pl-3 rounded-lg">
        <h1 className="text-lg text-gray-600 font-bold mt-2">
          {titleVariation}
        </h1>

        <div className="mt-3 flex flex-wrap gap-3">
          {/* Primeira variação */}
          <div className="border border-gray-500 px-5 flex flex-col justify-center items-center rounded-lg">
            <p className="font-medium text-gray-500">{variationText}</p>
            <p className="font-bold text-gray-400">Estoque: {stock}</p>
          </div>

          {/* Outras variações */}
          {additionalVariations.map((v) => (
            <div
              key={v.id}
              className="border border-gray-500 px-5 flex flex-col justify-center items-center rounded-lg"
            >
              <p className="font-medium text-gray-500">{v.variationText}</p>
              <p className="font-bold text-gray-400">Estoque: {v.stock}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FORMULÁRIO DE CADASTRO */}
      <div className="border border-gray-500 pb-3 pl-3 rounded-lg mt-5">
        <p className="text-lg text-black font-bold mt-2">
          Variações do Produto
        </p>

        {/* NÃO MEXE */}
        <h1 className="text-lg text-gray-600 font-bold mt-2">
          Título da Variação
        </h1>
        <input
          className="w-11/12 p-2 border border-gray-500 rounded-lg mt-2"
          type="text"
          placeholder="Tamanho, Número, Cor"
          value={titleVariation}
          onChange={(e) => setTitleVariation(e.target.value)}
        />
        {/* ATÉ AQUI */}

        {/* Primeira variação */}
        <div className="border border-gray-500 flex flex-col w-11/12 mt-3 pb-3 rounded">
          <p className="ml-3 mt-3 text-gray-600 font-bold">Variação</p>
          <input
            className="w-11/12 p-2 border border-gray-500 rounded-lg mt-1 ml-3"
            type="text"
            placeholder="(M, G) (32, 41) (Azul, Branco)"
            value={variationText}
            onChange={(e) => setVariationText(e.target.value)}
          />
          <p className="ml-3 mt-3 text-gray-600 font-bold">
            Estoque Disponível
          </p>
          <input
            type="text"
            inputMode="numeric"
            className="w-11/12 p-2 border border-gray-300 rounded-md ml-3 mt-1"
            placeholder="Ex. 1"
            value={stock}
            onChange={handleStockChange}
            maxLength={6}
          />
        </div>

        {/* Outras variações */}
        {additionalVariations.map((v) => (
          <div
            key={v.id}
            className="border border-gray-500 flex flex-col w-11/12 mt-3 pb-3 rounded"
          >
            <div className="flex justify-between">
              <p className="ml-3 mt-3 text-gray-600 font-bold">Variação</p>
              <div className="mt-2 mr-2">
                <button
                  className="border-red-500 border rounded-full px-2 text-red-500"
                  onClick={() => handleRemoveVariation(v.id)}
                >
                  X
                </button>
              </div>
            </div>
            <input
              className="w-11/12 p-2 border border-gray-500 rounded-lg mt-1 ml-3"
              type="text"
              placeholder="(M, G) (32, 41) (Azul, Branco)"
              value={v.variationText}
              onChange={(e) =>
                handleVariationChange(v.id, "variationText", e.target.value)
              }
            />
            <p className="ml-3 mt-3 text-gray-600 font-bold">
              Estoque Disponível
            </p>
            <input
              type="text"
              inputMode="numeric"
              className="w-11/12 p-2 border border-gray-300 rounded-md ml-3 mt-1"
              placeholder="Ex. 1"
              value={v.stock}
              onChange={(e) =>
                handleVariationChange(v.id, "stock", e.target.value)
              }
              maxLength={6}
            />
          </div>
        ))}

        <button
          className="border border-gray-500 w-11/12 rounded-lg mt-3 text-center p-2 bg-gray-200"
          onClick={handleAddVariation}
        >
          Adicionar Variação
        </button>
      </div>

      {/* BOTÃO VOLTAR */}
      <div className="flex justify-center mt-5">
        <button
          onClick={onBack}
          className="flex items-center border border-gray-500 px-4 py-2 rounded hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M14 8a.75.75 0 0 1-.75.75H4.56l1.22 1.22a.75.75 0 1 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1 0-1.06l2.5-2.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z"
              clipRule="evenodd"
            />
          </svg>
          Voltar
        </button>
      </div>
    </div>
  );
}
