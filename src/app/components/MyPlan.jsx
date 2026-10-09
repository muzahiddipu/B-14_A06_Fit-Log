"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FiActivity,
  FiArrowUpRight,
  FiCheck,
  FiClock,
  FiStar,
  FiX,
  FiZap,
} from "react-icons/fi";
import { useWorkoutStore } from "./WorkoutStore";

const MyPlan = ({ initialTab = "today" }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const {
    plannedWorkouts,
    savedWorkouts,
    isHydrated,
    removeFromPlan,
    completeWorkout,
    removeFromSaved,
  } = useWorkoutStore();
  const isTodayTab = activeTab === "today";
  const workouts = isTodayTab ? plannedWorkouts : savedWorkouts;
  const totalMinutes = plannedWorkouts.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0,
  );
  const totalCalories = plannedWorkouts.reduce(
    (total, workout) => total + Number(workout.caloriesBurned || 0),
    0,
  );

  return (
    <main className="min-h-[calc(100svh-76px)] bg-[#0a0a0a] px-4 pb-12 pt-8 text-white sm:px-8 sm:pt-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C2F800]">
            Your training
          </p>
          <h1 className="mt-2 text-3xl font-extrabold uppercase sm:text-4xl">
            My Plan
          </h1>
          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </header>

        <section
          aria-label="Today's plan summary"
          className="mt-6 grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-[#11130d] sm:grid-cols-3"
        >
          <div className="flex items-center gap-4 border-b border-white/10 px-5 py-4 sm:border-r sm:border-b-0 sm:px-6 sm:py-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#C2F800]/10 text-[#C2F800]">
              <FiActivity aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-medium text-gray-400">Exercises</p>
              <p className="mt-0.5 text-2xl font-extrabold text-[#C2F800]">
                {plannedWorkouts.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-b border-white/10 px-5 py-4 sm:border-r sm:border-b-0 sm:px-6 sm:py-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-gray-300">
              <FiClock aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-medium text-gray-400">Minutes</p>
              <p className="mt-0.5 text-2xl font-extrabold text-white">
                {totalMinutes}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-5 py-4 sm:px-6 sm:py-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-gray-300">
              <FiZap aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-medium text-gray-400">Calories</p>
              <p className="mt-0.5 text-2xl font-extrabold text-white">
                {totalCalories}
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="inline-flex w-full rounded-xl border border-white/10 bg-[#11130d] p-1 sm:w-auto"
            role="tablist"
            aria-label="Workout lists"
          >
            <button
              type="button"
              role="tab"
              aria-selected={isTodayTab}
              onClick={() => setActiveTab("today")}
              className={`min-h-10 flex-1 rounded-lg px-4 text-sm font-bold transition-colors sm:flex-none ${
                isTodayTab
                  ? "bg-[#C2F800] text-[#10110B] shadow-[0_4px_18px_rgba(194,248,0,0.18)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan
              <span className="ml-2 opacity-75">{plannedWorkouts.length}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={!isTodayTab}
              onClick={() => setActiveTab("saved")}
              className={`min-h-10 flex-1 rounded-lg px-4 text-sm font-bold transition-colors sm:flex-none ${
                !isTodayTab
                  ? "bg-[#C2F800] text-[#10110B] shadow-[0_4px_18px_rgba(194,248,0,0.18)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved
              <span className="ml-2 opacity-75">{savedWorkouts.length}</span>
            </button>
          </div>
        </div>

        {!isHydrated ? (
          <p
            role="status"
            className="mt-5 rounded-2xl border border-white/10 bg-[#11130d] px-5 py-12 text-center text-sm text-gray-400"
          >
            Loading workouts…
          </p>
        ) : workouts.length === 0 ? (
          <div className="mt-5 flex flex-col items-center rounded-2xl border border-dashed border-white/15 bg-[#11130d]/70 px-5 py-12 text-center sm:py-16">
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-[#C2F800]/20 bg-[#C2F800]/10 text-[#C2F800]">
              <FiActivity aria-hidden="true" className="h-7 w-7" />
            </span>
            <h2 className="mt-5 text-lg font-extrabold uppercase tracking-wide">
              Nothing here yet
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
              {isTodayTab
                ? "Browse the library and add a lift to get today moving."
                : "Browse the library and save a lift to keep it close for later."}
            </p>
            <Link
              href="/#workouts"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#C2F800] px-5 py-2.5 text-sm font-extrabold text-[#10110B] transition hover:bg-[#d1ff27] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2F800]"
            >
              Go to workouts
              <FiArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-4">
            {workouts.map((workout) => (
              <article
                key={workout.id}
                className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-x-4 gap-y-3 rounded-2xl border border-white/10 bg-[#11130d] p-3 transition-colors hover:border-[#C2F800]/30 sm:grid-cols-[128px_minmax(0,1fr)_auto] sm:gap-x-5 sm:p-4"
              >
                <Image
                  src={workout.image}
                  alt={workout.name}
                  width={256}
                  height={160}
                  sizes="(max-width: 640px) 88px, 128px"
                  className="row-span-2 h-20 w-full rounded-xl object-cover sm:row-span-1 sm:h-20"
                />

                <div className="min-w-0 self-center">
                  <h2 className="truncate text-sm font-extrabold uppercase tracking-wide text-white sm:text-base">
                    {workout.name}
                  </h2>
                  <p className="mt-1 truncate text-xs text-gray-400 sm:text-sm">
                    {workout.equipment}
                    <span aria-hidden="true"> · </span>
                    {workout.sets} sets
                    <span aria-hidden="true"> · </span>
                    {workout.reps} reps
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-300 sm:gap-x-4 sm:text-xs">
                    <span className="inline-flex items-center gap-1.5">
                      <FiClock
                        aria-hidden="true"
                        className="h-3.5 w-3.5 text-[#C2F800]"
                      />
                      {workout.duration} min
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FiZap
                        aria-hidden="true"
                        className="h-3.5 w-3.5 text-[#C2F800]"
                      />
                      {workout.caloriesBurned} kcal
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FiStar
                        aria-hidden="true"
                        className="h-3.5 w-3.5 text-[#C2F800]"
                      />
                      {workout.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="col-span-2 flex flex-wrap items-center gap-2 pl-1 sm:col-span-1 sm:justify-end sm:pl-0">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="inline-flex min-h-9 items-center justify-center rounded-lg border border-white/15 px-3 text-xs font-semibold text-gray-200 transition-colors hover:border-[#C2F800]/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2F800]"
                  >
                    View Details
                  </Link>
                  {isTodayTab && (
                    <button
                      type="button"
                      onClick={() => completeWorkout(workout.id)}
                      className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-[#C2F800] px-3 text-xs font-extrabold text-[#10110B] transition-colors hover:bg-[#d1ff27] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2F800]"
                    >
                      <FiCheck aria-hidden="true" className="h-4 w-4" />
                      Mark as Done
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      isTodayTab
                        ? removeFromPlan(workout.id)
                        : removeFromSaved(workout.id)
                    }
                    aria-label={`Remove ${workout.name} from ${
                      isTodayTab ? "today’s plan" : "saved workouts"
                    }`}
                    title="Remove workout"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-gray-400 transition-colors hover:bg-red-400/10 hover:text-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2F800]"
                  >
                    <FiX aria-hidden="true" className="h-4 w-4" />
                  </button>
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
