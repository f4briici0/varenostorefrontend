import pix from "../../../../common/pix.svg";
import mercadopago from "../../../../common/mercadopago.png";

export default function Pagamento() {
  return (
    <div className="mt-5 pl-3 pr-3 m-auto pb-10 border border-200 w-11/12 rounded-lg">
      <p className="font-bold mt-2"> Método de Pagamentos </p>
      <label className="flex justify-between items-center mt-3 cursor-pointer">
        <div className="flex items-center">
          <img className="w-7" src={pix} alt="Logo do Pix" />
          <p className="ml-2">Pix</p>
        </div>
        <input
          type="radio"
          name="pagamento"
          className="w-5 h-5 accent-blue-600"
        />
      </label>

      <hr className="mt-3 mb-3" />
      <label className="flex justify-between items-center mt-3 cursor-pointer">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
            />
          </svg>

          <p className="ml-2">Cartão de Crédito</p>
        </div>

        <input
          type="radio"
          name="pagamento"
          className="w-5 h-5 accent-blue-600"
        />
      </label>

      <hr className="mt-3 mb-3" />
      <div className="text-sm flex items-center float-right">
        <p className="mr-2 text-gray-500 font-light"> Processador por:</p>
        <img className="w-7" src={mercadopago} alt="Logo do Mercado Pago" />
      </div>
    </div>
  );
}
