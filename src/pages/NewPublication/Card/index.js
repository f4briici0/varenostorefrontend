import Header from "./Header";
import ImageCarousel from "./ImageCarousel";
import Price from "./Price";

export default function Card(props) {
  const imageUrls = Array.isArray(props.publicationImageUrls)
    ? props.publicationImageUrls
    : [];

  return (
    <div className="bg-white pt-5 pb-10 w-11/12 sm:w-[450px] m-auto">
      <Header
        profileImageUrl={props.profileImageUrl}
        storeName={props.storeName}
        createdAt={props.createdAt}
        publicationDescription={
          props.publicationDescription.length > 0
            ? props.publicationDescription
            : "Sua descrição aqui"
        }
      />
      <ImageCarousel imageUrls={imageUrls} />
      <Price priceCents={props.priceCents} />
    </div>
  );
}
