import "server-only";

import { EventEmitter } from "node:events";

export type AuctionEvent =
  | { kind: "bid"; id: string; lot: number; currentBid: string; at: number }
  | { kind: "auction"; currentLot: number; status: string }
  | { kind: "catalog" };

const bus = new EventEmitter();

// Admin display screens subscribe through the SSE route, so do not cap listeners.
bus.setMaxListeners(0);

export function publishAuctionEvent(event: AuctionEvent) {
  bus.emit("event", event);
}

export function subscribeAuctionEvents(listener: (event: AuctionEvent) => void) {
  bus.on("event", listener);

  return () => {
    bus.off("event", listener);
  };
}
