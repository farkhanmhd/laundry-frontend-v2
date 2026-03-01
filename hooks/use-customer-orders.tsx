import { elysia } from "@/elysia";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchCustomerOrders = async (page: number = 1) => {
  const { data: response } = await elysia.customerorders.get({
    fetch: {
      credentials: 'include'
    },
    query: {
      page
    }}
  )

  if (!response) {
    return {
      data: [],
      totalData: 0,
      totalPages: 0
    }
  }


  return response
}

type CustomerOrderResponse = NonNullable<Awaited<ReturnType<typeof fetchCustomerOrders>>>;
export type CustomerOrder = CustomerOrderResponse['data'][number];

export const useCustomerOrders = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['customer-orders'],
    queryFn: ({ pageParam = 1 }) => fetchCustomerOrders(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPageParam < lastPage.totalPages) {
        return lastPageParam + 1
      }
    },
  });

  return { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage };
};
