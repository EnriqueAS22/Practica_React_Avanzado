type StorageKey = "auth";

const storage = {
  get(key: StorageKey) {
    return localStorage.getItem(key) || sessionStorage.getItem(key) || null;
  },

  set(key: StorageKey, value: string, remember: boolean) {
    if (remember) {
      localStorage.setItem(key, value);
    }
  },

  remove(key: StorageKey) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
    sessionStorage.clear();
  },
};

export default storage;
