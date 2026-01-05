import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { PosItemData } from "@/lib/modules/pos/data";
import type { PosOrderItem } from "@/lib/modules/pos/state";

const customerOrderAtom = atomWithStorage<PosOrderItem[]>("customer-cart", []);

export const useCustomerOrder = () => {
  const [customerCart, setCustomerCart] = useAtom(customerOrderAtom);
  const { push } = useRouter();

  const handleAddToCart = (item: PosItemData) => {
    const existingItem = customerCart.find((i) => i.id === item.id);

    if (existingItem) {
      setCustomerCart(
        customerCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      const dynamicIdKey = `${item.itemType}Id`;
      const { stock, ...otherItemProps } = item;

      const newItem = {
        ...otherItemProps,
        image: item.image ?? "/placeholder.svg",
        note: "",
        quantity: 1,
        itemType: item.itemType as
          | "service"
          | "inventory"
          | "bundling"
          | "voucher",
        [dynamicIdKey]: item.id,
        ...(item.itemType === "inventory" && { stock }),
      };

      setCustomerCart((prev) => [...prev, newItem]);
    }

    toast("1 Item added to cart", {
      action: {
        label: "View Cart",
        onClick: () => push("/customer-orders/new/order-summary"),
      },
    });
  };

  const handleIncrementQuantity = (itemId: string) => {
    setCustomerCart(
      customerCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrementQuantity = (itemId: string) => {
    setCustomerCart((carts) => {
      const selectedItem = carts.find((item) => item.id === itemId);

      if (selectedItem && selectedItem?.quantity > 1) {
        return carts.map((cart) =>
          cart.id === itemId ? { ...cart, quantity: cart.quantity - 1 } : cart
        );
      }
      return carts.filter((cart) => cart.id !== itemId);
    });
  };

  const totalItems = customerCart.reduce((acc, curr) => acc + curr.quantity, 0);

  return {
    customerCart,
    setCustomerCart,
    handleAddToCart,
    totalItems,
    handleIncrementQuantity,
    handleDecrementQuantity,
  };
};
