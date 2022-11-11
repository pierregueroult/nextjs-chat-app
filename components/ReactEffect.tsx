import Ably from "ably/promises";
import { useEffect } from "react";

const ably = new Ably.Realtime.Promise({ authUrl: "/api/createTokenReq" });

export function useChannel(channelName: string, callBackOnMessage: Function) {
  const channel = ably.channels.get(channelName);
  const onMount = () => {
    channel.subscribe((msg) => {
      callBackOnMessage(msg);
    });
  };
  const onUnmount = () => {
    channel.unsubscribe();
  };
  const useEffectHook = () => {
    onMount();
    return () => {
      onUnmount();
    };
  };
  useEffect(useEffectHook);
  return [channel, ably];
}
