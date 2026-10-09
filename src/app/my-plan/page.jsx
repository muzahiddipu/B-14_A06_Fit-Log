import MyPlan from "../components/MyPlan";

export default async function MyPlanPage({ searchParams }) {
  const { tab } = await searchParams;
  const initialTab = tab === "saved" ? "saved" : "today";

  return <MyPlan key={initialTab} initialTab={initialTab} />;
}
