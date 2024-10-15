"use client";

import { createContext, useContext, useState } from "react";
import useEffectOnce from "./hooks/useEffectOnce";
import { visit } from "./actions/visit";

function useValue() {
  const [state, setState] = useState<
    | {
        visitId: number;
        userId: number;
        name: string | null;
      }
    | {
        visitId: undefined;
        userId: undefined;
        name: undefined;
      }
  >({
    visitId: undefined,
    userId: undefined,
    name: undefined,
  });

  useEffectOnce(() => visit().then(setState));

  return state;
}

export const VisitContext = createContext<ReturnType<typeof useValue> | null>(
  null,
);

export const VisitProvider = ({ children }: { children: React.ReactNode }) => (
  <VisitContext.Provider value={useValue()}>{children}</VisitContext.Provider>
);

export function useVisitContext() {
  const context = useContext(VisitContext);
  if (context === null)
    throw new Error("useVisitContext must be used within a VisitProvider");

  return context;
}
