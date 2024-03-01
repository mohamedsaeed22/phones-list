import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  borderRight: "1px solid #ddd",
}));

const data = [
  {
    sector: "الضبعه",
    departments: [
      {
        name: "اداره النظم",
        offices: [
          { office: "مكتب البرمجيات", number: "1102", notes: "notes" },
          { office: "مكتب الشبكات", number: "1101", notes: "notes" },
        ],
      },
      {
        name: "ادارى السعوديه",
        offices: [
          { office: "مدير الجهاز", number: "1001", notes: "notes" },
          { office: "مدير الجهاز", number: "1002", notes: "notes" },
        ],
      },
      {
        name: "مدير الاداره المركزيه",
        offices: [
          { office: "مدير الاداره المركزيه", number: "1010", notes: "notes" },
          { office: "مدير الاداره المركزيه", number: "1011", notes: "notes" },
        ],
      },
      {
        name: "قائد فوج المقر",
        offices: [{ office: "قائد فوج المقر", number: "1200", notes: "notes" }],
      },
    ],
  },
];

export default function PhonesTable() {
  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: "90vh", overflowY: "auto" }}
    >
      <Table  aria-label="spanning table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">القطاع</StyledTableCell>
            <StyledTableCell align="center">اداره / قرع / قسم</StyledTableCell>
            <StyledTableCell align="center">المكتب</StyledTableCell>
            <StyledTableCell align="center">الرقم</StyledTableCell>
            <StyledTableCell align="center">ملاحظات</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          
          <TableRow>
            <StyledTableCell align="center" rowSpan={7}>
              الضبعه
            </StyledTableCell>
            <StyledTableCell align="center" rowSpan={2}>
              اداره النظم
            </StyledTableCell>
            <StyledTableCell align="center">مكتب البرمجيات</StyledTableCell>
            <StyledTableCell align="center">1102</StyledTableCell>
            <StyledTableCell align="center">notes</StyledTableCell>
          </TableRow>

          <TableRow>
            <StyledTableCell align="center">مكتب الشبكات</StyledTableCell>
            <StyledTableCell align="center">1101</StyledTableCell>
            <StyledTableCell align="center">notes</StyledTableCell>
          </TableRow>

          <TableRow>
            <StyledTableCell align="center" rowSpan={5}>
              ادارى السعوديه
            </StyledTableCell>
            <StyledTableCell align="center" rowSpan={2}>
              مدير الجهاز
            </StyledTableCell>
            <StyledTableCell align="center">1001</StyledTableCell>
            <StyledTableCell align="center">notes</StyledTableCell>
          </TableRow>

          <TableRow>
            <StyledTableCell align="center">1002</StyledTableCell>
            <StyledTableCell align="center">notes</StyledTableCell>
          </TableRow>

          <TableRow>
            <StyledTableCell align="center" rowSpan={2}>
              مدير الاداره المركزيه
            </StyledTableCell>
            <StyledTableCell align="center">1010</StyledTableCell>
            <StyledTableCell align="center">notes</StyledTableCell>
          </TableRow>

          <TableRow>
            <StyledTableCell align="center">1011</StyledTableCell>
            <StyledTableCell align="center">notes</StyledTableCell>
          </TableRow>

          <TableRow>
            <StyledTableCell align="center">قائد فوج المقر</StyledTableCell>
            <StyledTableCell align="center">1200</StyledTableCell>
            <StyledTableCell align="center">notes</StyledTableCell>
          </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
}
