import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "الرقم", width: 70 },
  { field: "firstName", headerName: "الاسم الأول", width: 130 },
  { field: "lastName", headerName: "اسم العائلة", width: 130 },
  {
    field: "age",
    headerName: "العمر",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "الاسم الكامل",
    description: "هذا العمود يحتوي على قيمة مسترجعة ولا يمكن فرزه.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "سنو", firstName: "جون", age: 35 },
  { id: 2, lastName: "لانيستر", firstName: "سيرسي", age: 42 },
  { id: 3, lastName: "لانيستر", firstName: "جايمي", age: 45 },
  { id: 4, lastName: "ستارك", firstName: "آريا", age: 16 },
  { id: 5, lastName: "تارجارين", firstName: "دانيريس", age: null },
  { id: 6, lastName: "ميليساندري", firstName: null, age: 150 },
  { id: 7, lastName: "كليفورد", firstName: "فيرارا", age: 44 },
  { id: 8, lastName: "فرانسيس", firstName: "روسيني", age: 36 },
  { id: 9, lastName: "روكسي", firstName: "هارفي", age: 65 },
];

export default function MyTable() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        localeText={{
          toolbarDensity: "كثافة",
          toolbarDensityLabel: "كثافة",
          toolbarDensityCompact: "مكثفة",
          toolbarDensityStandard: "معتدلة",
          toolbarDensityComfortable: "مريحة",
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
