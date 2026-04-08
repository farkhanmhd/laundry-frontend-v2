import { elysia } from "@/elysia";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchCustomerDeliveries = async (page: number = 1) => {
  const { data: response } = await elysia["customer-deliveries"].get({
    fetch: {
      credentials: "include",
    },
    query: {
      page,
    },
  });

  if (!response) {
    return {
      data: [],
      totalData: 0,
      totalPages: 0,
    };
  }

  return response;
};

type CustomerDeliveriesResponse = NonNullable<
  Awaited<ReturnType<typeof fetchCustomerDeliveries>>
>;
export type CustomerDelivery = CustomerDeliveriesResponse["data"][number];

export const useCustomerDeliveries = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["customer-deliveries"],
      queryFn: ({ pageParam = 1 }) => fetchCustomerDeliveries(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (lastPageParam < lastPage.totalPages) {
          return lastPageParam + 1;
        }
      },
    });

  return { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage };
};
