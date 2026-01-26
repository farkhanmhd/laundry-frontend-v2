import { atom, useAtom } from "jotai";
import type { User } from "@/lib/modules/users/data";

type DialogUserData = Pick<User, "id" | "name" | "role">;

type UserTableDialog = {
  open: boolean;
  user: DialogUserData | null;
  dialog: "role" | "ban" | null;
};

const userTableDialogAtom = atom<UserTableDialog>({
  open: false,
  user: null,
  dialog: null,
});

export function useUserTableDialog() {
  const [data, setData] = useAtom(userTableDialogAtom);

  const openUpdateRoleDialog = (user: DialogUserData) => {
    setData({
      open: true,
      user,
      dialog: "role",
    });
  };

  const openBanUserDialog = (user: DialogUserData) => {
    setData({
      open: true,
      user,
      dialog: "ban",
    });
  };

  const isUserAdmin = data?.user?.role === "admin";
  const isRoleDialogOpen = data.open === true && data.dialog === "role";
  const isBanDialogOpen = data.open === true && data.dialog === "ban";
  const user = data.user;

  const closeUserDialog = () => {
    setData({
      open: false,
      user: null,
      dialog: null,
    });
  };

  return {
    data,
    openUpdateRoleDialog,
    openBanUserDialog,
    closeUserDialog,
    isRoleDialogOpen,
    isBanDialogOpen,
    isUserAdmin,
    user,
  };
}
