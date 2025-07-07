type DatedObject = { createdAt: Date };

export const byCreatedAt = (a: DatedObject, b: DatedObject) =>
  b.createdAt.getTime() - a.createdAt.getTime();
