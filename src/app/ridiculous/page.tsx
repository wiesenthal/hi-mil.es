"use client";

import { useEffect } from "react";
import usePerfect, { eq } from "../../hooks/usePerfect";

export default function Page() {
  const { state, setState, onTransition, is } = usePerfect(0);
  const { state: debug, setState: setDebug } = usePerfect<boolean | string>("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    onTransition((nextState, previousState) =>
      setDebug(`${previousState} -> ${nextState}`),
    ),
  );

  return (
    <div className="container flex h-2/3 flex-col items-center justify-center gap-4 space-y-8 p-4 md:p-16">
      <div>state: {state}</div>
      <button onClick={() => setState(state + 1)}>Increment</button>
      <button onClick={() => setState(state - 1)}>Decrement</button>
      <button onClick={() => is(eq(state)).then(alert)}>Await return</button>
      <div>{String(debug)}</div>
    </div>
  );
}
