"use client";

import { useWorkoutStore } from "./WorkoutStore";

const WorkoutActions = ({ workout }) => {
  const {
    plannedWorkouts,
    savedWorkouts,
    isHydrated,
    addToPlan,
    saveForLater,
  } = useWorkoutStore();
  const isPlanned = plannedWorkouts.some((item) => item.id === workout.id);
  const isSaved = savedWorkouts.some((item) => item.id === workout.id);

  return (
    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        disabled={!isHydrated}
        aria-pressed={isPlanned}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#C2F800] px-5 py-3 text-sm font-bold text-[#10110B] transition-colors hover:bg-[#d1ff27] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
        >
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        {isPlanned ? "Added to today’s plan" : "Add to today’s plan"}
      </button>

      <button
        type="button"
        onClick={() => saveForLater(workout)}
        disabled={!isHydrated}
        aria-pressed={isSaved}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-[#C2F800]/50 hover:text-[#C2F800] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
        >
          <path
            d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-3.75L6 21V4.75Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        {isSaved ? "Saved for later" : "Save for later"}
      </button>
    </div>
  );
};

export default WorkoutActions;
