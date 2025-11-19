import {
  Archive,
  Blocks,
  ChartNoAxesCombined,
  ClipboardClock,
  HandPlatter,
  Home,
  ListTodo,
  Logs,
  type LucideIcon,
  MapPin,
  Package,
  ShieldUser,
  ShoppingBag,
  Ticket,
  Truck,
  User,
  Users,
} from "lucide-react";

export type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export const adminNavData: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: ChartNoAxesCombined,
  },
  {
    title: "POS",
    url: "/pos",
    icon: Logs,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ListTodo,
  },
  {
    title: "Pick Ups",
    url: "/pickups",
    icon: Package,
  },
  {
    title: "Members",
    url: "/members",
    icon: Users,
  },
  {
    title: "Shifts",
    url: "/shifts",
    icon: ClipboardClock,
  },
];

export const superAdminNavData: NavItem[] = [
  ...adminNavData,
  {
    title: "Inventories",
    url: "/inventories",
    icon: Archive,
  },
  {
    title: "Services",
    url: "/services",
    icon: HandPlatter,
  },
  {
    title: "Vouchers",
    url: "/vouchers",
    icon: Ticket,
  },
  {
    title: "Bundlings",
    url: "/bundlings",
    icon: Blocks,
  },
  {
    title: "Users",
    url: "/users",
    icon: ShieldUser,
  },
];

export const customerNavData: NavItem[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Services", // Based on the 'services' table
    url: "/services",
    icon: HandPlatter,
  },
  {
    title: "Products", // Based on the 'inventories' table
    url: "/products",
    icon: ShoppingBag,
  },
  {
    title: "Bundles", // Based on the 'bundlings' table
    url: "/bundles",
    icon: Archive,
  },
  {
    title: "My Orders", // Based on the 'orders' table
    url: "/orders",
    icon: ListTodo,
  },
  {
    title: "My Deliveries", // Based on the 'deliveries' table
    url: "/deliveries",
    icon: Truck,
  },
  {
    title: "Vouchers", // Based on the 'vouchers' table and 'members' table (points)
    url: "/vouchers",
    icon: Ticket,
  },
  {
    title: "My Profile", // Based on the 'user' table
    url: "/profile",
    icon: User,
  },
  {
    title: "My Addresses", // Based on the 'addresses' table
    url: "/addresses",
    icon: MapPin,
  },
];
