"use client";

type AuctionTimerProps = {
  onSold?: () => void;
};

  export function AuctionTimer({ onSold }: AuctionTimerProps) {
    return (
      <section
        data-testid="auction-timer"
        className="rounded-lg border border-black/10 shadow-sm"
      >
        <button
          type="button"
          data-testid="sold-button"
          onClick={onSold}
          className="w-full min-h-16 rounded-md bg-[#0f766e] px-4 text-2xl font-semibold text-white transition hover:bg-[#0d625b] cursor-pointer"
        >
          SOLD
        </button>
      </section>
    );
  }