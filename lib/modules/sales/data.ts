import { headers } from "next/headers";
import { elysia } from "@/elysia";
import type { SearchQuery } from "@/lib/search-params";
import type { DateRangeSearchParams } from "@/lib/utils";

export type BestSellersQuery = SearchQuery &
  DateRangeSearchParams & {
    item_id?: string[] | undefined;
    item_type?: string[] | undefined;
  };

export type SalesByOrderQuery = SearchQuery &
  DateRangeSearchParams & {
    payment_type?: string[] | undefined;
  };

export abstract class SalesApi {
  /**
   * Helper to get common fetch headers (Authorization, etc.)
   */
  private static async getConfig() {
    return {
      fetch: {
        headers: await headers(),
      },
    };
  }

  /**
   * GET /sales/net-revenue
   */
  static async getNetRevenue(query: DateRangeSearchParams) {
    const { data: response, error } = await elysia.sales["net-revenue"].get({
      query,
      ...(await SalesApi.getConfig()),
    });

    if (error) {
      throw error;
    }
    return response?.data;
  }

  /**
   * GET /sales/gross-revenue
   */
  static async getGrossRevenue(query: DateRangeSearchParams) {
    const { data: response, error } = await elysia.sales["gross-revenue"].get({
      query,
      ...(await SalesApi.getConfig()),
    });

    if (error) {
      throw error;
    }
    return response?.data;
  }

  /**
   * GET /sales/count
   */
  static async getTotalTransactions(query: DateRangeSearchParams) {
    const { data: response, error } = await elysia.sales.count.get({
      query,
      ...(await SalesApi.getConfig()),
    });

    if (error) {
      throw error;
    }
    return response?.data;
  }

  /**
   * GET /sales/average-value
   */
  static async getAverageOrderValue(query: DateRangeSearchParams) {
    const { data: response, error } = await elysia.sales["average-value"].get({
      query,
      ...(await SalesApi.getConfig()),
    });

    if (error) {
      throw error;
    }
    return response?.data;
  }

  /**
   * GET /sales/scorecard
   * Fetches all metrics in one optimized request.
   * Best for initial dashboard load.
   */
  static async getScorecardData(query: DateRangeSearchParams) {
    const { data: response, error } = await elysia.sales.scorecard.get({
      query,
      ...(await SalesApi.getConfig()),
    });

    if (error) {
      throw error;
    }
    return response?.data;
  }

  static async getChartData(query: DateRangeSearchParams) {
    const { data: response, error } = await elysia.sales.chart.get({
      query,
      ...(await SalesApi.getConfig()),
    });

    if (error) {
      throw error;
    }
    return response?.data ?? [];
  }

  static async getBestSellers(query: BestSellersQuery) {
    const { data: response, error } = await elysia.sales["best-sellers"].get({
      query,
      ...(await SalesApi.getConfig()),
    });

    if (error) {
      throw error;
    }

    return response?.data;
  }

  static async getItemOptions() {
    const { data: response, error } = await elysia.sales["item-options"].get({
      ...(await SalesApi.getConfig()),
    });

    if (error) {
      throw error;
    }

    return response?.data;
  }

  static async getSalesByOrders(query: SalesByOrderQuery) {
    const { data: response, error } = await elysia.sales["by-orders"].get({
      query,
      ...(await SalesApi.getConfig()),
    });

    if (error) {
      throw error;
    }

    return response?.data;
  }
}

type SalesApiType = typeof SalesApi;

export type BestSellerItem = Awaited<
  ReturnType<SalesApiType["getBestSellers"]>
>["items"][number];

export type SalesByOrder = Awaited<
  ReturnType<SalesApiType["getSalesByOrders"]>
>["items"][number];
