export const addData =
  <TAdded>(addedData: TAdded) =>
  <TBase>(data: TBase) => ({
    ...data,
    ...addedData,
  });
