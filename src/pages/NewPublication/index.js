import React, { useEffect, useState } from "react";
import Card from "./Card";
import BasicInfo from "./BasicInfoCard/BasicInfo";
import VariationCard from "./VariationCard";

export default function NewPublication() {
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

  useEffect(() => {
    fetch("http://192.168.0.197:8080/publication")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
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

  const handleUserIndex = (i) => {
    setIndexUser(i);
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

      {indexUser == 0 ? (
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
        />
      )}

      <br />
      <br />
    </div>
  );
}
