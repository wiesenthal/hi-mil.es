import path from "path";

export const getFileName = (file: string) => path.parse(file).name;
