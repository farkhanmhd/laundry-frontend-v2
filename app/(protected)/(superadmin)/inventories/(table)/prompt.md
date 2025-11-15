based on my database schema (use mock data):

For superadmin and admin:

- add services/:id page
- add vouchers/:id page
- add list of /users page (table)
- add list of /members page (table)
- add /members/new page
- add list of /pickups page (table)
- add /pickups/:id page. use fake location image for map
- add list of /orders page (table) with action and modal to update the status
- add /orders/:id page
- create /admin-dashboard page (for admin only)

For user:

- create /menu page that contains
- create /my-addresses page
- create /my-addresses/new page (use fake location image for map)
- create /profile page
- create /my-orders page
- create /my-orders/new page
- create /my-orders/:id page
- create /my-orders/:id/payment page
- create /my-deliveries page
- create /my-deliveries/new page
- create /customer-dashboard page

for table views, the component below for reference. for designs view uploaded image files. for css use globals.css file

example usage for table page

```typescript
import { TableView } from "@/components/table/table-view";
import { getInventories } from "../data";

const ProductsPage = async () => {
  const data = await getInventories();

  return <TableView data={data} />;
};

export default ProductsPage;
```

on layout table page

```typescript
import { Plus } from "lucide-react";
import Link from "next/link";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { columns } from "../components/columns";

const ProductsLayout = ({ children }: { children: React.ReactNode }) => (
  <TableProvider columns={columns}>
    <TableToolbar>
      <Link className={cn(buttonVariants())} href='/inventories/new'>
        <Plus />
        Inventory
      </Link>
    </TableToolbar>
    {children}
    <TablePagination />
  </TableProvider>
);

export default ProductsLayout;
```

table loading.tsx

```typescript
import { TableSkeleton } from "@/components/table/table-skeleton";

const Loading = () => <TableSkeleton />;

export default Loading;
```

Table components

