"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

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

  function addToPlan(workout) {
    if (!isHydrated) return;

    if (plannedWorkouts.some((item) => item.id === workout.id)) {
      toast.info("Already in today’s plan");
      return;
    }

    if (plannedWorkouts.length >= 5) {
      toast.info("Finish a lift before adding another. Today’s plan holds five.");
      return;
    }

    const updatedWorkouts = [...plannedWorkouts, workout];
    window.localStorage.setItem(PLAN_KEY, JSON.stringify(updatedWorkouts));
    setPlannedWorkouts(updatedWorkouts);
    toast.success("Added to today’s plan");
  }

  function saveForLater(workout) {
    if (!isHydrated) return;

    if (savedWorkouts.some((item) => item.id === workout.id)) {
      toast.info("Already saved");
      return;
    }

    const updatedWorkouts = [...savedWorkouts, workout];
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(updatedWorkouts));
    setSavedWorkouts(updatedWorkouts);
    toast.success("Saved for later");
  }

  function removeFromPlan(id) {
    const updatedWorkouts = plannedWorkouts.filter((item) => item.id !== id);
    window.localStorage.setItem(PLAN_KEY, JSON.stringify(updatedWorkouts));
    setPlannedWorkouts(updatedWorkouts);
    toast.info("Removed from today’s plan");
  }

  function completeWorkout(id) {
    const updatedWorkouts = plannedWorkouts.filter((item) => item.id !== id);
    window.localStorage.setItem(PLAN_KEY, JSON.stringify(updatedWorkouts));
    setPlannedWorkouts(updatedWorkouts);
    toast.success("Workout marked as done");
  }

  function removeFromSaved(id) {
    const updatedWorkouts = savedWorkouts.filter((item) => item.id !== id);
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(updatedWorkouts));
    setSavedWorkouts(updatedWorkouts);
    toast.info("Removed from saved workouts");
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
        completeWorkout,
        removeFromSaved,
      }}
    >
      {children}
      <ToastContainer
        position="top-right"
        autoClose={2600}
        closeOnClick
        pauseOnHover
        theme="light"
        toastClassName="fitlog-toast"
        progressClassName="fitlog-toast-progress"
      />
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
