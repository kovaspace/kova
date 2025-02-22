import Login from "@/components/screens/Login";
import { headers } from "next/headers";

export default async function Home() {
  const headersList = await headers();
  const subdomain = headersList.get("x-subdomain");

  console.log(subdomain);

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Login />
    </div>
  );
}
