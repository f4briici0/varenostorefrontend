import React, { useEffect, useState } from "react";
import Card from "./Card";
import BasicInfo from "./BasicInfoCard/BasicInfo";
import VariationCard from "./VariationCard";

export default function NewPublication() {
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [profileImageUrl, setProfileImageUrl] = useState(
    "https://companieslogo.com/img/orig/LREN3.SA-3e7b559f.png?t=1720244492"
  );
  const [storeName, setStoreName] = useState("Renner");
  const [createdAt] = useState("");
  const [publicationDescription, setPublicationDescription] = useState("");
  const [publicationImageUrls, setPublicationImageUrls] = useState([]);
  const [publicationFiles, setPublicationFiles] = useState([]);
  const [priceCents, setPriceCents] = useState(0);

  const [titleVariation, setTitleVariation] = useState("Tamanho");

  const [indexUser, setIndexUser] = useState(0);

  const [mainVariation, setMainVariation] = useState({
    textoVariacao: "",
    estoque: "",
  });
  const [additionalVariations, setAdditionalVariations] = useState([]);

  if (error) return <p>Erro: {error.message}</p>;

  const handleUserIndex = (i) => setIndexUser(i);

  const uploadImages = async () => {
    const formData = new FormData();
    publicationFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("http://192.168.0.197:8080/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro no upload:", err);
    }
  };

  const postFinal = async (absolutePaths) => {
    const postData = {
      imagens: absolutePaths,
      descricao: publicationDescription,
      preco: priceCents,
      tituloVariacao: titleVariation,
      variacao: mainVariation,
      variacoesAdicionais: additionalVariations,
    };

    try {
      const response = await fetch("http://192.168.0.197:8080/newpublication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`Erro ao enviar publicação: ${response.status}`);
      }

      const data = await response.json();
      console.log("Publicação enviada com sucesso:", data);
      return data;
    } catch (error) {
      console.error("Erro no envio:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      const uploadResult = await uploadImages();
      const absolutePaths = uploadResult.absolutePaths;
      await postFinal(absolutePaths);
    } catch (err) {
      console.error("Erro no processo de envio:", err);
    }
  };

  return (
    <div>
      <Card
        profileImageUrl={profileImageUrl}
        storeName={storeName}
        createdAt={createdAt}
        publicationDescription={publicationDescription}
        publicationImageUrls={publicationImageUrls}
        priceCents={priceCents}
      />

      {indexUser === 0 ? (
        <BasicInfo
          previews={publicationImageUrls || []}
          setPreviews={setPublicationImageUrls}
          publicationDescription={publicationDescription}
          setPublicationDescription={setPublicationDescription}
          price={priceCents}
          setPriceCents={setPriceCents}
          setPublicationFiles={setPublicationFiles}
          onNext={() => handleUserIndex(1)}
        />
      ) : (
        <VariationCard
          titleVariation={titleVariation}
          setTitleVariation={setTitleVariation}
          onBack={() => handleUserIndex(0)}
          setMainVariation={setMainVariation}
          setAdditionalVariations={setAdditionalVariations}
        />
      )}

      {indexUser === 1 && (
        <div className="w-11/12 sm:w-[450px] m-auto mt-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Enviar Publicação
          </button>
        </div>
      )}

      <br />
      <br />
    </div>
  );
}
