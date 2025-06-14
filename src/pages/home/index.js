import { useEffect, useState } from "react";
import Card from "./Card";
import Loading from "./Loading";

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.0.197:8080/publication")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.error("Erro:", error);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="w-11/12 sm:w-[450px] h-[500px] m-auto rounded-lg mt-10 items-center justify-center flex flex-col">
        <p className="text-red-500 text-center font-bold">
          Ocorreu um erro ao carregar os dados.
          <br />
          Por favor, tente recarregar a página mais tarde.
        </p>
      </div>
    );
  }

  return (
    <div>
      <br />
      {data.map((item, index) => (
        <div key={index}>
          <Card
            profileImageUrl={item.profileImageUrl}
            storeName={item.storeName}
            createdAt={item.createdAt}
            publicationDescription={item.publicationDescription}
            publicationImageUrls={item.publicationImageUrls}
            priceCents={item.priceCents}
            link={`more-details?op=${index + 1}`}
          />
          <hr className="w-11/12 my-4 m-auto" />
        </div>
      ))}
    </div>
  );
}
