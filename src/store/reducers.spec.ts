import type { Advert } from "../pages/advert/types";
import { adverts, auth } from "./reducer";

describe("auth reducer", () => {
  test("should manage 'auth/login/fulfilled' action", () => {
    const result = auth(undefined, { type: "auth/login/fulfilled" });
    expect(result).toBe(true);
  });

  test("should manage 'auth/logout' action", () => {
    const result = auth(undefined, { type: "auth/logout" });
    expect(result).toBe(false);
  });

  test("should manage any other action", () => {
    const result = auth(true, { type: "ui/reset-error" });
    expect(result).toBe(true);
  });
});

describe("adverts reducer", () => {
  const advert: Advert = {
    id: "1",
    name: "",
    price: 34,
    sale: true,
    tags: [],
  };
  test("should manage 'adverts/created/fulfilled' action", () => {
    const result = adverts(
      { data: [], loaded: false },
      {
        type: "adverts/created/fulfilled",
        payload: advert,
      },
    );
    expect(result.data).toHaveLength(1);
    expect(result.data).toEqual([advert]);
    expect(result.loaded).toBe(false);
  });
});
