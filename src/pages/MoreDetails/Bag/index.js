import Enderecos from "./Enderecos";
import Detalhes from "./Detalhes";
import Pagamento from "./Pagamento";

export default function Bag() {
  return (
    <div className="sm:w-[600px] m-auto">
      <Enderecos />
      <Detalhes />
      <Pagamento />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
