import { useTable, useSortBy } from "react-table";
import { Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import "antd/dist/antd.css";

const RTable = ({ columns, data}) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
        {
            columns,
            data,
        },
        useSortBy
    );

    return (
        <Table {...getTableProps()} variant="striped" colorScheme="red" marginBottom={100}>
            <Thead backgroundColor="#53B0AE">
                {headerGroups.map((headerGroup) => (
                    <Tr  {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <Th border="1px solid black" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render("Header")}{" "}
                                {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <Tr  {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <Td textAlign="center" border="1px solid black" padding={3} {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                </Td>
                            })}
                        </Tr>
                    );
                })}
            </Tbody>
        </Table>
    );
};

export default RTable;