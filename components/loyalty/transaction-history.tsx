"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockTransactions = [
  {
    id: "txn-1",
    type: "earned",
    description: "Order Completed - ID: O-ABC123",
    points: 320,
    date: "2024-11-08",
  },
  {
    id: "txn-2",
    type: "redeemed",
    description: "Voucher Redeemed - 10% Discount",
    points: -500,
    date: "2024-11-05",
  },
  {
    id: "txn-3",
    type: "earned",
    description: "Order Completed - ID: O-XYZ789",
    points: 450,
    date: "2024-11-02",
  },
  {
    id: "txn-4",
    type: "bonus",
    description: "Birthday Bonus",
    points: 200,
    date: "2024-10-28",
  },
  {
    id: "txn-5",
    type: "redeemed",
    description: "Voucher Redeemed - Free Delivery",
    points: -750,
    date: "2024-10-25",
  },
  {
    id: "txn-6",
    type: "earned",
    description: "Order Completed - ID: O-DEF456",
    points: 280,
    date: "2024-10-20",
  },
];

export function TransactionHistory() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "earned":
        return "bg-green-100 text-green-800";
      case "redeemed":
        return "bg-orange-100 text-orange-800";
      case "bonus":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "earned":
        return "Earned";
      case "redeemed":
        return "Redeemed";
      case "bonus":
        return "Bonus";
      default:
        return type;
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Points</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTransactions.map((txn) => (
            <TableRow className="hover:bg-muted/50" key={txn.id}>
              <TableCell>
                <Badge className={getTypeColor(txn.type)} variant="outline">
                  {getTypeLabel(txn.type)}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">{txn.description}</TableCell>
              <TableCell
                className={`text-right font-semibold ${txn.points > 0 ? "text-green-600" : "text-red-600"}`}
              >
                {txn.points > 0 ? "+" : ""}
                {txn.points.toLocaleString()}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {new Date(txn.date).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
