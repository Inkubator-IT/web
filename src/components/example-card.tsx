"use client";

import { useState } from "react";

const ExampleCard = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="mt-8 inline-flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-6">
      <button
        type="button"
        className="rounded-xl border border-white/20 px-5 py-2 text-base font-medium text-white shadow-sm transition hover:bg-white/10 active:scale-95 bg-white/5 backdrop-blur"
        onClick={() => setCount((c: number) => c + 1)}
      >
        count is <span className="font-semibold">{count}</span>
      </button>

      <p className="text-sm text-gray-200">
        Edit <code className="font-mono">src/app/page.tsx</code> and save to
        test HMR
      </p>
    </div>
  );
};

export default ExampleCard;
