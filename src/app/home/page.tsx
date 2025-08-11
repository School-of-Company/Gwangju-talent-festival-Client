import HomePage from "@/views/home/ui/HomePage";

export const dynamic = 'force-static';
export const revalidate = false;

export default async function Home() {
  return <HomePage />;
}
