import { useEffect, useState } from "react";

export default function VariationCard({
  titleVariation,
  setTitleVariation,
  onBack,
  setMainVariation,
  setAdditionalVariations: setParentAdditionalVariations,
}) {
  const [variationText, setVariationText] = useState("P");
  const [stock, setStock] = useState("0");

  const [additionalVariations, setAdditionalVariations] = useState([]);

  const handleStockChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 6) value = value.slice(0, 6);
    setStock(value);
  };

  const handleAddVariation = () => {
    if (!variationText.trim() || !stock.trim() || stock === "0") {
      alert("Preencha a variação e o estoque corretamente antes de adicionar.");
      return;
    }

    const newVariation = {
      id: Date.now(),
      variationText: variationText.trim(),
      stock,
    };

    setAdditionalVariations((prev) => [...prev, newVariation]);
    setVariationText("");
    setStock("0");
  };

  const handleRemoveVariation = (id) => {
    setAdditionalVariations((prev) => prev.filter((v) => v.id !== id));
  };

  const handleVariationChange = (id, field, value) => {
    setAdditionalVariations((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              [field]: field === "stock" ? value.replace(/\D/g, "") : value,
            }
          : v
      )
    );
  };

  useEffect(() => {
    if (setMainVariation) {
      setMainVariation({ variationText, stock });
    }
  }, [variationText, stock, setMainVariation]);

  useEffect(() => {
    if (setParentAdditionalVariations) {
      setParentAdditionalVariations(additionalVariations);
    }
  }, [additionalVariations, setParentAdditionalVariations]);

  return (
    <div className="w-11/12 sm:w-[450px] m-auto">
      <div className="border border-gray-500 pb-3 pl-3 rounded-lg">
        <h1 className="text-lg text-gray-600 font-bold mt-2">
          {titleVariation}
        </h1>
        <div className="mt-3 flex flex-wrap gap-3">
          <VariationDisplay variationText={variationText} stock={stock} />

          {additionalVariations.map(({ id, variationText, stock }) => (
            <VariationDisplay
              key={id}
              variationText={variationText}
              stock={stock}
            />
          ))}
        </div>
      </div>

      <div className="border border-gray-500 pb-3 pl-3 rounded-lg mt-5">
        <p className="text-lg text-black font-bold mt-2">
          Variações do Produto
        </p>

        <label
          className="block text-lg text-gray-600 font-bold mt-4"
          htmlFor="titleVariation"
        >
          Título da Variação
        </label>
        <input
          id="titleVariation"
          className="w-11/12 p-2 border border-gray-500 rounded-lg mt-2"
          type="text"
          placeholder="Tamanho, Número, Cor"
          value={titleVariation}
          onChange={(e) => setTitleVariation(e.target.value)}
        />

        <VariationInput
          variationText={variationText}
          setVariationText={setVariationText}
          stock={stock}
          handleStockChange={handleStockChange}
          labelPrefix="Variação Principal"
        />

        {additionalVariations.map(({ id, variationText, stock }) => (
          <VariationEdit
            key={id}
            id={id}
            variationText={variationText}
            stock={stock}
            onRemove={handleRemoveVariation}
            onChange={handleVariationChange}
          />
        ))}

        <button
          className="border border-gray-500 w-11/12 rounded-lg mt-3 text-center p-2 bg-gray-200 hover:bg-gray-300 transition"
          onClick={handleAddVariation}
          type="button"
        >
          Adicionar Variação
        </button>
      </div>

      <div className="flex justify-center mt-5">
        <button
          onClick={onBack}
          className="flex items-center border border-gray-500 px-4 py-2 rounded hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          type="button"
          aria-label="Voltar"
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

function VariationDisplay({ variationText, stock }) {
  return (
    <div className="border border-gray-500 px-5 flex flex-col justify-center items-center rounded-lg">
      <p className="font-medium text-gray-500">{variationText || "—"}</p>
      <p className="font-bold text-gray-400">Estoque: {stock || "0"}</p>
    </div>
  );
}

function VariationInput({
  variationText,
  setVariationText,
  stock,
  handleStockChange,
  labelPrefix,
}) {
  return (
    <div className="border border-gray-500 flex flex-col w-11/12 mt-3 pb-3 rounded">
      <label className="ml-3 mt-3 text-gray-600 font-bold">
        {labelPrefix} Variação
      </label>
      <input
        className="w-11/12 p-2 border border-gray-500 rounded-lg mt-1 ml-3"
        type="text"
        placeholder="(M, G) (32, 41) (Azul, Branco)"
        value={variationText}
        onChange={(e) => setVariationText(e.target.value)}
      />
      <label className="ml-3 mt-3 text-gray-600 font-bold">
        Estoque Disponível
      </label>
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
  );
}

function VariationEdit({ id, variationText, stock, onRemove, onChange }) {
  return (
    <div className="border border-gray-500 flex flex-col w-11/12 mt-3 pb-3 rounded">
      <div className="flex justify-between">
        <label className="ml-3 mt-3 text-gray-600 font-bold">Variação</label>
        <button
          className=" text-red-500 mr-1"
          onClick={() => onRemove(id)}
          type="button"
          aria-label={`Remover variação ${variationText}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <input
        className="w-11/12 p-2 border border-gray-500 rounded-lg mt-1 ml-3"
        type="text"
        placeholder="(M, G) (32, 41) (Azul, Branco)"
        value={variationText}
        onChange={(e) => onChange(id, "variationText", e.target.value)}
      />
      <label className="ml-3 mt-3 text-gray-600 font-bold">
        Estoque Disponível
      </label>
      <input
        type="text"
        inputMode="numeric"
        className="w-11/12 p-2 border border-gray-300 rounded-md ml-3 mt-1"
        placeholder="Ex. 1"
        value={stock}
        onChange={(e) => onChange(id, "stock", e.target.value)}
        maxLength={6}
      />
    </div>
  );
}
