export const dashNameToSentence = (dashName: string) =>
  dashName.replace(/-/g, " ").replace(/\b^\w/g, (char) => char.toUpperCase());
