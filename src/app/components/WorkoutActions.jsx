"use client";

import { FiBookmark, FiPlus } from "react-icons/fi";
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
        <FiPlus aria-hidden="true" className="h-5 w-5" />
        {isPlanned ? "Added to today’s plan" : "Add to today’s plan"}
      </button>

      <button
        type="button"
        onClick={() => saveForLater(workout)}
        disabled={!isHydrated}
        aria-pressed={isSaved}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-[#C2F800]/50 hover:text-[#C2F800] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FiBookmark aria-hidden="true" className="h-5 w-5" />
        {isSaved ? "Saved for later" : "Save for later"}
      </button>
    </div>
  );
};

export default WorkoutActions;
