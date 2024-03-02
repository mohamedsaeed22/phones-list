import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import { Fragment, useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
    position: "sticky",
    top: 0,
    zIndex: 10,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  borderRight: "1px solid #ddd",
}));

const DUMMY_DATA = [
  {
    sector: "الضبعه",
    departments: [
      {
        name: "اداره النظم",
        offices: [
          {
            office: "مكتب البرمجيات",
            number: "1102",
            notes: "لا يوجد ملاحظات",
          },
          { office: "مكتب الشبكات", number: "1101", notes: "لا يوجد ملاحظات" },
        ],
      },
      {
        name: "ادارى السعوديه",
        offices: [
          { office: "مدير الجهاز", number: "1001", notes: "لا يوجد ملاحظات" },
          {
            office: "مدير الاداره المركزيه",
            number: "1010",
            notes: "لا يوجد ملاحظات",
          },
          {
            office: "قائد فوج المقر",
            number: "1200",
            notes: "لا يوجد ملاحظات",
          },
        ],
      },
    ],
  },
  {
    sector: "اللاهون",
    departments: [
      {
        name: "المساحه",
        offices: [
          { office: "مكتب التصميم", number: "2001", notes: "لا يوجد ملاحظات" },
          {
            office: "مكتب البحث والتطوير",
            number: "2002",
            notes: "لا يوجد ملاحظات",
          },
        ],
      },
      {
        name: "النظم",
        offices: [
          { office: "مدير النظم", number: "2101", notes: "لا يوجد ملاحظات" },
          { office: "مهندس شبكات", number: "2102", notes: "لا يوجد ملاحظات" },
        ],
      },
    ],
  },
];

function countObjects(dataArray) {
  let totalCount = 0;
  if (dataArray) {
    totalCount++;
    for (const departmentObj of dataArray.departments) {
      totalCount++;
      totalCount += departmentObj.offices.length;
    }
  }
  return totalCount;
}

export default function PhonesTable({ search }) {
  const [data, setData] = useState(DUMMY_DATA);

  const highlightText = (text) => {
    if (!search || search === "") {
      return text;
    }

    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(
      regex,
      (match) => `<span style="background-color: yellow;">${match}</span>`
    );
  };

  // Convert both search and data to lowercase for case-insensitive search
  // Filter the data based on the search input
  const lowerCaseSearch = search.toLowerCase();

  const filteredData = data.filter(
    (row) =>
      row.sector.toLowerCase().includes(lowerCaseSearch) ||
      row.departments.some(
        (dep) =>
          dep.name.toLowerCase().includes(lowerCaseSearch) ||
          dep.offices.some(
            (office) =>
              office.office.toLowerCase().includes(lowerCaseSearch) ||
              office.number.toLowerCase().includes(lowerCaseSearch) ||
              office.notes.toLowerCase().includes(lowerCaseSearch)
          )
      )
  );

  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: "90vh", overflowY: "auto" }}
    >
      <Table aria-label="spanning table">
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
          {filteredData.length === 0 ? (
            <TableRow>
              <StyledTableCell align="center" colSpan={5}>
                لا يوجد بيانات
              </StyledTableCell>
            </TableRow>
          ) : (
            filteredData?.map((row, index) => (
              <Fragment key={index}>
                <TableRow key={row}>
                  <StyledTableCell
                    align="center"
                    rowSpan={countObjects(data[index])}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: highlightText(row.sector),
                      }}
                    />
                  </StyledTableCell>
                </TableRow>
                {row?.departments?.map((dep) => (
                  <Fragment key={dep}>
                    <TableRow key={dep}>
                      <StyledTableCell
                        align="center"
                        rowSpan={dep.offices.length + 1}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: highlightText(dep.name),
                          }}
                        />
                      </StyledTableCell>
                    </TableRow>
                    {dep?.offices?.map((office) => (
                      <>
                        <TableRow key={office}>
                          <StyledTableCell align="center">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: highlightText(office.office),
                              }}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: highlightText(office.number),
                              }}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: highlightText(office.notes),
                              }}
                            />
                          </StyledTableCell>
                        </TableRow>
                      </>
                    ))}
                  </Fragment>
                ))}
              </Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
