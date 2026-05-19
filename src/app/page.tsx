import { AppShell } from "@/components/AppShell";
import { HomeTab } from "@/components/HomeTab";
import { ExploreTab } from "@/components/ExploreTab";
import { ToolsTab } from "@/components/ToolsTab";
import { getEurHufRate } from "@/lib/fx";

export const revalidate = 3600;

export default async function Page() {
  const { rate, isFallback } = await getEurHufRate();

  return (
    <AppShell
      home={<HomeTab />}
      explore={<ExploreTab />}
      tools={<ToolsTab rate={rate} isFallback={isFallback} />}
    />
  );
}
