import type { RootState } from ".";
import type { Advert } from "../pages/advert/types";
import { getAdvert } from "./selectors";

describe("getAdvert", () => {
  const advert: Advert = {
    id: "1",
    name: "",
    price: 34,
    sale: true,
    tags: [],
  };

  const state: RootState = {
    adverts: { data: [advert], loaded: true },
    auth: false,
    ui: { pending: false, error: null },
    tags: { loaded: false, data: [], error: null },
    filters: { name: "", priceRange: [0, 40], sale: "true", selectedTags: [] },
  };

  test("should return a advert with id 1", () => {
    const result = getAdvert("1")(state);
    expect(result).toBe(advert);
  });

  test("should return undefined", () => {
    const result = getAdvert("2")(state);
    expect(result).toBeUndefined();
  });
});
