type func<T> = (arg: T) => T;

type metaFunc<T extends func<T>> = func<T>;

const meta = <T extends func<T>>(f: T) => f(f);

