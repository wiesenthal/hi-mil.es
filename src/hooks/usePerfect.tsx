import { useState, useRef, useEffect, type MutableRefObject } from "react";

const isFunction = <T,>(
  value: T | ((prevState: T) => T),
): value is (prevState: T) => T => typeof value === "function";

export const f =
  <T, R = T>(...args: T[]) =>
  (func: (...args: T[]) => R) =>
    func(...args);

export const to = <T,>(arg: T) => arg;

export const first =
  <T,>(func: (...args: T[]) => void): ((...args: T[]) => void) =>
  (arg: T) =>
    func(arg);

export const eq =
  <T,>(x: T) =>
  (y: T) =>
    x === y;

const ne =
  <T,>(x: T) =>
  (y: T) =>
    y !== x;

type v<T> = (value: T) => void;
type b<T> = (value: T) => boolean;

const expect =
  <T,>(predicate: b<T>) =>
  (push: v<v<T>>) =>
  (resolve: v<boolean>) =>
    push((v) => predicate(v) && (resolve(true), true));

const neg =
  <T,>(predicate: b<T>) =>
  (v: T) =>
    !predicate(v);

const p =
  <T,>(ref: MutableRefObject<v<T>[]>): v<v<T>> =>
  (resolve: v<T>) => (ref.current.push(resolve), undefined);

export default function usePerfect<T>(initialState: T | (() => T)) {
  const [state, _setState] = useState(initialState);
  const laggingRef = useRef<T | null>(null);
  const ref = useRef(state);
  const resolves = useRef<v<T>[]>([]);
  const isResolves = useRef<b<T>[]>([]);

  const transitionCallbacks = useRef<
    ((nextState: T, previousState?: T | null) => void)[]
  >([]);

  const setState = useRef((newState: React.SetStateAction<T>) => {
    const previousState = ref.current;
    const nextState = isFunction(newState) ? newState(ref.current) : newState;
    if (previousState === nextState) return;
    _setState(nextState);
    ref.current = nextState;
    transitionCallbacks.current.forEach(f(nextState, previousState));
    return nextState;
  }).current;

  const onTransition = useRef(
    (callback: (nextState: T, previousState?: T | null) => void) => (
      p(transitionCallbacks)(callback),
      () => (
        (transitionCallbacks.current = transitionCallbacks.current.filter(
          ne(callback),
        )),
        undefined
      )
    ),
  ).current;

  useEffect(() => {
    laggingRef.current = state;
    resolves.current.forEach(f(state));
    resolves.current.splice(0);
    isResolves.current.forEach(f(state));
    isResolves.current = isResolves.current.filter(neg(f(state)));
  }, [state]);

  const resolve = useRef(async () =>
    laggingRef.current === ref.current
      ? ref.current
      : new Promise<T>(p(resolves)),
  ).current;

  const is = useRef(
    async (predicate: (state: T) => boolean) =>
      new Promise<boolean>(expect(predicate)(p(isResolves))),
  ).current;

  return {
    ref,
    state,
    setState,
    onTransition,
    resolve,
    is,
  };
}
