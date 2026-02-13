import { elysia } from "@/elysia";
import { BaseApi } from "@/lib/modules/base-api";

// ----------------------------------------------------------------------
// Response Types
// ----------------------------------------------------------------------

export interface TotalItemsResponse {
  totalItems: number;
}

export interface LowStockItem {
  id: string;
  name: string;
  stock: number;
}

export type LowStockItemsResponse = LowStockItem[];

export interface TotalUsageResponse {
  totalUsage: number;
  from: string;
  to: string;
}

export interface AverageUsageResponse {
  averageUsagePerOrder: number;
  from: string;
  to: string;
}

// ----------------------------------------------------------------------
// Query Types
// ----------------------------------------------------------------------

export interface InventoryReportsQuery {
  from?: string;
  to?: string;
}

// ----------------------------------------------------------------------
// API Class
// ----------------------------------------------------------------------

export abstract class InventoryReportsApi extends BaseApi {
  /**
   * getConfig method is inherited from BaseApi
   */

  // ----------------------------------------------------------------------
  // 1. Total Items (No date range needed)
  // ----------------------------------------------------------------------

  static async getTotalItems(): Promise<TotalItemsResponse | null> {
    try {
      const { data: response } = await elysia.inventories.report[
        "total-items"
      ].get(await InventoryReportsApi.getConfig());

      return response?.data ?? null;
    } catch (error) {
      console.error("Failed to fetch total items:", error);
      return null;
    }
  }

  // ----------------------------------------------------------------------
  // 2. Low Stock Items (No date range needed)
  // ----------------------------------------------------------------------

  static async getLowStockItems(): Promise<LowStockItemsResponse | null> {
    try {
      const { data: response } = await elysia.inventories.report[
        "low-stock"
      ].get(await InventoryReportsApi.getConfig());

      return response?.data ?? null;
    } catch (error) {
      console.error("Failed to fetch low stock items:", error);
      return null;
    }
  }

  // ----------------------------------------------------------------------
  // 3. Total Usage (With date range)
  // ----------------------------------------------------------------------

  static async getTotalUsage(
    query: InventoryReportsQuery
  ): Promise<TotalUsageResponse | null> {
    try {
      const { data: response } = await elysia.inventories.report.usage.get({
        ...(await InventoryReportsApi.getConfig()),
        query,
      });

      return response?.data ?? null;
    } catch (error) {
      console.error("Failed to fetch total usage:", error);
      return null;
    }
  }

  // ----------------------------------------------------------------------
  // 4. Average Usage (With date range)
  // ----------------------------------------------------------------------

  static async getAverageUsage(
    query: InventoryReportsQuery
  ): Promise<AverageUsageResponse | null> {
    try {
      const { data: response } = await elysia.inventories.report[
        "average-usage"
      ].get({
        ...(await InventoryReportsApi.getConfig()),
        query,
      });

      return response?.data ?? null;
    } catch (error) {
      console.error("Failed to fetch average usage:", error);
      return null;
    }
  }
}
