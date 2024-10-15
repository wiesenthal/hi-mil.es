"use client";

import { useEffect } from "react";
import usePerfect, { eq } from "../../hooks/usePerfect";

export default function HomePage() {
  const { ref, state, setState, onTransition, resolve, is } = usePerfect(0);
  const { state: debug, setState: setDebug } = usePerfect("");

  useEffect(() => {
    return onTransition((nextState, previousState) =>
      setDebug(`${previousState} -> ${nextState}`),
    );
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-br from-[#d1c4ff] via-zinc-100 to-[#a0ffde] text-black">
      <div className="container flex h-2/3 flex-col items-center justify-center gap-4 space-y-8 p-4 md:p-16">
        <button
          onClick={async () => {
            setState(state + 1);
            const x = await resolve();
            console.log("x", x, state);
          }}
        >
          Increment
        </button>
        <button
          onClick={() => {
            setState(state - 1);
          }}
        >
          Decrement
        </button>
        <button
          onClick={async () => {
            const awaitedState = await is(eq(5)).catch((e) => {
              console.error("e", e);
            });
            setDebug(JSON.stringify({ awaitedState, state }, null, 2));
          }}
        >
          Assert
        </button>
        <div>state: {state}</div>
        <pre>{debug}</pre>
      </div>
    </main>
  );
}