```typescript
"use client";

import type { ColumnDef, Table } from "@tanstack/react-table";

import { createContext, type Dispatch, type ReactNode, type SetStateAction, useContext } from "react";
import { useTable } from "./state"; // Your generic hook

// 1. Define the shape of the context
// We make it generic and use the precise types from your hook
interface TableContextType<T> {
  table: Table<T>;
  globalFilter: string;
  // This type is inferred from useSearchQueryParams
  setGlobalFilter: (
    value: string | ((old: string) => string | null) | null,
    options?: unknown, // You can tighten this if you know the 'options' type
  ) => Promise<URLSearchParams>;
  // This type is from useState
  setInternalData: Dispatch<SetStateAction<T[]>>;
  columns: ColumnDef<T, unknown>[];
}

// 2. Create the context
// [THE FIX] Type the context itself as 'unknown'.
// This is the standard, safe alternative to 'any'.
const TableContext = createContext<unknown | undefined>(undefined);

// 3. Create the Provider component
interface TableProviderProps<T extends { id: string }> {
  children: ReactNode;
  columns: ColumnDef<T, unknown>[];
}

export function TableProvider<T extends { id: string }>({ children, columns }: TableProviderProps<T>) {
  // This hook is generic and correctly infers 'T'
  const { table, globalFilter, setGlobalFilter, setInternalData } = useTable({
    columns,
  });

  // 'value' has the specific type: TableContextType<T>
  const value = {
    table,
    globalFilter,
    setGlobalFilter,
    columns,
    setInternalData,
  };

  // This works because any specific type (TableContextType<T>)
  // is assignable to 'unknown'.
  return (
    <TableContext.Provider value={value}>
      <div className='flex h-full flex-col'>{children}</div>
    </TableContext.Provider>
  );
}

// 4. Create a generic custom hook to consume the context
export function useTableContext<T extends { id: string }>() {
  // [THE FIX] The context is 'unknown | undefined'
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }

  // [THE FIX] We perform an explicit cast from 'unknown' to our
  // specific generic type. This is the one, necessary trade-off.
  return context as TableContextType<T>;
}

import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({ column, title, className }: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const sortedIcon = {
    asc: <ArrowUp />,
    desc: <ArrowDown />,
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='-ml-3 h-8 data-[state=open]:bg-accent' size='sm' variant='ghost'>
            <span>{title}</span>
            {column.getIsSorted() ? sortedIcon[column.getIsSorted() as keyof typeof sortedIcon] : <ChevronsUpDown />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp className='h-3.5 w-3.5 text-muted-foreground/70' />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown className='h-3.5 w-3.5 text-muted-foreground/70' />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className='h-3.5 w-3.5 text-muted-foreground/70' />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

import type { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQueryParams } from "@/hooks/use-query-params";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { setQuery, removeQuery } = useQueryParams(params);
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <div className='flex items-center justify-between px-2'>
      <div className='hidden flex-1 text-muted-foreground text-sm md:block'>
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <span>
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
          </span>
        ) : (
          <span className='line-clamp-1'>Showing {table.getRowModel().rows.length} row(s).</span>
        )}
      </div>
      <div className='flex w-full items-center justify-between space-x-6 md:w-auto lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <Select
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              table.setPageIndex(0);

              if (value === "50") {
                removeQuery("rows");
              } else {
                setQuery("rows", value);
              }
              removeQuery("page");
              replace(`${pathname}?${params.toString()}`);
            }}
            value={`${table.getState().pagination.pageSize}`}
          >
            <SelectTrigger className='w-[70px] rounded-none border-y-0 dark:bg-background'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='hidden w-[100px] items-center justify-center font-medium text-sm md:flex'>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className='flex items-center'>
          <Button className='hidden rounded-none p-0 lg:flex' disabled={!table.getCanPreviousPage()} onClick={() => table.setPageIndex(0)} variant='ghost'>
            <span className='sr-only'>Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button className='rounded-none p-0' disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} variant='ghost'>
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button className='rounded-none p-0' disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} variant='ghost'>
            <span className='sr-only'>Go to next page</span>
            <ChevronRight />
          </Button>
          <Button className='hidden rounded-none p-0 lg:flex' disabled={!table.getCanNextPage()} onClick={() => table.setPageIndex(table.getPageCount() - 1)} variant='ghost'>
            <span className='sr-only'>Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

("use client");

import type { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props<TData> = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  table: Table<TData>;
  className?: string;
};

export const DataTableSearch = <TData>({ value, onChange, placeholder = "Search all columns...", table, className }: Props<TData>) => {
  const handleTableSearchChange = (searchQuery: string) => {
    onChange(searchQuery);
    table.firstPage();
  };
  return (
    <div className='flex w-full items-center gap-2 px-0 md:px-3'>
      <Search className='hidden size-5 text-muted-foreground/60 md:block dark:text-muted' />
      <Input className={cn("bg-background", className)} onChange={(e) => handleTableSearchChange(e.target.value)} placeholder={placeholder} value={value ?? ""} />
    </div>
  );
};

("use client");

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import type { Table } from "@tanstack/react-table";
import { Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='flex rounded-none border-l' variant='ghost'>
          <Settings2 />
          <span className='hidden md:block'>Column</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[150px]'>
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
          .map((column) => (
            <DropdownMenuCheckboxItem checked={column.getIsVisible()} className='capitalize' key={column.id} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { type ColumnDef, flexRender, type Table as TableType } from "@tanstack/react-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

type Props<TData, TValue> = {
  table: TableType<TData>;
  columns: ColumnDef<TData, TValue>[];
  selectableRows?: boolean;
  className?: string;
};

const DataTable = <TData, TValue>({ table, columns, selectableRows = false, className }: Props<TData, TValue>) => (
  <ScrollArea className={cn("relative border-y [&>div>div]:h-full", className)}>
    <Table>
      <TableHeader className='sticky top-0 z-50 bg-background'>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead className='px-4' key={header.id}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              className={cn({
                "cursor-pointer": selectableRows,
              })}
              data-state={row.getIsSelected() && "selected"}
              key={row.id}
              onClick={() => selectableRows && row.toggleSelected()}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell className='px-4' key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow className='h-full'>
            <TableCell className='text-center' colSpan={columns.length}>
              No results found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    <ScrollBar orientation='horizontal' />
  </ScrollArea>
);

export default DataTable;

("use client");

import { useTableContext } from "@/components/table/context";
import { DataTablePagination } from "@/components/table/data-table-pagination";

export function TablePagination() {
  const { table } = useTableContext();
  return <DataTablePagination table={table} />;
}

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { MapItems } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export const TableSkeleton = () => {
  const arrays = Array.from({ length: 5 });
  return (
    <ScrollArea className='flex-1 border-y'>
      <Table>
        <TableHeader className='sticky top-0 z-50 bg-background'>
          <TableRow>
            <MapItems
              of={arrays}
              render={(_, thIndex) => (
                <TableHead key={`thi-${thIndex}`}>
                  <Skeleton className='h-8' />
                </TableHead>
              )}
            />
          </TableRow>
        </TableHeader>
        <TableBody>
          <MapItems
            of={arrays}
            render={(_, tbIndex) => (
              <TableRow key={`thi-${tbIndex}`}>
                <MapItems
                  of={arrays}
                  render={(__, trIndex) => (
                    <TableCell key={`thi-${trIndex}`}>
                      <Skeleton className='h-15' />
                    </TableCell>
                  )}
                />
              </TableRow>
            )}
          />
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

("use client");

import { X } from "lucide-react";
import type React from "react";
import { useTableContext } from "@/components/table/context";
import { DataTableSearch } from "@/components/table/data-table-search";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import { Button } from "@/components/ui/button";

type Props = {
  children: React.ReactNode;
  searchPlaceholder?: string;
};

export function TableToolbar({ children, searchPlaceholder = "Search..." }: Props) {
  const { table, globalFilter, setGlobalFilter } = useTableContext();
  const isFiltered = table.getState().columnFilters.length > 0 || !!globalFilter;

  return (
    <div className='flex w-full items-center'>
      <DataTableSearch className='rounded-none border-none dark:bg-background' onChange={setGlobalFilter} placeholder={searchPlaceholder} table={table} value={globalFilter} />
      {isFiltered && (
        <Button
          className='rounded-none px-2 lg:px-3'
          onClick={() => {
            table.resetColumnFilters();
            setGlobalFilter("");
          }}
          variant='ghost'
        >
          <X />
        </Button>
      )}
      <div className='ml-auto flex max-w-max'>
        <DataTableViewOptions table={table} />
        {children}
      </div>
    </div>
  );
}

("use client");

import { useEffect } from "react";
import { useTableContext } from "@/components/table/context";
import DataTable from "@/components/table/data-table";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface ProductsTableProps<TData extends { id: string }> {
  data: TData[] | undefined;
}

export const TableView = <TData extends { id: string }>({ data }: ProductsTableProps<TData>) => {
  const { table, setInternalData, columns } = useTableContext();
  const { open } = useSidebar();

  useEffect(() => {
    if (data) {
      setInternalData(data);
    }
  }, [data, setInternalData]);

  return (
    <DataTable
      className={cn("max-w-svw flex-1 duration-200 md:max-w-[calc(100svw-66px)]", {
        "md:max-w-[calc(100svw-256px)]": open,
        "md:max-w-[calc(100svw-66px)]": !open,
      })}
      columns={columns}
      table={table}
    />
  );
};
```
