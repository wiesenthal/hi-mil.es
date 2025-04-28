"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { createMessage } from "~/actions/message";
import { useVisitContext } from "~/visitContext";
export default function UserInput() {
  const { userId, visitId } = useVisitContext();
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function hide() {
    setShowInput(false);
    setInputValue("");
  }

  const handleDocumentKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        showInput ||
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      )
        return;

      const isPrintable =
        event.key.length === 1 &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.metaKey;

      if (isPrintable) {
        event.preventDefault();
        setInputValue(event.key);
        setShowInput(true);
      }
    },
    [showInput],
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;

      if (showInput && inputRef.current && !inputRef.current.contains(target))
        hide();

      if (!showInput && !target.closest("a, button, input, select, textarea"))
        setShowInput(true);
    },
    [showInput],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleDocumentKeyDown);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [handleDocumentKeyDown, handleClickOutside]);

  useEffect(() => {
    if (showInput && inputRef.current) {
      function focus() {
        if (!inputRef.current) return;
        inputRef.current.focus();
        const length = inputRef.current.value.length;
        inputRef.current.setSelectionRange(length, length);
      }
      requestAnimationFrame(focus);
    }
  }, [showInput]);

  async function submit() {
    if (isSubmitting) return;
    if (!userId || !visitId) return;
    setIsSubmitting(true);
    console.log("submitting", {
      userId,
      visitId,
      content: inputValue,
    });
    await createMessage({
      userId,
      visitId,
      content: inputValue,
    }).finally(() => setIsSubmitting(false));
    hide();
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Escape") hide();
    if (event.key === "Enter" && !event.shiftKey) submit();
  }

  useLayoutEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  }, [showInput, inputValue]);

  return (
    <div className="h-10 w-3/4 cursor-text md:w-1/2">
      {showInput && (
        <textarea
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          className="disabled:animate-shimmer w-full resize-none rounded bg-transparent bg-gradient-to-tl from-[#5751ff7b] to-[#00eaff7b] bg-clip-text font-serif text-xl font-thin text-transparent focus:outline-none disabled:cursor-not-allowed"
          placeholder="..."
          disabled={isSubmitting}
        />
      )}
    </div>
  );
}
