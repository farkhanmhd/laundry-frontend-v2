import { NavMain } from "@/components/sidebar/nav-main";
import { getComponentSession } from "@/lib/session";

const NavigationSidebar = async () => {
  const session = await getComponentSession();

  return <NavMain type={session?.user.role as string} />;
};

export default NavigationSidebar;
