import "./adverts-page.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import AdvertItem from "../../components/ui/advert-item";
import Page from "../../components/layout/page";
import Button from "../../components/ui/button";
import { useAppDispatch, useAppSelector } from "../../store";
import { advertsLoaded, tagsLoaded } from "../../store/actions";
import { getAdverts } from "../../store/selectors";
import type { Tag } from "./types";
import { useFilters } from "../../store/hooks";
import { useTags } from "../../store/hooks";

const EmptyList = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/adverts/new");
  };

  return (
    <div className="adverts-page-empty">
      <p>Be the first one!</p>
      <Button $variant="primary" onClick={handleClick}>
        Create advert
      </Button>
    </div>
  );
};

function AdvertsPage() {
  const dispatch = useAppDispatch();
  const adverts = useAppSelector(getAdverts);

  const tags = useTags();
  const { filters, applyFilters } = useFilters();

  useEffect(() => {
    dispatch(advertsLoaded());
    dispatch(tagsLoaded());
  }, [dispatch]);

  const handleTagToggle = (tag: Tag) => {
    const newSelectedTags = filters.selectedTags.includes(tag)
      ? filters.selectedTags.filter((t) => t !== tag)
      : [...filters.selectedTags, tag];

    applyFilters({ ...filters, selectedTags: newSelectedTags });
  };

  const handleInputChange = (field: keyof typeof filters, value: any) => {
    applyFilters({ ...filters, [field]: value });
  };

  const filteredAdverts = adverts.filter((ad) => {
    const matchesName = filters.name
      ? ad.name.toLowerCase().startsWith(filters.name.toLowerCase())
      : true;

    const matchesPrice =
      ad.price >= filters.priceRange[0] && ad.price <= filters.priceRange[1];

    const matchesSale =
      filters.sale === "all" ? true : ad.sale === (filters.sale === "true");

    const matchesTags = filters.selectedTags.every((tag) =>
      ad.tags.includes(tag),
    );

    return matchesName && matchesPrice && matchesSale && matchesTags;
  });

  return (
    <Page title="">
      <div className="mx-auto mt-16 max-w-2xl px-4">
        <div className="dark:bg-dark-background space-y-6 rounded bg-white p-6 shadow-sm">
          <div className="mb-4 flex">
            <div className="h-12 w-1/3 bg-white">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Name Filter
              </label>
              <input
                type="text"
                placeholder="..."
                value={filters.name}
                className="mb-2 block text-sm font-bold text-gray-700"
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="h-12 w-1/3 bg-white">
              <select
                className="mb-2 block text-sm font-bold text-gray-700"
                value={filters.sale}
                onChange={(e) =>
                  handleInputChange(
                    "sale",
                    e.target.value as typeof filters.sale,
                  )
                }
              >
                <option value="all">Sale and Buy</option>
                <option value="true">Sale</option>
                <option value="false">Buy</option>
              </select>
            </div>
            <div className="h-12 w-1/3 bg-white">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Price Range: {filters.priceRange[0]} - {filters.priceRange[1]}
              </label>
              <div>
                <input
                  type="range"
                  min="0"
                  max="25000"
                  step={50}
                  value={filters.priceRange[0]}
                  onChange={(e) =>
                    handleInputChange("priceRange", [
                      Number(e.target.value),
                      filters.priceRange[1],
                    ])
                  }
                />
                <input
                  type="range"
                  min="0"
                  max="25000"
                  step={50}
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    handleInputChange("priceRange", [
                      filters.priceRange[0],
                      Number(e.target.value),
                    ])
                  }
                />
              </div>
            </div>
          </div>

          <fieldset>
            <legend className="mb-2 block text-sm font-bold text-gray-700">
              Tags
            </legend>
            <div className="mb-4 flex flex-wrap gap-4">
              {tags.map((tag) => (
                <label
                  key={tag}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    value={tag}
                    checked={filters.selectedTags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                    className="accent-blue-500"
                  />
                  {tag}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {filteredAdverts.length ? (
          <ul className="mt-8 mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {filteredAdverts.map((advert) => (
              <li key={advert.id} className="w-full">
                <Link to={`/adverts/${advert.id}`}>
                  <AdvertItem advert={advert} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </Page>
  );
}

export default AdvertsPage;
