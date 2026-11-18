
"use client";

import Discover from "./components/Discover";
import { useState } from "react";
import BottomNavigation from "./components/BottomNavigation";
import Matches from "./components/Matches";

type Tab = "home" | "discover" | "matches";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  return (
    <main className="min-h-screen bg-white pb-24">
      <div className="mx-auto min-h-screen w-full max-w-[440px] px-4">

        {/* Header */}
        <header className="flex h-20 items-center justify-between">
          <h1 className="text-3xl font-black tracking-tight text-[#211b29]">
            coy<span className="text-[#ff347b]">.</span>
          </h1>

          <button
            aria-label="Settings"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f6f3fa] text-2xl"
          >
            ⚙
          </button>
        </header>

        {/* Home Tab */}
        {activeTab === "home" && (
          <section className="space-y-4 pt-1">

            <div className="rounded-[26px] border-2 border-[#211b29] bg-[#e8e0ff] p-5 shadow-[4px_5px_0_#211b29]">
              <div className="mb-3 text-3xl">🤫</div>

              <h2 className="text-[27px] font-extrabold leading-tight tracking-tight">
                No one has added you yet
              </h2>

              <p className="mt-2 text-[15px] text-[#625d6b]">
                Invite friends so your crush can join too.
              </p>

              <button className="mt-5 rounded-full border-2 border-[#211b29] bg-white px-5 py-2.5 text-sm font-bold shadow-[3px_3px_0_#211b29]">
                Invite friends
              </button>
            </div>

            {/* Email card */}
            <div className="flex items-center gap-3 rounded-[20px] border-2 border-[#eeeaf4] p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e0efff]">
                📧
              </div>

              <div className="flex-1">
                <h3 className="font-bold">Add your email</h3>
                <p className="text-sm leading-snug text-[#777181]">
                  So people who only have your email can find you.
                </p>
              </div>

              <button className="font-bold text-[#ff347b]">
                Add
              </button>
            </div>

            {/* Crushes */}
            <section className="pt-3">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-extrabold">Your crushes</h2>
                <span className="rounded-full bg-[#f6f3fa] px-3 py-1 text-sm font-bold text-[#777181]">
                  0/3
                </span>
              </div>

              <button className="flex w-full items-center gap-4 rounded-[20px] border-2 border-dashed border-[#d7cde5] p-3.5 text-left font-bold">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#211b29] bg-[#ff347b] text-2xl text-white shadow-[2px_2px_0_#211b29]">
                  +
                </span>
                Add a crush
              </button>

              <p className="mt-4 text-sm leading-relaxed text-[#777181]">
                They get an anonymous heads-up right away. Never who.
              </p>
            </section>

          </section>
        )}

        {/* Discover Tab */}
        {activeTab === "discover" && <Discover />}

        {/* Matches Tab */}
        {activeTab === "matches" && <Matches />}

      </div>

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </main>
  );
}