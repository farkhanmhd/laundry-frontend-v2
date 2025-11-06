import { MapItems } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Skeleton } from "../ui/skeleton";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";

export const TableSkeleton = () => {
  const arrays = Array.from({ length: 5 });
  return (
    <ScrollArea className='flex-1 border-y border-muted-foreground/60 dark:border-muted'>
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
