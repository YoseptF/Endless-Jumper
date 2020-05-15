const LocalStorageMock = () => {
  let store = {}; // eslint-disable-line no-unused-vars

  const clear = () => {
    store = {};
  };

  const getItem = (key) => this.store[key] || null;

  const setItem = (key, value) => {
    this.store[key] = value.toString();
  };

  const removeItem = (key) => {
    delete this.store[key];
  };

  return {
    clear, getItem, setItem, removeItem,
  };
};

export default LocalStorageMock;