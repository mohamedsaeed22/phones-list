import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  CircularProgress,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { styled } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
import EditPhone from "./EditPhone";
import { getAllData } from "../store/dictionary-slice";
import { useDispatch, useSelector } from "react-redux";
import { deleteOffice } from "../store/office-slice";
import { SweatAlert, notifyFailed, notifySuccess } from "./ToastifyAlert";
import { deleteSector, getAllSectors } from "../store/sector-slice";
import {
  deleteDepartement,
  getAllDepartements,
} from "../store/departement-slice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  borderRight: "1px solid #ddd",
  maxHeight: "8px",
  "@media print": {
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#070F2B",
      "-webkit-print-color-adjust": "exact",
      colorAdjust: "exact",
    },
  },
}));

function countObjects(dataArray) {
  let totalCount = 0;
  if (dataArray) {
    totalCount++;
    for (const departmentObj of dataArray.departments) {
      totalCount++;
      if (departmentObj.offices.length === 0) {
        totalCount += 1;
      }
      totalCount += departmentObj.offices.length;
    }
  }
  return totalCount;
}

export default function PhonesTable({ search }) {
  let count = 0;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [updatedValues, setUpdatedValues] = useState({});
  const { data, isLoading, error } = useSelector((state) => state.data);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  useEffect(() => {
    const highlightedElement = document.getElementById("highlighted-element");
    if (highlightedElement) {
      highlightedElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [search]);

  const highlightText = (text) => {
    if (!search || search === "") {
      return text;
    }
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(
      regex,
      (match) =>
        `<span id="highlighted-element" style="background-color: yellow;">${match}</span>`
    );
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDeleteOffice = async (id, name) => {
    const willDelete = await SweatAlert({
      title: "هل متاكد من حذف مكتب " + name,
      icon: "warning",
      dangerMode: true,
    });
    if (willDelete) {
      dispatch(deleteOffice(id))
        .unwrap()
        .then(() => {
          notifySuccess("تم حذف المكتب بنجاح");
          dispatch(getAllData());
        })
        .catch((err) => {
          notifyFailed("حدث خطا ما");
        });
    }
  };

  const handleDeleteDep = async (dep) => {
    const willDelete = await SweatAlert({
      title: "هل متاكد من حذف اداره " + dep.name,
      icon: "warning",
      dangerMode: true,
    });
    if (willDelete) {
      dispatch(deleteDepartement(dep.id))
        .unwrap()
        .then(() => {
          notifySuccess("تم حذف الاداره بنجاح");
          dispatch(getAllDepartements());
          dispatch(getAllData());
        })
        .catch((err) => {
          notifyFailed("حدث خطا ما");
        });
    }
  };

  const handleDeleteSector = async (sectorId, sectorName) => {
    const willDelete = await SweatAlert({
      title: "هل متاكد من حذف قطاع " + sectorName,
      icon: "warning",
      dangerMode: true,
    });
    if (willDelete) {
      dispatch(deleteSector(sectorId))
        .unwrap()
        .then(() => {
          notifySuccess("تم حذف القطاع بنجاح");
          dispatch(getAllData());
          dispatch(getAllSectors());
        })
        .catch((err) => {
          notifyFailed("حدث خطا ما");
        });
    }
  };

  return (
    <>
      <EditPhone
        open={showModal}
        setOpen={handleClose}
        updatedValues={updatedValues}
      />
      <TableContainer
        component={Paper}
        id="tableContainer"
        style={{
          maxHeight: isAuthenticated ? "85vh" : "92vh",
        }}
      >
        <Table aria-label="phones table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">القطاع</StyledTableCell>
              <StyledTableCell align="center">
                ادارة / فرع / قسم
              </StyledTableCell>
              <StyledTableCell align="center" width={50}>
                م
              </StyledTableCell>
              <StyledTableCell align="center">المكتب</StyledTableCell>
              <StyledTableCell align="center">الرقم</StyledTableCell>
              <StyledTableCell align="center">ملاحظات</StyledTableCell>
              {isAuthenticated && (
                <StyledTableCell align="center" className="edit-col">
                  تعديل
                </StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <Box
                rowSpan={6}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <CircularProgress />
              </Box>
            )}
            {Array.isArray(data) &&
              data?.map((row, index) => (
                <Fragment key={row}>
                  <TableRow key={row.id}>
                    <StyledTableCell
                      align="center"
                      rowSpan={
                        row.departments.length === 0
                          ? countObjects(data[index]) + 3
                          : countObjects(data[index])
                      }
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: highlightText(row.name),
                        }}
                      />
                    </StyledTableCell>
                  </TableRow>
                  {row?.departments?.map((dep) => (
                    <Fragment key={dep}>
                      <TableRow key={dep.id}>
                        <StyledTableCell
                          align="center"
                          className={index % 2 === 0 ? "evenDep" : "oddDep"}
                          rowSpan={
                            dep?.offices?.length === 0
                              ? 2
                              : dep.offices.length + 1
                          }
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: highlightText(dep.name),
                            }}
                          />
                        </StyledTableCell>
                      </TableRow>

                      {dep?.offices?.length === 0 && (
                        <>
                          <TableRow
                            className={count % 2 === 0 ? "oddRow" : "evenRow"}
                            style={{
                              backgroundColor:
                                count % 2 === 0 ? "#cccccc77" : "none",
                            }}
                          >
                            <StyledTableCell align="center">
                              {(count += 1)}
                            </StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                            {isAuthenticated && (
                              <StyledTableCell
                                align="center"
                                className="edit-col"
                              >
                                <Edit
                                  sx={{ color: "green", cursor: "pointer" }}
                                  onClick={() => {
                                    setShowModal(true);
                                    setUpdatedValues({
                                      sectorId: row.id,
                                      sectorName: row.name,
                                      departementId: dep.id,
                                      departementName: dep.name,
                                      officeId: "",
                                      officeName: "",
                                      phoneNumber: "",
                                      notes: "",
                                    });
                                  }}
                                />
                                <Delete
                                  sx={{
                                    marginLeft: "10px",
                                    cursor: "pointer",
                                    color: "red",
                                  }}
                                  onClick={() => handleDeleteDep(dep)}
                                />
                              </StyledTableCell>
                            )}
                          </TableRow>
                        </>
                      )}

                      {dep?.offices?.map((office) => (
                        <>
                          <TableRow
                            key={office.id}
                            className={count % 2 === 0 ? "oddRow" : "evenRow"}
                            style={{
                              backgroundColor:
                                count % 2 === 0 ? "#cccccc77" : "none",
                            }}
                          >
                            <StyledTableCell align="center">
                              {(count += 1)}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: highlightText(office.name),
                                }}
                              />
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: highlightText(office.phoneNumber),
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
                            {isAuthenticated && (
                              <StyledTableCell
                                align="center"
                                className="edit-col"
                              >
                                {
                                  <>
                                    <Edit
                                      sx={{ color: "green", cursor: "pointer" }}
                                      onClick={() => {
                                        setShowModal(true);
                                        setUpdatedValues({
                                          sectorId: row.id,
                                          sectorName: row.name,
                                          departementId: dep.id,
                                          departementName: dep.name,
                                          officeId: office.id,
                                          officeName: office.name,
                                          phoneNumber: office.phoneNumber,
                                          notes: office.notes,
                                        });
                                      }}
                                    />
                                    <Delete
                                      sx={{
                                        marginLeft: "10px",
                                        cursor: "pointer",
                                        color: "red",
                                      }}
                                      onClick={() =>
                                        handleDeleteOffice(
                                          office.id,
                                          office.name
                                        )
                                      }
                                    />
                                  </>
                                }
                              </StyledTableCell>
                            )}
                          </TableRow>
                        </>
                      ))}
                    </Fragment>
                  ))}

                  {row?.departments?.length === 0 && (
                    <>
                      <TableRow>
                        <StyledTableCell
                          align="center"
                          rowSpan={2}
                        ></StyledTableCell>
                      </TableRow>
                      <TableRow
                        className={count % 2 === 0 ? "oddRow" : "evenRow"}
                        style={{
                          backgroundColor:
                            count % 2 === 0 ? "#cccccc77" : "none",
                        }}
                      >
                        <StyledTableCell align="center">
                          {(count += 1)}
                        </StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        {isAuthenticated && (
                          <StyledTableCell align="center" className="edit-col">
                            <Edit
                              sx={{ color: "green", cursor: "pointer" }}
                              onClick={() => {
                                setShowModal(true);
                                setUpdatedValues({
                                  sectorId: row.id,
                                  sectorName: row.name,
                                  departementId: "",
                                  departementName: "",
                                  officeId: "",
                                  officeName: "",
                                  phoneNumber: "",
                                  notes: "",
                                });
                              }}
                            />
                            <Delete
                              sx={{
                                marginLeft: "10px",
                                cursor: "pointer",
                                color: "red",
                              }}
                              onClick={() =>
                                handleDeleteSector(row.id, row.name)
                              }
                            />
                          </StyledTableCell>
                        )}
                      </TableRow>
                    </>
                  )}
                </Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
