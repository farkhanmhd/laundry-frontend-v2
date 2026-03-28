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

const createUserDialogAtom = atom(false);

export function useUserTableDialog() {
  const [data, setData] = useAtom(userTableDialogAtom);
  const [isCreateDialogOpen, setIsCreateDialogOpen] =
    useAtom(createUserDialogAtom);

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

  const openCreateUserDialog = () => setIsCreateDialogOpen(true);
  const closeCreateUserDialog = () => setIsCreateDialogOpen(false);

  return {
    data,
    openUpdateRoleDialog,
    openBanUserDialog,
    closeUserDialog,
    isRoleDialogOpen,
    isBanDialogOpen,
    isUserAdmin,
    user,
    isCreateDialogOpen,
    openCreateUserDialog,
    closeCreateUserDialog,
  };
}
