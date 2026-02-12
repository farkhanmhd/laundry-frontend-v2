import { headers } from "next/headers";
import { elysia } from "@/elysia";
import type { SearchQuery } from "@/lib/search-params";
import type { DateRangeSearchParams } from "@/lib/utils";

export type MemberReportsQuery = DateRangeSearchParams;

export type TotalCustomersResponse = {
  totalCustomers: number;
};

export type AverageOrderValueResponse = {
  averageOrderValue: number;
};

export type ActiveMembersResponse = {
  activeMembers: number;
};

export type TotalMemberOrdersResponse = {
  totalMemberOrders: number;
};

export abstract class MemberReportsApi {
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
   * GET /members/reports/total-customers
   * Returns total count of all customers (no date range needed)
   */
  static async getTotalCustomers() {
    const { data: response, error } = await elysia.members.reports[
      "total-customers"
    ].get({
      ...(await MemberReportsApi.getConfig()),
    });

    if (error) {
      throw error;
    }
    return response?.data;
  }

  /**
   * GET /members/reports/average-order-value
   * Returns average amount spent per order within date range
   */
  static async getAverageOrderValue(query: MemberReportsQuery) {
    const { data: response, error } = await elysia.members.reports[
      "average-order-value"
    ].get({
      query,
      ...(await MemberReportsApi.getConfig()),
    });

    if (error) {
      throw error;
    }
    return response?.data;
  }

  /**
   * GET /members/reports/active-members
   * Returns count of active members within date range
   */
  static async getActiveMember(query: MemberReportsQuery) {
    const { data: response, error } = await elysia.members.reports[
      "active-members"
    ].get({
      query,
      ...(await MemberReportsApi.getConfig()),
    });

    if (error) {
      throw error;
    }
    return response?.data;
  }

  /**
   * GET /members/reports/total-member-orders
   * Returns total number of member orders within date range
   */
  static async getTotalMemberOrders(query: MemberReportsQuery) {
    const { data: response, error } = await elysia.members.reports[
      "total-member-orders"
    ].get({
      query,
      ...(await MemberReportsApi.getConfig()),
    });

    if (error) {
      throw error;
    }
    return response?.data;
  }

  static async getMembersWithSpending(query: SearchQuery) {
    const { data: response, error } = await elysia.members.reports[
      "members-spending"
    ].get({
      query,
      ...(await MemberReportsApi.getConfig()),
    });

    if (error) {
      throw error;
    }
    return response?.data;
  }
}

export type MemberWithSpending = Awaited<
  ReturnType<typeof MemberReportsApi.getMembersWithSpending>
>["members"][number];
