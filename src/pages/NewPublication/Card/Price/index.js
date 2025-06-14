export default function Price({ priceCents }) {
  function formatPrice(cents) {
    return `R$${(cents / 100).toFixed(2).replace(".", ",")}`;
  }

  return (
    <div className="mt-2 flex items-start justify-between">
      <p className="font-roboto font-bold text-green-600 text-xl">
        {formatPrice(priceCents)}
      </p>
    </div>
  );
}
