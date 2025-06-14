import React from "react";

export default function Header({
  profileImageUrl,
  storeName,
  createdAt,
  publicationDescription,
}) {
  function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (days > 0) return `há ${days} dia${days > 1 ? "s" : ""}`;
    if (hours > 0) return `há ${hours} hora${hours > 1 ? "s" : ""}`;
    if (minutes > 0) return `há ${minutes} minuto${minutes > 1 ? "s" : ""}`;
    if (seconds > 5) return `há ${seconds} segundos`;

    return "agora mesmo";
  }

  return (
    <div className="flex items-center">
      <img
        src={profileImageUrl}
        className="bg-gray-500 w-20 h-20 rounded-full"
        alt="Imagem da Loja"
      />
      <div className="ml-3">
        <h1 className="text-xl font-roboto font-bold">{storeName}</h1>
        <p className="text-sm text-slate-500 select-none">
          {timeAgo(createdAt)}
        </p>
        <h1>{publicationDescription}</h1>
      </div>
    </div>
  );
}
