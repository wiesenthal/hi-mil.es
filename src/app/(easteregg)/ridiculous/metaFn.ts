type func<T> = (arg: T) => T;

export type metaFunc<T extends func<T>> = func<T>;

export const meta = <T extends func<T>>(f: T) => f(f);
