import { useEffect } from "react";

export function createEventEmitter<TPayload>(eventName: string) {
  const emit = (payload: TPayload) => {
    window.dispatchEvent(
      new CustomEvent<TPayload>(eventName, { detail: payload })
    );
  };

  const useListener = (callback: (payload: TPayload) => void) => {
    useEffect(() => {
      const eventCallback = (e: Event) => {
        const event = e as CustomEvent<TPayload>;
        callback(event.detail);
      };
      window.addEventListener(eventName, eventCallback, false);

      return () => {
        window.removeEventListener(eventName, eventCallback);
      };
    }, [callback]);
  };

  return [emit, useListener] as const;
}
