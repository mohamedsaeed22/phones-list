import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../store/dictionary-slice";
import { Edit } from "@mui/icons-material";
import { CircularProgress, Typography, TextField, Button } from "@mui/material";
import EditPhone from "./EditPhone";
import MyModal from "./MyModal";

const mydata = [
  {
    id: "05387491-c91f-4dba-c329-08dc40286ad2",
    name: "الضبعة",
    departments: [
      {
        id: "01198d3d-9123-4903-5590-08dc40286ac8",
        name: "الأيسر",
        sectorId: "05387491-c91f-4dba-c329-08dc40286ad2",
        offices: [
          {
            id: "fc66037a-c5e1-4d6e-c8e0-08dc4036f15a",
            name: "السكرتارية ",
            phoneNumber: "1000",
            notes: "",
            departmentId: "01198d3d-9123-4903-5590-08dc40286ac8",
          },
        ],
      },
      {
        id: "0db0afa0-7fb0-4402-5596-08dc40286ac8",
        name: "الأيسر",
        sectorId: "05387491-c91f-4dba-c329-08dc40286ad2",
        offices: [
          {
            id: "39dba0e1-90c3-45f9-c8eb-08dc4036f15a",
            name: "مدير الإدارة المركزية",
            phoneNumber: "10101011",
            notes: "لواء طيار/ حازم يحيي",
            departmentId: "0db0afa0-7fb0-4402-5596-08dc40286ac8",
          },
          {
            id: "fa0ee380-4c4a-4a94-c8ec-08dc4036f15a",
            name: "مدير الأنتاج الحيوانى",
            phoneNumber: "1081",
            notes: "لواء/ سامح",
            departmentId: "0db0afa0-7fb0-4402-5596-08dc40286ac8",
          },
          {
            id: "efa3dab8-b645-41da-c8ed-08dc4036f15a",
            name: "قائد فوج المقر",
            phoneNumber: "1200",
            notes: "عميد/ محمد السنبيسى",
            departmentId: "0db0afa0-7fb0-4402-5596-08dc40286ac8",
          },
          {
            id: "f0792ae3-4995-4e3f-c8ee-08dc4036f15a",
            name: "فرع إعداد دولة",
            phoneNumber: "1070",
            notes: "",
            departmentId: "0db0afa0-7fb0-4402-5596-08dc40286ac8",
          },
          {
            id: "cb2b2199-8df3-41d7-c8ef-08dc4036f15a",
            name: "السكرتارية العسكرية",
            phoneNumber: "1080",
            notes: "",
            departmentId: "0db0afa0-7fb0-4402-5596-08dc40286ac8",
          },
          {
            id: "3c035c5c-22ed-4115-c8f0-08dc4036f15a",
            name: "الإدارة الزراعية",
            phoneNumber: "1253",
            notes: "",
            departmentId: "0db0afa0-7fb0-4402-5596-08dc40286ac8",
          },
          {
            id: "58d1994c-a5df-402f-c8f1-08dc4036f15a",
            name: "الشئون القانونية",
            phoneNumber: "1261",
            notes: "أ/ زياد عبدالرحيم",
            departmentId: "0db0afa0-7fb0-4402-5596-08dc40286ac8",
          },
          {
            id: "dae6dad2-2ca0-4559-c8f2-08dc4036f15a",
            name: "مدير التنمية الزراعية",
            phoneNumber: "1256",
            notes: "م/ أحمد عمار",
            departmentId: "0db0afa0-7fb0-4402-5596-08dc40286ac8",
          },
        ],
      },
      {
        id: "8d81154e-b0e8-400a-5597-08dc40286ac8",
        name: "الأيمن",
        sectorId: "05387491-c91f-4dba-c329-08dc40286ad2",
        offices: [
          {
            id: "70b40898-855e-4934-c8f3-08dc4036f15a",
            name: "مدير الجهاز",
            phoneNumber: "1001",
            notes: "عقيد طيار/ بهاء الغنام",
            departmentId: "8d81154e-b0e8-400a-5597-08dc40286ac8",
          },
          {
            id: "f5bbf664-8c9b-452b-c8f4-08dc4036f15a",
            name: "مدير إدارة المتابعة",
            phoneNumber: "1040",
            notes: "مقدم / أحمد جمال",
            departmentId: "8d81154e-b0e8-400a-5597-08dc40286ac8",
          },
        ],
      },
      {
        id: "dd7347c9-bde2-42d1-5598-08dc40286ac8",
        name: "الهندسية",
        sectorId: "05387491-c91f-4dba-c329-08dc40286ad2",
        offices: [
          {
            id: "29472bbc-8c75-4fdf-c8f5-08dc4036f15a",
            name: "مدير الإدارة الهندسية",
            phoneNumber: "1500",
            notes: "لواء/ خالد صلاح",
            departmentId: "dd7347c9-bde2-42d1-5598-08dc40286ac8",
          },
          {
            id: "627a8b00-7c6d-4e93-c8f6-08dc4036f15a",
            name: "رئيس فرع المشروعات",
            phoneNumber: "1090",
            notes: "مقدم طيار/ عمرو الشرقاوى",
            departmentId: "dd7347c9-bde2-42d1-5598-08dc40286ac8",
          },
          {
            id: "54a20998-8123-4f3a-c8f7-08dc4036f15a",
            name: "متابعة رئيس فرع المشروعات",
            phoneNumber: "1510",
            notes: "رائد / اسلام جبر",
            departmentId: "dd7347c9-bde2-42d1-5598-08dc40286ac8",
          },
          {
            id: "f209c76e-bcb0-48cd-c8f8-08dc4036f15a",
            name: "الفرع الهندسى",
            phoneNumber: "1511",
            notes: "م/ محمد مديح",
            departmentId: "dd7347c9-bde2-42d1-5598-08dc40286ac8",
          },
          {
            id: "2be3a59c-f02a-4b31-c8f9-08dc4036f15a",
            name: "فرع الطرق",
            phoneNumber: "1512",
            notes: "",
            departmentId: "dd7347c9-bde2-42d1-5598-08dc40286ac8",
          },
          {
            id: "3de8ad82-7be2-42a3-c8fa-08dc4036f15a",
            name: "رئيس فرع الإنشاءات",
            phoneNumber: "1513",
            notes: "م/ أحمد منسى",
            departmentId: "dd7347c9-bde2-42d1-5598-08dc40286ac8",
          },
          {
            id: "ada8096c-7212-401d-c8fb-08dc4036f15a",
            name: "DC الإنشاءات",
            phoneNumber: "1514",
            notes: "",
            departmentId: "dd7347c9-bde2-42d1-5598-08dc40286ac8",
          },
        ],
      },
      {
        id: "1da48bca-c4f9-4a61-5599-08dc40286ac8",
        name: "فرع نظم المعلومات",
        sectorId: "05387491-c91f-4dba-c329-08dc40286ad2",
        offices: [
          {
            id: "983aa125-2429-402a-c8fc-08dc4036f15a",
            name: "رئيس فرع النظم والمعلومات",
            phoneNumber: "1100",
            notes: "",
            departmentId: "1da48bca-c4f9-4a61-5599-08dc40286ac8",
          },
          {
            id: "e65733cb-196a-4ce3-c8fd-08dc4036f15a",
            name: "شبكات ",
            phoneNumber: "1101",
            notes: "",
            departmentId: "1da48bca-c4f9-4a61-5599-08dc40286ac8",
          },
          {
            id: "97a34852-5da5-4f30-c8fe-08dc4036f15a",
            name: "شبكات2",
            phoneNumber: "1105",
            notes: "",
            departmentId: "1da48bca-c4f9-4a61-5599-08dc40286ac8",
          },
          {
            id: "19b0657c-248c-4ec4-c8ff-08dc4036f15a",
            name: "ورشة الصيانة",
            phoneNumber: "1106",
            notes: "",
            departmentId: "1da48bca-c4f9-4a61-5599-08dc40286ac8",
          },
          {
            id: "60016e05-7053-4063-c900-08dc4036f15a",
            name: "البرمجيات",
            phoneNumber: "1107",
            notes: "",
            departmentId: "1da48bca-c4f9-4a61-5599-08dc40286ac8",
          },
        ],
      },
    ],
  },
  {
    id: "0b7f4279-306e-49ad-c32a-08dc40286ad2",
    name: "دار القوات الجوية 1",
    departments: [
      {
        id: "77fd85ce-9c99-4ffe-5591-08dc40286ac8",
        name: "مبنى مدير الجهاز",
        sectorId: "0b7f4279-306e-49ad-c32a-08dc40286ad2",
        offices: [
          {
            id: "5a4c46b6-f34f-4c43-c8e1-08dc4036f15a",
            name: "مدير الجهاز",
            phoneNumber: "1003",
            notes: "مهندس اسماعيل / محمد",
            departmentId: "77fd85ce-9c99-4ffe-5591-08dc40286ac8",
          },
          {
            id: "d2853b26-04f8-42cb-c8e2-08dc4036f15a",
            name: "السكرتارية",
            phoneNumber: "1020",
            notes: "",
            departmentId: "77fd85ce-9c99-4ffe-5591-08dc40286ac8",
          },
          {
            id: "eeab52eb-eb09-43fd-c8e3-08dc4036f15a",
            name: "الإرشيف",
            phoneNumber: "1030",
            notes: "",
            departmentId: "77fd85ce-9c99-4ffe-5591-08dc40286ac8",
          },
        ],
      },
    ],
  },
  {
    id: "ee9f2ceb-aba2-4846-c32b-08dc40286ad2",
    name: "غرب القاهرة",
    departments: [
      {
        id: "b5db8686-530e-41b1-5592-08dc40286ac8",
        name: "القيادة",
        sectorId: "ee9f2ceb-aba2-4846-c32b-08dc40286ad2",
        offices: [
          {
            id: "646816ef-3eea-4130-c8e4-08dc4036f15a",
            name: "مدير الجهاز",
            phoneNumber: "1006",
            notes: "عقيد طيار / بهاء الغنام",
            departmentId: "b5db8686-530e-41b1-5592-08dc40286ac8",
          },
        ],
      },
      {
        id: "2b5aef3a-8659-4189-5593-08dc40286ac8",
        name: "القيادة",
        sectorId: "ee9f2ceb-aba2-4846-c32b-08dc40286ad2",
        offices: [
          {
            id: "fabd163b-7f4b-4555-c8e5-08dc4036f15a",
            name: "قائد قطاع غرب",
            phoneNumber: "1600",
            notes: "مقدم طيار / على علام",
            departmentId: "2b5aef3a-8659-4189-5593-08dc40286ac8",
          },
        ],
      },
      {
        id: "9cedb4dc-bd9c-44d1-5594-08dc40286ac8",
        name: "الماليات",
        sectorId: "ee9f2ceb-aba2-4846-c32b-08dc40286ad2",
        offices: [
          {
            id: "cfbf3687-87c9-40cf-c8e6-08dc4036f15a",
            name: "مدير نشاط التعدين",
            phoneNumber: "1111",
            notes: "مقدم طيار / كريم كفافى",
            departmentId: "9cedb4dc-bd9c-44d1-5594-08dc40286ac8",
          },
          {
            id: "e9d6f064-a922-4609-c8e7-08dc4036f15a",
            name: "رئيس فرع الإستثمار",
            phoneNumber: "1601",
            notes: "أ / محمد دسوقى",
            departmentId: "9cedb4dc-bd9c-44d1-5594-08dc40286ac8",
          },
          {
            id: "6dc8a457-4c09-4879-c8e8-08dc4036f15a",
            name: "نظم نشاط التعدين",
            phoneNumber: "1602",
            notes: "",
            departmentId: "9cedb4dc-bd9c-44d1-5594-08dc40286ac8",
          },
          {
            id: "6f2f1502-064f-41ff-c8e9-08dc4036f15a",
            name: "مراجعة نشاط التعدين",
            phoneNumber: "1255",
            notes: "أ / تامر هلال",
            departmentId: "9cedb4dc-bd9c-44d1-5594-08dc40286ac8",
          },
        ],
      },
      {
        id: "b6369848-78b9-4e29-5595-08dc40286ac8",
        name: "المخازن",
        sectorId: "ee9f2ceb-aba2-4846-c32b-08dc40286ad2",
        offices: [
          {
            id: "7f2f25f2-ccf4-4044-c8ea-08dc4036f15a",
            name: "مخزن غرب ",
            phoneNumber: "1603",
            notes: "",
            departmentId: "b6369848-78b9-4e29-5595-08dc40286ac8",
          },
        ],
      },
    ],
  },
];
const flattenData = (data) => {
  const flattenedData = [];
  let idCounter = 1;
  data &&
    data?.forEach((sector) => {
      sector.departments?.forEach((department) => {
        const offices = department?.offices?.length ? department.offices : [{}];
        offices?.forEach((office) => {
          flattenedData.push({
            sectorId: sector.id,
            departmentId: department.id,
            officeId: office.id,
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

const PhonesTable = ({ search }) => {
  const dispath = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.data);
  const [filteredRows, setFilteredRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updatedValues, setUpdatedValues] = useState({});
  const [showPagination, setShowPagination] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const columns = useMemo(() => {
    const baseColumns = [
      { field: "id", headerName: "م", width: 20 },
      { field: "name", headerName: "القطاع", width: 200 },
      { field: "department", headerName: "الاداره", width: 200 },
      { field: "office", headerName: "المكتب", width: 200 },
      { field: "phoneNumber", headerName: "الرقم", width: 200 },
      { field: "notes", headerName: "ملاحظات", width: 200 },
    ];

    const actionsColumn = {
      field: "actions",
      headerName: "الاكشن",
      width: 100,
      print: false,
      renderCell: (params) => (
        <Edit
          className="actions-column" // Add class name here
          sx={{ color: "green", cursor: "pointer" }}
          onClick={() => handleEditClick(params.row)}
        />
      ),
    };

    return isAuthenticated ? [...baseColumns, actionsColumn] : baseColumns;
  }, [isAuthenticated]);

  const handleEditClick = (row) => {
    setUpdatedValues(row);
    setShowModal(true);
  };

  useEffect(() => {
    dispath(getAllData());
  }, [dispath]);

  useEffect(() => {
    if (!search) {
      setFilteredRows(flattenData(data.length > 0 && data));
    } else {
      const filteredData = flattenData(data).filter((row) =>
        columns.some((column) =>
          String(row[column.field]).toLowerCase().includes(search.toLowerCase())
        )
      );
      setFilteredRows(filteredData);
    }
  }, [data, search, columns]);

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <EditPhone
        open={showModal}
        setOpen={handleClose}
        updatedValues={updatedValues}
      />
      {/* <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "16px",
        }}
      >
        <Button id="btn-print" variant="outlined" onClick={() => handlePrint()}>
          Print
        </Button>
      </div> */}
      <div
        style={{
          minHeight: "100%",
          width: "100%",
          paddingInline: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : filteredRows?.length > 0 ? (
          <DataGrid
            rows={filteredRows}
            columns={columns}
            // pagination={showPagination}
            // initialState={{
            //   pagination: {
            //     paginationModel: { page: 0, pageSize: 13 },
            //   },
            // }}
            // pageSizeOptions={[5, 10]}
          />
        ) : (
          <Typography>لا توجد نتائج بحث</Typography>
        )}

        
      </div>
    </>
  );
};

export default PhonesTable;
