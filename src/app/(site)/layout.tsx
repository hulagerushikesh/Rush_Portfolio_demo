import Navbar from "@/components/Navbar";
import RouteProgress from "@/components/ui/RouteProgress";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RouteProgress />
      <Navbar />
      {children}
    </>
  );
}
