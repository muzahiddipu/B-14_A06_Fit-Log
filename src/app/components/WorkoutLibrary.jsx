"use client";

import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import WorkoutCard from "./WorkoutCard";

function getWorkoutTags(workout) {
  const muscleGroups = Array.isArray(workout.muscleGroups)
    ? workout.muscleGroups
    : [];
  const tags = Array.isArray(workout.tags)
    ? workout.tags
    : typeof workout.tags === "string"
      ? [workout.tags]
      : [];

  return [...muscleGroups, ...tags];
}

const WorkoutLibrary = ({ workouts }) => {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredWorkouts = workouts.filter((workout) => {
    const searchableText = [workout.name, ...getWorkoutTags(workout)]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-sm">
          <span className="sr-only">Search workouts by name or muscle group</span>
          <FiSearch
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search workouts or muscle groups"
            className="min-h-11 w-full rounded-xl border border-white/10 bg-[#11130d] py-2 pl-10 pr-10 text-sm text-white outline-none transition-colors placeholder:text-gray-500 hover:border-white/20 focus:border-[#C2F800]/60 focus:ring-2 focus:ring-[#C2F800]/15"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear workout search"
              className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-md text-gray-400 hover:bg-white/10 hover:text-white"
            >
              <FiX aria-hidden="true" className="h-4 w-4" />
            </button>
          )}
        </label>
        <p className="text-xs text-gray-400 sm:text-sm" aria-live="polite">
          {filteredWorkouts.length}{" "}
          {filteredWorkouts.length === 1 ? "workout" : "workouts"}
        </p>
      </div>

      {filteredWorkouts.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-8 text-center text-sm text-gray-400">
          No workouts match “{query}”. Try a different name or muscle group.
        </p>
      ) : (
        <div className="container mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </>
  );
};

export default WorkoutLibrary;
