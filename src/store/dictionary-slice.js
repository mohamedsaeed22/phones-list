import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/axiosInstance";

// const DUMMY_DATA = [
//   {
//     id: "05387491-c91f-4dba-c329-08dc40286ad2",
//     name: "الضبعة",
//     departments: [
//       // {
//       //   id: "01198d3d-9123-4903-5590-08dc40286ac8",
//       //   name: "الأيسر",
//       //   sectorId: "05387491-c91f-4dba-c329-08dc40286ad2",
//       //   offices: [
//       //     {
//       //       id: "fc66037a-c5e1-4d6e-c8e0-08dc4036f15a",
//       //       name: "السكرتارية ",
//       //       phoneNumber: "1000",
//       //       notes: "",
//       //       departmentId: "01198d3d-9123-4903-5590-08dc40286ac8",
//       //     },
//       //   ],
//       // },
//       // {
//       //   id: "0db0afa0-7fb0-4402-5596-08dc40286ac8",
//       //   name: "الأيسر",
//       //   sectorId: "05387491-c91f-4dba-c329-08dc40286ad2",
//       //   offices: [
//       //     {
//       //       id: "fc66037a-c5e1-4d6e-c8e0-08dc4036f15a",
//       //       name: "السكرتارية ",
//       //       phoneNumber: "1000",
//       //       notes: "",
//       //       departmentId: "01198d3d-9123-4903-5590-08dc40286ac8",
//       //     },
//       //     {
//       //       id: "39dba0e1-90c3-45f9-c8eb-08dc4036f15a",
//       //       name: "مدير الإدارة المركزية",
//       //       phoneNumber: "101",
//       //       notes: "لواء طيار/ حازم يحيي",
//       //       departmentId: "0db0afa0-7fb0-4402-5596-08dc40286ac8",
//       //     },
//       //     {
//       //       id: "fa0ee380-4c4a-4a94-c8ec-08dc4036f15a",
//       //       name: "مدير الأنتاج الحيوانى",
//       //       phoneNumber: "1081",
//       //       notes: "لواء/ سامح",
//       //       departmentId: "0db0afa0-7fb0-4402-5596-08dc40286ac8",
//       //     },
//       //     {
//       //       id: "efa3dab8-b645-41da-c8ed-08dc4036f15a",
//       //       name: "قائد فوج المقر",
//       //       phoneNumber: "1200",
//       //       notes: "عميد/ محمد السنبيسى",
//       //       departmentId: "0db0afa0-7fb0-4402-5596-08dc40286ac8",
//       //     },
//       //     {
//       //       id: "f0792ae3-4995-4e3f-c8ee-08dc4036f15a",
//       //       name: "فرع إعداد دولة",
//       //       phoneNumber: "1070",
//       //       notes: "عقيد / تامر شحاته",
//       //       departmentId: "0db0afa0-7fb0-4402-5596-08dc40286ac8",
//       //     },
//       //     {
//       //       id: "cb2b2199-8df3-41d7-c8ef-08dc4036f15a",
//       //       name: "السكرتارية العسكرية",
//       //       phoneNumber: "1080",
//       //       notes: "",
//       //       departmentId: "0db0afa0-7fb0-4402-5596-08dc40286ac8",
//       //     },
//       //     {
//       //       id: "3c035c5c-22ed-4115-c8f0-08dc4036f15a",
//       //       name: "مدير الإدارة الزراعية",
//       //       phoneNumber: "1253",
//       //       notes: "",
//       //       departmentId: "0db0afa0-7fb0-4402-5596-08dc40286ac8",
//       //     },
//       //     {
//       //       id: "58d1994c-a5df-402f-c8f1-08dc4036f15a",
//       //       name: "الشئون القانونية",
//       //       phoneNumber: "1261",
//       //       notes: "أ/ زياد عبدالرحيم",
//       //       departmentId: "0db0afa0-7fb0-4402-5596-08dc40286ac8",
//       //     },
//       //     {
//       //       id: "dae6dad2-2ca0-4559-c8f2-08dc4036f15a",
//       //       name: "مدير التنمية الزراعية",
//       //       phoneNumber: "1256",
//       //       notes: "م/ أحمد عمار",
//       //       departmentId: "0db0afa0-7fb0-4402-5596-08dc40286ac8",
//       //     },
//       //   ],
//       // },
//       {
//         id: "8d81154e-b0e8-400a-5597-08dc40286ac8",
//         name: "الأيمن",
//         sectorId: "05387491-c91f-4dba-c329-08dc40286ad2",
//         offices: [
//           {
//             id: "70b40898-855e-4934-c8f3-08dc4036f15a",
//             name: "مدير الجهاز",
//             phoneNumber: "1001",
//             notes: "عقيد طيار/ بهاء الغنام",
//             departmentId: "8d81154e-b0e8-400a-5597-08dc40286ac8",
//           },
//           {
//             id: "f5bbf664-8c9b-452b-c8f4-08dc4036f15a",
//             name: "مدير إدارة المتابعة",
//             phoneNumber: "1040",
//             notes: "مقدم / أحمد جمال",
//             departmentId: "8d81154e-b0e8-400a-5597-08dc40286ac8",
//           },
//           {
//             id: "40e7507c-c90b-4ae7-fc9c-08dc40d25200",
//             name: "مستشار مدير الجهاز",
//             phoneNumber: "1050",
//             notes: "د/ أحمد سمير",
//             departmentId: "8d81154e-b0e8-400a-5597-08dc40286ac8",
//           },
//           {
//             id: "59a5ecc9-1f0e-43ce-fc9d-08dc40d25200",
//             name: "مستشار مدير الجهاز للموارد البشرية",
//             phoneNumber: "1051",
//             notes: "د/ داليا ",
//             departmentId: "8d81154e-b0e8-400a-5597-08dc40286ac8",
//           },
//         ],
//       },
//       {
//         id: "dd7347c9-bde2-42d1-5598-08dc40286ac8",
//         name: "الهندسية",
//         sectorId: "05387491-c91f-4dba-c329-08dc40286ad2",
//         offices: [
//           {
//             id: "29472bbc-8c75-4fdf-c8f5-08dc4036f15a",
//             name: "مدير الإدارة الهندسية",
//             phoneNumber: "1500",
//             notes: "لواء/ خالد صلاح",
//             departmentId: "dd7347c9-bde2-42d1-5598-08dc40286ac8",
//           },
//           {
//             id: "627a8b00-7c6d-4e93-c8f6-08dc4036f15a",
//             name: "رئيس فرع المشروعات",
//             phoneNumber: "1090",
//             notes: "مقدم طيار/ عمرو الشرقاوى",
//             departmentId: "dd7347c9-bde2-42d1-5598-08dc40286ac8",
//           },
//           {
//             id: "54a20998-8123-4f3a-c8f7-08dc4036f15a",
//             name: "متابعة رئيس فرع المشروعات",
//             phoneNumber: "1510",
//             notes: "رائد / اسلام جبر",
//             departmentId: "dd7347c9-bde2-42d1-5598-08dc40286ac8",
//           },
//           {
//             id: "f209c76e-bcb0-48cd-c8f8-08dc4036f15a",
//             name: "الفرع الهندسى",
//             phoneNumber: "1511",
//             notes: "م/ محمد مديح",
//             departmentId: "dd7347c9-bde2-42d1-5598-08dc40286ac8",
//           },
//           {
//             id: "2be3a59c-f02a-4b31-c8f9-08dc4036f15a",
//             name: "فرع الطرق",
//             phoneNumber: "1512",
//             notes: "",
//             departmentId: "dd7347c9-bde2-42d1-5598-08dc40286ac8",
//           },
//           {
//             id: "3de8ad82-7be2-42a3-c8fa-08dc4036f15a",
//             name: "رئيس فرع الإنشاءات",
//             phoneNumber: "1513",
//             notes: "م/ أحمد منسى",
//             departmentId: "dd7347c9-bde2-42d1-5598-08dc40286ac8",
//           },
//           {
//             id: "ada8096c-7212-401d-c8fb-08dc4036f15a",
//             name: "DC الإنشاءات",
//             phoneNumber: "1514",
//             notes: "",
//             departmentId: "dd7347c9-bde2-42d1-5598-08dc40286ac8",
//           },
//           {
//             id: "a6d68130-9269-466a-5201-08dc47e8743c",
//             name: "السكرتارية",
//             phoneNumber: "1515",
//             notes: "",
//             departmentId: "dd7347c9-bde2-42d1-5598-08dc40286ac8",
//           },
//           {
//             id: "b53a2096-f3e0-4338-5202-08dc47e8743c",
//             name: "الأرشيف",
//             phoneNumber: "1516",
//             notes: "",
//             departmentId: "dd7347c9-bde2-42d1-5598-08dc40286ac8",
//           },
//         ],
//       },
//       {
//         id: "1da48bca-c4f9-4a61-5599-08dc40286ac8",
//         name: "فرع نظم المعلومات",
//         sectorId: "05387491-c91f-4dba-c329-08dc40286ad2",
//         offices: [
//           {
//             id: "983aa125-2429-402a-c8fc-08dc4036f15a",
//             name: "رئيس فرع النظم والمعلومات",
//             phoneNumber: "1100",
//             notes: "",
//             departmentId: "1da48bca-c4f9-4a61-5599-08dc40286ac8",
//           },
//           {
//             id: "e65733cb-196a-4ce3-c8fd-08dc4036f15a",
//             name: "شبكات ",
//             phoneNumber: "1101",
//             notes: "",
//             departmentId: "1da48bca-c4f9-4a61-5599-08dc40286ac8",
//           },
//           {
//             id: "97a34852-5da5-4f30-c8fe-08dc4036f15a",
//             name: "شبكات2",
//             phoneNumber: "1105",
//             notes: "",
//             departmentId: "1da48bca-c4f9-4a61-5599-08dc40286ac8",
//           },
//           {
//             id: "19b0657c-248c-4ec4-c8ff-08dc4036f15a",
//             name: "ورشة الصيانة",
//             phoneNumber: "1106",
//             notes: "",
//             departmentId: "1da48bca-c4f9-4a61-5599-08dc40286ac8",
//           },
//           {
//             id: "60016e05-7053-4063-c900-08dc4036f15a",
//             name: "البرمجيات",
//             phoneNumber: "1107",
//             notes: "",
//             departmentId: "1da48bca-c4f9-4a61-5599-08dc40286ac8",
//           },
//         ],
//       },
//       {
//         id: "e6a67374-736d-46a0-4105-08dc40d247eb",
//         name: "التنظيم والإدارة",
//         sectorId: "05387491-c91f-4dba-c329-08dc40286ad2",
//         offices: [
//           {
//             id: "b3da1c21-6a8e-4e1e-fc9b-08dc40d25200",
//             name: "التنظيم",
//             phoneNumber: "1353",
//             notes: "",
//             departmentId: "e6a67374-736d-46a0-4105-08dc40d247eb",
//           },
//         ],
//       },
//       // {
//       //   id: "cc27d1bf-f470-447e-4106-08dc40d247eb",
//       //   name: "الامن",
//       //   sectorId: "05387491-c91f-4dba-c329-08dc40286ad2",
//       //   offices: [],
//       // },
//       // {
//       //   id: "e88d9020-17ef-48a3-4107-08dc40d247eb",
//       //   name: "الأمن",
//       //   sectorId: "05387491-c91f-4dba-c329-08dc40286ad2",
//       //   offices: [
//       //     {
//       //       id: "a5af9b0b-b5e1-427f-fc9e-08dc40d25200",
//       //       name: "بوابة العراق",
//       //       phoneNumber: "1203",
//       //       notes: "",
//       //       departmentId: "e88d9020-17ef-48a3-4107-08dc40d247eb",
//       //     },
//       //     {
//       //       id: "0c46de15-07c6-4872-fc9f-08dc40d25200",
//       //       name: "بوابة الإمارات",
//       //       phoneNumber: "1204",
//       //       notes: "",
//       //       departmentId: "e88d9020-17ef-48a3-4107-08dc40d247eb",
//       //     },
//       //     {
//       //       id: "57e4edfa-1a88-4451-fca0-08dc40d25200",
//       //       name: "بوابة السعودية",
//       //       phoneNumber: "1205",
//       //       notes: "",
//       //       departmentId: "e88d9020-17ef-48a3-4107-08dc40d247eb",
//       //     },
//       //     {
//       //       id: "391969f2-2dc3-477e-fca1-08dc40d25200",
//       //       name: "بوابة رعد 7",
//       //       phoneNumber: "1206",
//       //       notes: "",
//       //       departmentId: "e88d9020-17ef-48a3-4107-08dc40d247eb",
//       //     },
//       //     {
//       //       id: "b8c1892e-8281-4b23-fca2-08dc40d25200",
//       //       name: "بوابة القائد",
//       //       phoneNumber: "1207",
//       //       notes: "",
//       //       departmentId: "e88d9020-17ef-48a3-4107-08dc40d247eb",
//       //     },
//       //     {
//       //       id: "e86a5a1b-b0fb-4c65-fca3-08dc40d25200",
//       //       name: "بوابة الزائرين",
//       //       phoneNumber: "1208",
//       //       notes: "",
//       //       departmentId: "e88d9020-17ef-48a3-4107-08dc40d247eb",
//       //     },
//       //     {
//       //       id: "00174470-566f-4f21-fca4-08dc40d25200",
//       //       name: "بوابة البحرين",
//       //       phoneNumber: "1209",
//       //       notes: "",
//       //       departmentId: "e88d9020-17ef-48a3-4107-08dc40d247eb",
//       //     },
//       //     {
//       //       id: "7297f82f-33df-4a77-fca5-08dc40d25200",
//       //       name: "بوابة ليبيا",
//       //       phoneNumber: "1210",
//       //       notes: "",
//       //       departmentId: "e88d9020-17ef-48a3-4107-08dc40d247eb",
//       //     },
//       //   ],
//       // },
//       {
//         id: "d37a96aa-b270-4e1b-4108-08dc40d247eb",
//         name: "إدارى الإمارات",
//         sectorId: "05387491-c91f-4dba-c329-08dc40286ad2",
//         offices: [
//           {
//             id: "d21eaab5-8df9-4a01-fca6-08dc40d25200",
//             name: "مدير إدارة المخازن",
//             phoneNumber: "1301",
//             notes: "مقدم/ رامز",
//             departmentId: "d37a96aa-b270-4e1b-4108-08dc40d247eb",
//           },
//           {
//             id: "3b9fb1d6-fa54-41b4-fca7-08dc40d25200",
//             name: "رئيس فرع القضاء العسكرى",
//             phoneNumber: "1260",
//             notes: "رائد/ اسلام ناشى",
//             departmentId: "d37a96aa-b270-4e1b-4108-08dc40d247eb",
//           },
//           {
//             id: "e37f98c8-3dee-4bfd-fcb3-08dc40d25200",
//             name: "الموارد البشرية ",
//             phoneNumber: "1351",
//             notes: "أ/ محمد جمال",
//             departmentId: "d37a96aa-b270-4e1b-4108-08dc40d247eb",
//           },
//           {
//             id: "d32bb3fd-aad4-43cc-fcb4-08dc40d25200",
//             name: "الموارد البشرية قسم العمليات",
//             phoneNumber: "1352",
//             notes: "",
//             departmentId: "d37a96aa-b270-4e1b-4108-08dc40d247eb",
//           },
//         ],
//       },
//       {
//         id: "d0655bca-ab28-47f8-4109-08dc40d247eb",
//         name: "الماليات",
//         sectorId: "05387491-c91f-4dba-c329-08dc40286ad2",
//         offices: [
//           {
//             id: "c00f7864-6c8a-43d1-fca8-08dc40d25200",
//             name: "مدير الإدارة المالية",
//             phoneNumber: "1257",
//             notes: "",
//             departmentId: "d0655bca-ab28-47f8-4109-08dc40d247eb",
//           },
//           {
//             id: "507aeedf-7ce6-45d9-fca9-08dc40d25200",
//             name: "الخزنة",
//             phoneNumber: "1258",
//             notes: "",
//             departmentId: "d0655bca-ab28-47f8-4109-08dc40d247eb",
//           },
//         ],
//       },
//       {
//         id: "c98ae458-ac50-411c-410a-08dc40d247eb",
//         name: "المكتب الفنى",
//         sectorId: "05387491-c91f-4dba-c329-08dc40286ad2",
//         offices: [
//           {
//             id: "fb50f6f1-af50-475d-fcaa-08dc40d25200",
//             name: "مدير المكتب الفنى",
//             phoneNumber: "1060",
//             notes: "",
//             departmentId: "c98ae458-ac50-411c-410a-08dc40d247eb",
//           },
//         ],
//       },
//       {
//         id: "b10dc532-fcbe-4aff-410b-08dc40d247eb",
//         name: "المساحة",
//         sectorId: "05387491-c91f-4dba-c329-08dc40286ad2",
//         offices: [
//           {
//             id: "33bd4ff4-e2df-4753-fcab-08dc40d25200",
//             name: "رئيس فرع المساحة",
//             phoneNumber: "1252",
//             notes: "",
//             departmentId: "b10dc532-fcbe-4aff-410b-08dc40d247eb",
//           },
//           {
//             id: "c84fd6f3-c2b6-4776-fcac-08dc40d25200",
//             name: "معمل المساحة",
//             phoneNumber: "1249",
//             notes: "",
//             departmentId: "b10dc532-fcbe-4aff-410b-08dc40d247eb",
//           },
//           {
//             id: "44475571-2e81-42c8-fcad-08dc40d25200",
//             name: "أرشيف المساحة",
//             phoneNumber: "1250",
//             notes: "",
//             departmentId: "b10dc532-fcbe-4aff-410b-08dc40d247eb",
//           },
//         ],
//       },
//       {
//         id: "f293c6cf-df64-4dce-410c-08dc40d247eb",
//         name: "الكهرباء",
//         sectorId: "05387491-c91f-4dba-c329-08dc40286ad2",
//         offices: [
//           {
//             id: "e42c2cf5-1ba4-46c2-fcae-08dc40d25200",
//             name: "مدير إدارة الكهرباء",
//             phoneNumber: "1259",
//             notes: "",
//             departmentId: "f293c6cf-df64-4dce-410c-08dc40d247eb",
//           },
//         ],
//       },
//       {
//         id: "21c8ad04-c46a-445e-410d-08dc40d247eb",
//         name: "المخازن",
//         sectorId: "05387491-c91f-4dba-c329-08dc40286ad2",
//         offices: [
//           {
//             id: "f7745678-f397-4927-fcaf-08dc40d25200",
//             name: "مدير مخزن الأسمدة",
//             phoneNumber: "1302",
//             notes: "",
//             departmentId: "21c8ad04-c46a-445e-410d-08dc40d247eb",
//           },
//           {
//             id: "278b4cc0-442a-442c-fcb0-08dc40d25200",
//             name: " مخزن النفحات",
//             phoneNumber: "1303",
//             notes: "",
//             departmentId: "21c8ad04-c46a-445e-410d-08dc40d247eb",
//           },
//           {
//             id: "56cbed00-5527-4976-fcb1-08dc40d25200",
//             name: " مخزن 7",
//             phoneNumber: "1304",
//             notes: "",
//             departmentId: "21c8ad04-c46a-445e-410d-08dc40d247eb",
//           },
//           {
//             id: "e3ef7cec-4e81-47a5-fcb2-08dc40d25200",
//             name: " مخزن الإمارات",
//             phoneNumber: "1305",
//             notes: "",
//             departmentId: "21c8ad04-c46a-445e-410d-08dc40d247eb",
//           },
//         ],
//       },
//       {
//         id: "78eecb4f-6769-4ce0-410e-08dc40d247eb",
//         name: "إدارى العراق",
//         sectorId: "05387491-c91f-4dba-c329-08dc40286ad2",
//         offices: [
//           {
//             id: "819d5361-da09-42c6-fcb5-08dc40d25200",
//             name: "مدير قطاع سفنكس",
//             phoneNumber: "1401",
//             notes: "مقدم طيار/ محمد مختار",
//             departmentId: "78eecb4f-6769-4ce0-410e-08dc40d247eb",
//           },
//           {
//             id: "bca208cc-e44f-49c3-fcb6-08dc40d25200",
//             name: "التنظيم",
//             phoneNumber: "1406",
//             notes: "",
//             departmentId: "78eecb4f-6769-4ce0-410e-08dc40d247eb",
//           },
//         ],
//       },
//     ],
//   },
//   // {
//   //   id: "0b7f4279-306e-49ad-c32a-08dc40286ad2",
//   //   name: "دار القوات الجوية 1",
//   //   departments: [
//   //     {
//   //       id: "77fd85ce-9c99-4ffe-5591-08dc40286ac8",
//   //       name: "مبنى مدير الجهاز",
//   //       sectorId: "0b7f4279-306e-49ad-c32a-08dc40286ad2",
//   //       offices: [
//   //         {
//   //           id: "5a4c46b6-f34f-4c43-c8e1-08dc4036f15a",
//   //           name: "مدير الجهاز",
//   //           phoneNumber: "1003",
//   //           notes: "مهندس اسماعيل / محمد",
//   //           departmentId: "77fd85ce-9c99-4ffe-5591-08dc40286ac8",
//   //         },
//   //         {
//   //           id: "d2853b26-04f8-42cb-c8e2-08dc4036f15a",
//   //           name: "السكرتارية",
//   //           phoneNumber: "1020",
//   //           notes: "",
//   //           departmentId: "77fd85ce-9c99-4ffe-5591-08dc40286ac8",
//   //         },
//   //         {
//   //           id: "eeab52eb-eb09-43fd-c8e3-08dc4036f15a",
//   //           name: "الإرشيف",
//   //           phoneNumber: "1030",
//   //           notes: "",
//   //           departmentId: "77fd85ce-9c99-4ffe-5591-08dc40286ac8",
//   //         },
//   //       ],
//   //     },
//   //   ],
//   // },
//   {
//     id: "ee9f2ceb-aba2-4846-c32b-08dc40286ad2",
//     name: "غرب القاهرة",
//     departments: [
//       {
//         id: "b5db8686-530e-41b1-5592-08dc40286ac8",
//         name: "القيادة",
//         sectorId: "ee9f2ceb-aba2-4846-c32b-08dc40286ad2",
//         offices: [
//           {
//             id: "646816ef-3eea-4130-c8e4-08dc4036f15a",
//             name: "مدير الجهاز",
//             phoneNumber: "1006",
//             notes: "عقيد طيار / بهاء الغنام",
//             departmentId: "b5db8686-530e-41b1-5592-08dc40286ac8",
//           },
//         ],
//       },
//       {
//         id: "2b5aef3a-8659-4189-5593-08dc40286ac8",
//         name: "القيادة",
//         sectorId: "ee9f2ceb-aba2-4846-c32b-08dc40286ad2",
//         offices: [
//           {
//             id: "fabd163b-7f4b-4555-c8e5-08dc4036f15a",
//             name: "قائد قطاع غرب",
//             phoneNumber: "1600",
//             notes: "مقدم طيار / على علام",
//             departmentId: "2b5aef3a-8659-4189-5593-08dc40286ac8",
//           },
//         ],
//       },
//       {
//         id: "9cedb4dc-bd9c-44d1-5594-08dc40286ac8",
//         name: "الماليات",
//         sectorId: "ee9f2ceb-aba2-4846-c32b-08dc40286ad2",
//         offices: [
//           {
//             id: "cfbf3687-87c9-40cf-c8e6-08dc4036f15a",
//             name: "مدير نشاط التعدين",
//             phoneNumber: "1111",
//             notes: "مقدم طيار / كريم كفافى",
//             departmentId: "9cedb4dc-bd9c-44d1-5594-08dc40286ac8",
//           },
//           {
//             id: "e9d6f064-a922-4609-c8e7-08dc4036f15a",
//             name: "رئيس فرع الإستثمار",
//             phoneNumber: "1601",
//             notes: "أ / محمد دسوقى",
//             departmentId: "9cedb4dc-bd9c-44d1-5594-08dc40286ac8",
//           },
//           {
//             id: "6dc8a457-4c09-4879-c8e8-08dc4036f15a",
//             name: "نظم نشاط التعدين",
//             phoneNumber: "1602",
//             notes: "",
//             departmentId: "9cedb4dc-bd9c-44d1-5594-08dc40286ac8",
//           },
//           {
//             id: "6f2f1502-064f-41ff-c8e9-08dc4036f15a",
//             name: "مراجعة نشاط التعدين",
//             phoneNumber: "1255",
//             notes: "أ / تامر هلال",
//             departmentId: "9cedb4dc-bd9c-44d1-5594-08dc40286ac8",
//           },
//         ],
//       },
//       {
//         id: "b6369848-78b9-4e29-5595-08dc40286ac8",
//         name: "المخازن",
//         sectorId: "ee9f2ceb-aba2-4846-c32b-08dc40286ad2",
//         offices: [
//           {
//             id: "7f2f25f2-ccf4-4044-c8ea-08dc4036f15a",
//             name: "مخزن غرب ",
//             phoneNumber: "1603",
//             notes: "",
//             departmentId: "b6369848-78b9-4e29-5595-08dc40286ac8",
//           },
//         ],
//       },
//     ],
//   },
//   // {
//   //   id: "10220b9a-2f4d-4f2b-0241-08dc41b98c88",
//   //   name: "test sector",
//   //   departments: [
//   //     {
//   //       id: "8cb98f5c-1367-4a1e-bbb6-08dc41b98c7c",
//   //       name: "test dep",
//   //       sectorId: "10220b9a-2f4d-4f2b-0241-08dc41b98c88",
//   //       offices: [
//   //         {
//   //           id: "31f9240c-d800-41ca-fce7-08dc426a5894",
//   //           name: "office 1",
//   //           phoneNumber: "112001",
//   //           notes: "هذا القطاع للتجربه",
//   //           departmentId: "8cb98f5c-1367-4a1e-bbb6-08dc41b98c7c",
//   //         },
//   //         {
//   //           id: "7a561145-05b5-4d5a-28fd-08dc42795b66",
//   //           name: "office 2",
//   //           phoneNumber: "88080",
//   //           notes: "للتجربه",
//   //           departmentId: "8cb98f5c-1367-4a1e-bbb6-08dc41b98c7c",
//   //         },
//   //       ],
//   //     },
//   //   ],
//   // },
// ];

export const getAllData = createAsyncThunk(
  "dictionary/getAllData",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("GetAllDictionary");
      const responseData = response.data;
      responseData.forEach((item) => {
        item.departments.sort(sortDepartmentsAndOffices);
        item.departments.forEach((department) => {
          department.offices.sort(sortDepartmentsAndOffices);
        });
      });
      console.log(responseData)
      return responseData;
    } catch (error) {
      return error.message;
    }
  }
);

function sortDepartmentsAndOffices(a, b) {
  return (a.index || 0) - (b.index || 0);
}
const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    pushOffice: (state, action) => {
      if (action.payload) {
        state.data.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    // get all data
    builder
      .addCase(getAllData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { pushOffice, checkNumber } = dictionarySlice.actions;

export default dictionarySlice.reducer;
