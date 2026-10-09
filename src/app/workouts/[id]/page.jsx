import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import WorkoutActions from "../../components/WorkoutActions";
import { getWorkout } from "../../lib/workouts";

export default async function WorkoutDetailPage({ params }) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) notFound();

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating.toFixed(1)],
  ];

  return (
    <main className="min-h-[calc(100svh-76px)] bg-[#0a0a0a] px-4 py-8 text-white sm:px-8 sm:py-12 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/#workouts"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-[#C2F800]"
        >
          <span aria-hidden="true">←</span> Back to workouts
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div className="relative min-h-72 overflow-hidden rounded-lg border border-white/10 bg-[#151710] sm:min-h-[440px] lg:min-h-[640px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          <div className="py-1">
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full border border-[#C2F800]/25 bg-[#C2F800]/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#C2F800]"
                >
                  {group}
                </span>
              ))}
            </div>

            <h1 className="mt-5 text-3xl leading-tight font-extrabold uppercase sm:text-4xl">
              {workout.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-300">
              {workout.description}
            </p>

            <section aria-labelledby="workout-specs" className="mt-8">
              <h2
                id="workout-specs"
                className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400"
              >
                Key specs
              </h2>
              <dl className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-3">
                {specs.map(([label, value]) => (
                  <div key={label} className="bg-[#11130d] px-4 py-3">
                    <dt className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-white">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="workout-instructions" className="mt-8">
              <h2
                id="workout-instructions"
                className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400"
              >
                Instructions
              </h2>
              <ol className="mt-4 space-y-3">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={instruction}
                    className="flex gap-3 text-sm leading-6 text-gray-300"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#C2F800]/10 text-xs font-bold text-[#C2F800]">
                      {index + 1}
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </section>

            <div className="mt-8 border-t border-white/10 pt-6">
              <WorkoutActions workout={workout} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
