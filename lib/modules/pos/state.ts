import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { type ChangeEvent, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { elysia } from "@/elysia";
import { useBreakpoint } from "@/hooks/use-breakpoints";
import type { SearchQuery } from "@/lib/search-params";
import { phoneNumberRegex, positiveIntRegex } from "@/lib/utils";
import { createPosOrderAction } from "./actions";
import type { PosItemData, PosVoucher } from "./data";
import type { NewOrderSchema, OrderItem } from "./schema";

export const getPosMembers = async (query: SearchQuery) => {
  const { data: response } = await elysia.pos.members.get({
    fetch: {
      credentials: "include",
    },
    query,
  });

  const members = response?.data.members;
  return members;
};

export const getVoucherByCode = async (query: SearchQuery) => {
  const { data: response } = await elysia.pos.voucher.get({
    fetch: {
      credentials: "include",
    },
    query,
  });

  const voucher = response?.data;
  return voucher;
};

export type PosCustomer = NonNullable<
  Awaited<ReturnType<typeof getPosMembers>>
>[number];

export interface PosOrderItem extends OrderItem {
  id: string;
  image?: string;
  name: string;
  price: number;
  stock?: number | null;
}

export type CustomerType = ("guest" | "member") & string;
export type PaymentMethod = ("cash" | "qris") & string;

export interface PosDataState {
  open: boolean;
  items: PosOrderItem[];
  customerName: string;
  amountPaid: number;
  paymentMethod: PaymentMethod;
  customerType: CustomerType;
  phone: string;
  member?: PosCustomer | null;
  newMember: boolean;
  voucherList: PosVoucher[];
  selectedVoucher: PosVoucher | null;
  points?: number | null;
}

const initialData: PosDataState = {
  open: false,
  items: [],
  customerName: "",
  amountPaid: 0,
  paymentMethod: "cash",
  customerType: "guest",
  phone: "",
  newMember: false,
  voucherList: [],
  selectedVoucher: null,
};

const posDataAtom = atomWithStorage<PosDataState>("pos-data", initialData);

const getMaxDiscount = (voucher: PosVoucher, totalAmount: number) => {
  const voucherType =
    voucher.discountPercentage && voucher.discountPercentage !== null
      ? "percentage"
      : "fixed";

  const percentageDiscount =
    voucherType === "percentage" &&
    voucher.discountPercentage &&
    Number(voucher.discountPercentage) > 0
      ? Number(voucher.discountPercentage)
      : 0;

  const fixedDiscount =
    voucherType === "fixed" &&
    voucher.discountAmount &&
    voucher.discountAmount > 0
      ? voucher.discountAmount
      : 0;

  const totalPercentageDiscount =
    totalAmount - Math.floor(totalAmount * (percentageDiscount / 100));

  const maxDiscountAmount = {
    percentage:
      totalPercentageDiscount >= voucher.maxDiscountAmount
        ? voucher.maxDiscountAmount
        : totalPercentageDiscount,
    fixed:
      fixedDiscount > voucher.maxDiscountAmount
        ? voucher.maxDiscountAmount
        : fixedDiscount,
  };

  return maxDiscountAmount[voucherType];
};

export const usePOS = () => {
  const [posData, setPosData] = useAtom(posDataAtom);
  const isLarge = useBreakpoint(1024);
  const { push } = useRouter();
  const { execute, isPending } = useAction(createPosOrderAction, {
    onSuccess: ({ data: result }) => {
      if (result && result.status === "success") {
        toast.success(result.message);
        push(`/orders/${result.data?.orderId}/payment`);
        clearPosData();
      } else {
        toast.error("Failed to create new Order");
      }
    },
  });

  const [debouncedSearch] = useDebounce(posData.phone, 300);

  const {
    data: members,
    isLoading: isLoadingMembers,
    isFetching: isFetchingMembers,
  } = useQuery({
    queryKey: ["members", debouncedSearch],
    queryFn: () => getPosMembers({ search: debouncedSearch }),
    enabled: debouncedSearch.length > 0,
    staleTime: 10,
    structuralSharing: true,
    placeholderData: keepPreviousData,
  });

  const submitPosOrder = () => {
    const baseData = {
      customerName: posData.customerName,
      items: posData.items.map((item) => ({
        itemType: item.itemType,
        quantity: item.quantity,
        serviceId: item.serviceId || null,
        inventoryId: item.inventoryId || null,
        bundlingId: item.bundlingId || null,
        voucherId: item.voucherId || null,
        note: item.note,
      })),
    };

    let payload: NewOrderSchema;

    if (posData.paymentMethod === "cash") {
      payload = {
        ...baseData,
        paymentType: "cash",
        amountPaid: posData.amountPaid,
      };
    } else {
      payload = {
        ...baseData,
        paymentType: "qris",
      };
    }

    if (posData.member) {
      payload.customerName = posData.member.name;
      payload.memberId = posData.member.id;
    }

    if (posData.newMember && !posData.member) {
      payload.newMember = true;
      payload.phone = posData.phone;
    }

    if (posData.selectedVoucher) {
      payload.items.push({
        voucherId: posData.selectedVoucher.id,
        itemType: "voucher",
        quantity: 1,
      });
    }

    if (posData.points) {
      payload.points = -1 * posData.points;
    }

    execute(payload);
  };

  const handlePhoneChange = (value: string) => {
    setPosData((prev) => ({
      ...prev,
      phone: value.replace(phoneNumberRegex, ""),
    }));
  };

  const toggleCart = () => {
    setPosData((prev) => ({ ...prev, open: !prev.open }));
  };

  const handleIncrementQuantity = (itemId: string) => {
    setPosData({
      ...posData,
      items: posData.items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  };

  const handleDecrementQuantity = (itemId: string) => {
    setPosData((currentProducts) => ({
      ...posData,
      items: currentProducts.items.reduce((newArray, item) => {
        if (item.id === itemId) {
          if (item.quantity > 1) {
            newArray.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          newArray.push(item);
        }
        return newArray;
      }, [] as PosOrderItem[]),
    }));
  };

  const handleAddToCart = (item: PosItemData) => {
    const existingItem = posData.items.find((i) => i.id === item.id);

    if (existingItem) {
      setPosData((prev) => ({
        ...prev,
        items: posData.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      }));
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

      setPosData((prev) => ({
        ...prev,
        items: [...prev.items, newItem],
      }));
    }

    if (!isLarge) {
      toast("1 Item added to cart", {
        action: {
          label: "View Cart",
          onClick: () => setPosData((prev) => ({ ...prev, open: true })),
        },
      });
    }
  };

  const togglePoint = () => {
    setPosData((prev) => ({
      ...prev,
      points: posData.points !== null ? null : 0,
    }));
  };

  const totalAmount = useMemo(
    () =>
      posData.items
        .filter((item) => item.itemType !== "voucher")
        .reduce((acc, curr) => acc + curr.quantity * curr.price, 0),
    [posData.items]
  );

  const totalItems = useMemo(
    () => posData.items.reduce((total, item) => total + item.quantity, 0),
    [posData.items]
  );

  const pointsEarned =
    posData.member && totalAmount >= 10_000 ? Math.ceil(totalAmount / 10) : 0;

  const totalDiscount = useMemo(() => {
    if (!posData.selectedVoucher) {
      return 0;
    }

    return getMaxDiscount(posData.selectedVoucher, totalAmount);
  }, [totalAmount, posData.selectedVoucher]);

  const amountBeforePoints = useMemo(
    () => Math.max(0, totalAmount - totalDiscount),
    [totalAmount, totalDiscount]
  );

  const totalAmountToBePaid = useMemo(() => {
    const finalValue = totalAmount - totalDiscount - (posData.points ?? 0);

    return finalValue < 0 ? 0 : finalValue;
  }, [totalAmount, totalDiscount, posData.points]);

  useEffect(() => {
    if (posData.selectedVoucher) {
      const minSpend = posData.selectedVoucher.minSpend || 0;
      const isCartEmpty = totalAmount === 0;
      const isBelowMinSpend = totalAmount < minSpend;

      if (isCartEmpty || isBelowMinSpend || !posData.member) {
        setPosData((prev) => ({ ...prev, selectedVoucher: null }));
      }
    }
  }, [posData.member, totalAmount, posData.selectedVoucher, setPosData]);

  const handleSelectVoucher = (voucher: PosVoucher) => {
    setPosData((prev) => ({
      ...prev,
      selectedVoucher: voucher,
    }));
    toast.success(`Voucher ${voucher.description} applied!`);
  };

  const handleRemoveVoucher = () => {
    setPosData((prev) => ({
      ...prev,
      selectedVoucher: null,
    }));
  };

  const isSelectedVoucher = (voucherId: string) =>
    voucherId === posData.selectedVoucher?.id;

  const handleCustomerTypeChange = (value: CustomerType) => {
    setPosData((prev) => ({
      ...prev,
      customerName: "",
      newMember: false,
      member: null,
      items:
        value === "guest"
          ? prev.items.filter((item) => item.itemType !== "voucher")
          : prev.items,
      customerType: value,
    }));
  };

  const handlePaymentMethodChange = (value: PaymentMethod) => {
    setPosData((prev) => ({
      ...prev,
      paymentMethod: value,
    }));
  };

  const handleCustomerNameChange = (value: string) => {
    setPosData((prev) => ({
      ...prev,
      customerName: value,
    }));
  };

  const handlePointChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 1. Get the raw number the user is trying to type
    const rawValue = Number(e.target.value.replace(positiveIntRegex, ""));

    // 2. Determine the strict upper limit
    const maxAllowed = Math.min(
      posData.member?.points ?? 0, // Limit 1: Their wallet balance
      amountBeforePoints // Limit 2: The current bill
    );

    // 3. Cap the input
    const value = Math.min(rawValue, maxAllowed);

    setPosData((prev) => ({
      ...prev,
      points: value,
    }));
  };

  useEffect(() => {
    // If we have points applied...
    if (posData.points && posData.points > 0) {
      const maxAllowed = Math.min(
        posData.member?.points ?? 0,
        amountBeforePoints
      );

      // ...and the current points exceed the new limit (e.g. after removing an item)
      if (posData.points > maxAllowed) {
        setPosData((prev) => ({
          ...prev,
          points: maxAllowed, // Auto-reduce to the new max
        }));
      }
    }
  }, [amountBeforePoints, posData.points, posData.member?.points, setPosData]);

  const handleAmountPaidChange = (value: string | number) => {
    if (typeof value === "string") {
      setPosData((prev) => ({
        ...prev,
        amountPaid: Number(value.replace(positiveIntRegex, "")),
      }));
    }

    if (typeof value === "number") {
      setPosData((prev) => ({
        ...prev,
        amountPaid: value,
      }));
    }
  };

  const handleSelectMember = (member: PosCustomer) => {
    setPosData((prev) => ({
      ...prev,
      member,
      customerName: member.name,
      phone: member.phone,
    }));
  };

  const clearSelectedCustomer = () => {
    setPosData((prev) => ({
      ...prev,
      member: null,
      phone: "",
      customerName: "",
    }));
  };

  function clearPosData() {
    setPosData(initialData);
  }

  const toggleNewMember = () => {
    setPosData((prev) => ({
      ...prev,
      newMember: !prev.newMember,
    }));
  };

  const changeAmount = useMemo(
    () => Math.max(0, posData.amountPaid - totalAmountToBePaid),
    [posData.amountPaid, totalAmountToBePaid]
  );

  const customerNameValidation = posData.customerName.length <= 2;
  const amountPaidValidation = posData.amountPaid < totalAmountToBePaid;
  const phoneNumberValidation = posData.phone.length < 7;
  const voucherList = posData.voucherList;
  const points = posData.points;
  const { customerType, phone } = posData;

  const orderItems = posData.items.filter(
    (item) => item.itemType !== "voucher"
  );

  return {
    amountPaidValidation,
    customerNameValidation,
    posData,
    setPosData,
    toggleCart,
    totalItems,
    handleIncrementQuantity,
    handleDecrementQuantity,
    totalAmount,
    handleAddToCart,
    handleCustomerTypeChange,
    handlePaymentMethodChange,
    handleCustomerNameChange,
    handleAmountPaidChange,
    clearPosData,
    submitPosOrder,
    isPending,
    orderItems,
    customerType,
    isLoadingMembers,
    members,
    isFetchingMembers,
    handlePhoneChange,
    phone,
    handleSelectMember,
    clearSelectedCustomer,
    debouncedSearch,
    toggleNewMember,
    phoneNumberValidation,
    pointsEarned,
    totalDiscount,
    handleSelectVoucher,
    isSelectedVoucher,
    handleRemoveVoucher,
    totalAmountToBePaid,
    voucherList,
    togglePoint,
    changeAmount,
    handlePointChange,
    points,
  };
};
