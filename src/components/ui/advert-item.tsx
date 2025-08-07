import "./advert-item.css";
import type { Advert } from "../../pages/advert/types";

interface AdvertItemProps {
  advert: Advert;
}

const AdvertItem = ({ advert }: AdvertItemProps) => {
  const { name, sale, price, tags } = advert;
  return (
    <article className="max-w-sm overflow-hidden rounded shadow-lg">
      <div className="px-6 py-4">
        <header className="mb-2 flex items-start justify-between">
          <div className="mb-2 text-xl font-bold">{name}</div>
          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold ${
              sale ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {sale ? "Sale" : "Buy"}
          </span>
        </header>

        <p className="mb-2 text-sm text-gray-700">{price}€</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default AdvertItem;
