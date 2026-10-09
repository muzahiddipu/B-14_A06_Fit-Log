"use client";

import { createContext, useContext, useEffect, useState } from "react";

const WorkoutStoreContext = createContext(null);
const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

function readWorkouts(key) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    return Array.isArray(value)
      ? value.filter((workout) => workout && workout.id != null)
      : [];
  } catch {
    return [];
  }
}

export function WorkoutStoreProvider({ children }) {
  const [plannedWorkouts, setPlannedWorkouts] = useState([]);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setPlannedWorkouts(readWorkouts(PLAN_KEY));
      setSavedWorkouts(readWorkouts(SAVED_KEY));
      setIsHydrated(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    window.localStorage.setItem(PLAN_KEY, JSON.stringify(plannedWorkouts));
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(savedWorkouts));
  }, [plannedWorkouts, savedWorkouts, isHydrated]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function addToPlan(workout) {
    if (!isHydrated) return;

    if (plannedWorkouts.some((item) => item.id === workout.id)) {
      setToast("Already in today’s plan");
      return;
    }

    const updatedWorkouts = [...plannedWorkouts, workout];
    window.localStorage.setItem(PLAN_KEY, JSON.stringify(updatedWorkouts));
    setPlannedWorkouts(updatedWorkouts);
    setToast("Added to today’s plan");
  }

  function saveForLater(workout) {
    if (!isHydrated) return;

    if (savedWorkouts.some((item) => item.id === workout.id)) {
      setToast("Already saved");
      return;
    }

    const updatedWorkouts = [...savedWorkouts, workout];
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(updatedWorkouts));
    setSavedWorkouts(updatedWorkouts);
    setToast("Saved for later");
  }

  function removeFromPlan(id) {
    const updatedWorkouts = plannedWorkouts.filter((item) => item.id !== id);
    window.localStorage.setItem(PLAN_KEY, JSON.stringify(updatedWorkouts));
    setPlannedWorkouts(updatedWorkouts);
  }

  function removeFromSaved(id) {
    const updatedWorkouts = savedWorkouts.filter((item) => item.id !== id);
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(updatedWorkouts));
    setSavedWorkouts(updatedWorkouts);
  }

  return (
    <WorkoutStoreContext.Provider
      value={{
        plannedWorkouts,
        savedWorkouts,
        isHydrated,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 rounded-lg border border-white/10 bg-[#191b15] px-4 py-3 text-sm font-medium text-white shadow-xl transition-all ${
          toast
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        {toast}
      </div>
    </WorkoutStoreContext.Provider>
  );
}

export function useWorkoutStore() {
  const context = useContext(WorkoutStoreContext);
  if (!context) {
    throw new Error("useWorkoutStore must be used inside WorkoutStoreProvider");
  }
  return context;
}
