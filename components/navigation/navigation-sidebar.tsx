import { NavMain } from "@/components/sidebar/nav-main";
import { getCachedSession } from "@/lib/session";

const NavigationSidebar = async () => {
  const session = await getCachedSession();

  return <NavMain type={session?.user.role as string} />;
};

export default NavigationSidebar;
