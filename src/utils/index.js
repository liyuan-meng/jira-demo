export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (obj) => {
  return Object.keys(obj).reduce((result, key) => {
    if (!isFalsy(obj[key])) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};

export const qs = (obj) => {
  return Object.keys(obj)
    .reduce((arr, key) => {
      arr.push(`${key}=${obj[key]}`);
      return arr;
    }, [])
    .join("&");
};
