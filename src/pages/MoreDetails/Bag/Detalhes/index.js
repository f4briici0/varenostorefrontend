import f2 from "../../../../common/f2.jpg";

export default function Detalhes() {
  return (
    <div className="mt-10 pl-3 pr-3 m-auto pb-3 border border-200 w-11/12 rounded-lg">
      <p className="font-bold mt-2"> AKAZZO MODAS </p>
      <div className="flex mt-2">
        <div className="w-[100px] flex">
          <img src={f2} alt="Imagem Produto" />
        </div>
        <div className="ml-2">
          <p className="font-geist">
            Camiseta Muscle em Ribana com Manga Curta Branco
          </p>
          <p className="font-bold text-green-600 text-lg">R$89,99</p>
        </div>
      </div>
      <div>
        <textarea
          placeholder="Clique aqui para escrever mensagem para o vendedor"
          className="border border-gray-200 mt-2 p-3 w-full rounded-lg"
        />

        <div className="flex justify-between mt-3">
          <p>
            Total de <b>1</b> itens{" "}
          </p>
          <p> R$89,99 </p>
        </div>
      </div>
    </div>
  );
}
