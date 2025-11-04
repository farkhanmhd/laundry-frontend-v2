import { sleep } from "bun";
import { NavMain } from "@/components/sidebar/nav-main";
import { getSession } from "@/lib/session";

const Default = async () => {
  await sleep(2000);
  const session = await getSession();

  return <NavMain type={session?.user.role as string} />;
};

export default Default;
