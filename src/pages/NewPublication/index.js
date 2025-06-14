import React, { useEffect, useState } from "react";
import Card from "./Card";
import BasicInfo from "./BasicInfoCard/BasicInfo";
import VariationCard from "./VariationCard";

export default function NewPublication() {
  // estados existentes...
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [storeName, setStoreName] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [publicationDescription, setPublicationDescription] = useState("");
  const [publicationImageUrls, setPublicationImageUrls] = useState([]);
  const [priceCents, setPriceCents] = useState(0);

  const [titleVariation, setTitleVariation] = useState("Tamanho");

  const [indexUser, setIndexUser] = useState(0);

  const [mainVariation, setMainVariation] = useState({
    variationText: "",
    stock: "",
  });
  const [additionalVariations, setAdditionalVariations] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.197:8080/publication")
      .then((response) => {
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        if (data.length > 0) {
          setProfileImageUrl(data[0].profileImageUrl || "");
          setStoreName(data[0].storeName || "");
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.error("Erro:", error);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  const handleUserIndex = (i) => setIndexUser(i);

  const handleSubmit = () => {
    const postData = {
      imagens: publicationImageUrls,
      descricao: publicationDescription,
      preco: priceCents,
      tituloVariacao: titleVariation,
      variacao: mainVariation,
      variacoesAdicionais: additionalVariations,
    };
    console.log("Dados para envio:\n\n" + JSON.stringify(postData, null, 2));
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
