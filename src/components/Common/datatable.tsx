import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

type DataTableProps<T> = {
  datatableHeads: string[];
  datatableBody: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
  onRowClick?: (item: T, index: number) => void;
  emptyComponent?: React.ReactNode;
};

const DataTable = <T,>({
  datatableHeads,
  datatableBody,
  renderRow,
  onRowClick,
  emptyComponent,
}: DataTableProps<T>) => {
  return (
    <Table>
      <TableHeader
        style={{
          backgroundColor: "#F5F5F5",
        }}
      >
        <TableRow className="text-[16px] font-medium">
          {datatableHeads.map((head: string) => (
            <TableHead key={head}>{head}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {datatableBody?.length === 0 ? (
          <TableRow>
            <td colSpan={datatableHeads.length} className="text-center py-6">
              {emptyComponent ?? (
                <span className="text-gray-500 text-sm font-bold">
                  No data available
                </span>
              )}
            </td>
          </TableRow>
        ) : (
          datatableBody?.map((item, index) => (
            <TableRow
              key={index}
              onClick={() => onRowClick?.(item, index)}
              className="font-medium text-sm"
            >
              {renderRow(item, index)}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
