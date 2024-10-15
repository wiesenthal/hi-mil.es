import { useEffect, useRef } from "react";

export default function useEffectOnce(effect: () => void) {
  const hasRun = useRef(false);
  useEffect(function () {
    if (hasRun.current) return;
    hasRun.current = true;
    effect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
