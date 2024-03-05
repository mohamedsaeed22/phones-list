import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch ,useSelector } from "react-redux";
import { getAllData } from "../store/dictionary-slice";

// const d = [
//   {
//     id: "3176474d-6efb-484a-95e0-08dc3cf51453",
//     name: "ضبعة",
//     departments: [
//       {
//         id: "112fda0f-ce5a-44b0-3a7a-08dc3cf896b1",
//         name: "Dep 1",
//         sectorId: "3176474d-6efb-484a-95e0-08dc3cf51453",
//         offices: [
//           {
//             id: "2c7b98f6-699a-4d14-a60e-08dc3cf9b878",
//             name: "office 1",
//             phoneNumber: "",
//             notes: null,
//             departmentId: "112fda0f-ce5a-44b0-3a7a-08dc3cf896b1",
//           },
//           {
//             id: "b49c175d-5de1-45a2-a60f-08dc3cf9b878",
//             name: "office 2",
//             phoneNumber: "",
//             notes: null,
//             departmentId: "112fda0f-ce5a-44b0-3a7a-08dc3cf896b1",
//           },
//           {
//             id: "322f4380-aa89-461b-a610-08dc3cf9b878",
//             name: "office 3",
//             phoneNumber: "",
//             notes: null,
//             departmentId: "112fda0f-ce5a-44b0-3a7a-08dc3cf896b1",
//           },
//           {
//             id: "e88632cf-41d4-4387-a611-08dc3cf9b878",
//             name: "office 4",
//             phoneNumber: "",
//             notes: null,
//             departmentId: "112fda0f-ce5a-44b0-3a7a-08dc3cf896b1",
//           },
//           {
//             id: "f1d91762-ab53-46ee-a612-08dc3cf9b878",
//             name: "office 5",
//             phoneNumber: "",
//             notes: null,
//             departmentId: "112fda0f-ce5a-44b0-3a7a-08dc3cf896b1",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "3176474d-6efb-484a-95e0-08dc3cf51453",
//     name: "ضبعة",
//     departments: [
//       {
//         id: "112fda0f-ce5a-44b0-3a7a-08dc3cf896b1",
//         name: "Dep 1",
//         sectorId: "3176474d-6efb-484a-95e0-08dc3cf51453",
//         offices: [
//           {
//             id: "2c7b98f6-699a-4d14-a60e-08dc3cf9b878",
//             name: "office 1",
//             phoneNumber: "",
//             notes: null,
//             departmentId: "112fda0f-ce5a-44b0-3a7a-08dc3cf896b1",
//           },
//           {
//             id: "b49c175d-5de1-45a2-a60f-08dc3cf9b878",
//             name: "office 2",
//             phoneNumber: "",
//             notes: null,
//             departmentId: "112fda0f-ce5a-44b0-3a7a-08dc3cf896b1",
//           },
//           {
//             id: "322f4380-aa89-461b-a610-08dc3cf9b878",
//             name: "office 3",
//             phoneNumber: "",
//             notes: null,
//             departmentId: "112fda0f-ce5a-44b0-3a7a-08dc3cf896b1",
//           },
//           {
//             id: "e88632cf-41d4-4387-a611-08dc3cf9b878",
//             name: "office 4",
//             phoneNumber: "",
//             notes: null,
//             departmentId: "112fda0f-ce5a-44b0-3a7a-08dc3cf896b1",
//           },
//           {
//             id: "f1d91762-ab53-46ee-a612-08dc3cf9b878",
//             name: "office 5",
//             phoneNumber: "",
//             notes: null,
//             departmentId: "112fda0f-ce5a-44b0-3a7a-08dc3cf896b1",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "3176474d-6efb-484a-95e0-08dc3cf51453",
//     name: "ضبعة",
//     departments: [
//       {
//         id: "112fda0f-ce5a-44b0-3a7a-08dc3cf896b1",
//         name: "Dep 1",
//         sectorId: "3176474d-6efb-484a-95e0-08dc3cf51453",
//         offices: [
//           {
//             id: "2c7b98f6-699a-4d14-a60e-08dc3cf9b878",
//             name: "office 1",
//             phoneNumber: "",
//             notes: null,
//             departmentId: "112fda0f-ce5a-44b0-3a7a-08dc3cf896b1",
//           },
//           {
//             id: "b49c175d-5de1-45a2-a60f-08dc3cf9b878",
//             name: "office 2",
//             phoneNumber: "",
//             notes: null,
//             departmentId: "112fda0f-ce5a-44b0-3a7a-08dc3cf896b1",
//           },
//           {
//             id: "322f4380-aa89-461b-a610-08dc3cf9b878",
//             name: "office 3",
//             phoneNumber: "",
//             notes: null,
//             departmentId: "112fda0f-ce5a-44b0-3a7a-08dc3cf896b1",
//           },
//           {
//             id: "e88632cf-41d4-4387-a611-08dc3cf9b878",
//             name: "office 4",
//             phoneNumber: "",
//             notes: null,
//             departmentId: "112fda0f-ce5a-44b0-3a7a-08dc3cf896b1",
//           },
//           {
//             id: "f1d91762-ab53-46ee-a612-08dc3cf9b878",
//             name: "office 5",
//             phoneNumber: "",
//             notes: null,
//             departmentId: "112fda0f-ce5a-44b0-3a7a-08dc3cf896b1",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "8de160a1-fccd-49ab-a1d3-08dc3cf9cd2f",
//     name: "sector 2",
//     departments: [
//       {
//         id: "6e7f19ee-db6b-4a14-909b-08dc3cf9de98",
//         name: "Dep 2",
//         sectorId: "8de160a1-fccd-49ab-a1d3-08dc3cf9cd2f",
//         offices: [],
//       },
//       {
//         id: "9196b756-e1d7-4a40-909c-08dc3cf9de98",
//         name: "Dep 3",
//         sectorId: "8de160a1-fccd-49ab-a1d3-08dc3cf9cd2f",
//         offices: [],
//       },
//     ],
//   },
// ];
const columns = [
  { field: "id", headerName: "م", width: 20 },
  { field: "name", headerName: "القطاع", width: 200 },
  { field: "department", headerName: "الاداره", width: 200 },
  { field: "office", headerName: "المكتب", width: 200 },
  { field: "phoneNumber", headerName: "الرقم", width: 200 },
  { field: "notes", headerName: "ملاحظات", width: 200 },
];

const flattenData = (data) => {
  const flattenedData = [];
  let idCounter = 1;

  data.forEach((sector) => {
    sector.departments.forEach((department) => {
      const offices = department.offices.length ? department.offices : [{}];

      offices.forEach((office) => {
        flattenedData.push({
          id: idCounter++,
          name: sector.name || "",
          department: department.name || "",
          office: office.name || "",
          phoneNumber: office.phoneNumber || "",
          notes: office.notes || "",
        });
      });
    });
  });

  return flattenedData;
};

const PhonesTable = () => {
  const dispath = useDispatch();
  const {data} = useSelector((state) => state.data);
  console.log(data);

  useEffect(()=>{
    dispath(getAllData())
  },[dispath])

  const rows = flattenData(data && data);

  return (
    <div style={{ minHeight: "100%", width: "100%", paddingInline: "8px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 12 },
          },
        }}
        pageSizeOptions={[5, 10]}
        columnBuffer={3}
      />
    </div>
  );
};

export default PhonesTable;
