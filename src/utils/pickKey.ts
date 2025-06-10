export const pickKey =
  <T>(key: keyof T) =>
  (data: T) =>
    data[key];
