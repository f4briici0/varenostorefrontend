export default function Upload({ previews, setPreviews }) {
  const handleImageChange = (e) => {
    const files = Array.from(
      e?.target?.files instanceof FileList ? e.target.files : []
    );

    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setPreviews((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      const combined = [...safePrev, ...newPreviews];
      return combined.slice(0, 4);
    });
  };

  const handleRemoveImage = (indexToRemove) => {
    setPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full">
      {/* Imagens carregadas */}
      <div className="flex items-center gap-3 ml-2 overflow-x-auto pr-5 mt-3">
        {previews.map((preview, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-[100px] h-[150px]"
          >
            <img
              src={preview}
              alt={`Pré-visualização ${index + 1}`}
              className="w-full h-full object-contain rounded-md shadow"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 text-sm flex items-center justify-center hover:bg-opacity-75 font-bold"
              title="Remover imagem"
              type="button"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Contador de imagens */}
      <div className="w-11/12 m-auto flex justify-end mb-2">
        <p className="bg-gray-500 px-3 text-white rounded-full mt-3 mb-2 text-sm">
          {previews.length}/4
        </p>
      </div>

      {/* Botão de upload */}
      <label
        className={`cursor-pointer flex items-center justify-center w-11/12 m-auto h-20 border-2 border-dashed rounded-xl ${
          previews.length >= 4
            ? "border-gray-300 text-gray-400"
            : "border-gray-400 text-gray-600"
        }`}
      >
        <span className="flex gap-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9Z"
            />
          </svg>
          {previews.length >= 4
            ? "Limite de imagens atingido"
            : "Carregue suas imagens"}
        </span>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageChange}
          disabled={previews.length >= 4}
        />
      </label>
    </div>
  );
}
