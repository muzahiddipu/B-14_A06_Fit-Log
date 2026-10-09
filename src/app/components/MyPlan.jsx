"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useWorkoutStore } from "./WorkoutStore";

const MyPlan = () => {
  const [activeTab, setActiveTab] = useState("today");
  const {
    plannedWorkouts,
    savedWorkouts,
    isHydrated,
    removeFromPlan,
    removeFromSaved,
  } = useWorkoutStore();
  const workouts = activeTab === "today" ? plannedWorkouts : savedWorkouts;
  const removeWorkout =
    activeTab === "today" ? removeFromPlan : removeFromSaved;

  return (
    <main className="min-h-[calc(100svh-76px)] bg-[#0a0a0a] px-4 py-10 text-white sm:px-8 sm:py-14 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C2F800]">
              Your training
            </p>
            <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              My Plan
            </h1>
          </div>

          <Link
            href="/#workouts"
            className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#C2F800] px-4 py-2 text-sm font-bold text-[#10110B] transition-colors hover:bg-[#d1ff27]"
          >
            Browse workouts
          </Link>
        </div>

        <div
          className="mt-6 flex gap-2"
          role="tablist"
          aria-label="Workout lists"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "today"}
            onClick={() => setActiveTab("today")}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === "today"
                ? "bg-[#C2F800] text-[#10110B]"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            Today&apos;s Plan{" "}
            <span className="ml-1">{plannedWorkouts.length}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "saved"}
            onClick={() => setActiveTab("saved")}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === "saved"
                ? "bg-[#C2F800] text-[#10110B]"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            Saved <span className="ml-1">{savedWorkouts.length}</span>
          </button>
        </div>

        {!isHydrated ? (
          <p className="mt-8 rounded-lg border border-white/10 bg-white/[0.02] px-5 py-10 text-center text-sm text-gray-400">
            Loading your workouts...
          </p>
        ) : workouts.length === 0 ? (
          <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.02] px-5 py-10 text-center">
            <p className="text-base font-semibold text-white">
              {activeTab === "today"
                ? "Nothing planned for today yet."
                : "No saved workouts yet."}
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Add workouts from the library to see them here.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {workouts.map((workout) => (
              <article
                key={workout.id}
                className="flex overflow-hidden rounded-lg border border-white/10 bg-[#11130d]"
              >
                <Image
                  src={workout.image}
                  alt={workout.name}
                  width={240}
                  height={240}
                  sizes="120px"
                  className="h-auto w-28 shrink-0 object-cover sm:w-36"
                />
                <div className="flex min-w-0 flex-1 flex-col justify-between p-3 sm:p-4">
                  <div>
                    <h2 className="line-clamp-2 text-sm leading-5 font-bold uppercase text-white sm:text-base">
                      {workout.name}
                    </h2>
                    <p className="mt-1 text-xs text-gray-400">
                      {workout.duration} min · {workout.sets} sets
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/workouts/${workout.id}`}
                      className="text-xs font-bold text-[#C2F800] hover:underline"
                    >
                      View Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeWorkout(workout.id)}
                      className="text-xs font-medium text-gray-400 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyPlan;
