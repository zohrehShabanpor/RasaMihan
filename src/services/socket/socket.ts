/** @format */

import { useCallback, useEffect, useRef } from "react";
import useWebSocket, { Options, ReadyState } from "react-use-websocket";

export type IUseSocketResponse = any;

type IUseSocketOptions = Pick<Options, "onError" | "onOpen" | "onClose"> & {
  defaultType?: any;
  onUnMount?: () => void;
  onOpenedMount?: () => void;
  onMessage?: (
    message: {
      E: number;
      s: string;
      p: string;
      P: string;
      w: string;
      c: string;
      Q: string;
      o: string;
      h: string;
      l: string;
      v: string;
      q: string;
      O: number;
      C: number;
      F: number;
      L: number;
      n: number;
    }[]
  ) => void;
};

export const useSocket = (options: IUseSocketOptions) => {
  const cachedOptions = useRef<IUseSocketOptions>(options);
  cachedOptions.current = options;

  const onMessage = useCallback((message: MessageEvent<any>) => {
    try {
      const lastMessage = (message.data && JSON.parse(message.data)) as
        | IUseSocketResponse
        | undefined;
      if (!lastMessage || !cachedOptions.current.onMessage) return;
      if (Array.isArray(cachedOptions.current.defaultType)) {
        if (cachedOptions.current.defaultType.includes(lastMessage.type))
          cachedOptions.current.onMessage(lastMessage.data);
      } else if (typeof cachedOptions.current.defaultType === "string") {
        if (lastMessage.type === cachedOptions.current.defaultType)
          cachedOptions.current.onMessage(lastMessage.data);
      } else {
        cachedOptions.current.onMessage(
          lastMessage as Parameters<Required<IUseSocketOptions>["onMessage"]>[0]
        );
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }, []);

  const WEB_SOCKET_URL = "wss://fstream.binance.com/ws/ticker@arr";

  const { sendJsonMessage, readyState } = useWebSocket(WEB_SOCKET_URL, {
    onMessage,
    share: true,
    onOpen: cachedOptions.current.onOpen,
    onError: cachedOptions.current.onError,
    onClose: cachedOptions.current.onClose,
  });

  const emitMessage = useCallback(
    function (event: any) {
      return sendJsonMessage(event);
    },
    [sendJsonMessage]
  );

  useEffect(() => {
    if (readyState !== ReadyState.OPEN) return;
    cachedOptions.current.onOpenedMount?.();
  }, [readyState]);

  useEffect(() => {
    return () => {
      cachedOptions.current.onUnMount?.();
    };
  }, []);

  return { readyState, emitMessage };
};
