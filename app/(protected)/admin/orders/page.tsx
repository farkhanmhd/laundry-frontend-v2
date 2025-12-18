import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableView } from "@/components/table/table-view";
import { ordersColumns } from "./columns";
import { mockOrders } from "./data";

const OrdersPage = () => (
  <TableProvider columns={ordersColumns}>
    <TableToolbar />
    <TableView data={mockOrders} />
    <TablePagination />
  </TableProvider>
);

export default OrdersPage;
