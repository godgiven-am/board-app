import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b bg-background/70 px-4 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="-ml-1 text-muted-foreground" />
      <Separator orientation="vertical" className="h-5" />
      <span className="text-sm font-medium">Navbar</span>
    </header>
  );
};
