import { SidebarMenuSkeleton } from "../ui/sidebar";

export function SidebarSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 10 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Only for this skeletons
        <SidebarMenuSkeleton key={index} />
      ))}
    </div>
  );
}
