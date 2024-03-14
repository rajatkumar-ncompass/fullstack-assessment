const fetchLocalStorageItem = (key) => {
  const data = localStorage.getItem(key);
  return data;
};

const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, value);
};
export { fetchLocalStorageItem, setLocalStorageItem };
