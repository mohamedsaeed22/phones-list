import { Box } from "@mui/material";
import CreatableSelect from "react-select/creatable";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDepartement } from "../store/departement-slice";
import { addSector } from "./../store/sector-slice";
const customStyles = {
  control: (provided) => ({
    ...provided,
    fontFamily: "roboto",
  }),
};

const MySelect = ({
  handleSelectedValue,
  options,
  holderName,
  disable = false,
  flag,
  sectorId,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (newValue, actionMeta) => {
    if (actionMeta.action === "select-option") {
      console.log(" selected option", newValue);
      setSelectedOption(newValue);
      handleSelectedValue(newValue);
    } else if (actionMeta.action === "create-option") {
      if (flag === "sectors") {
        console.log(" added option sec", newValue.value);
        dispatch(addSector(newValue.value))
          .unwrap()
          .then((res) => {
            console.log(res);
            const myObj = res.data;
            const selectedVal = {
              ...myObj,
              value: myObj.id,
              label: myObj.name,
            };
            setSelectedOption(selectedVal);
            handleSelectedValue(selectedVal);
          })
          .catch((e) => {
            console.log(e);
          });
      }
      if (flag === "departements") {
        console.log(" added option sec", newValue.value);
        dispatch(addDepartement({ name: newValue.value, sectorId }))
          .unwrap()
          .then((res) => {
            console.log(res.data)
            const myObj = res.data;
            const selectedVal = {
              ...myObj,
              value: myObj.id,
              label: myObj.name,
            };
            setSelectedOption(selectedVal);
            handleSelectedValue(selectedVal);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      handleSelectedValue(newValue);
      setSelectedOption(newValue);
    }
  };

  const formatCreateLabel = (inputValue) => `اضافة: ${inputValue}`;

  return (
    <Box width={229}>
      <CreatableSelect
        required
        isDisabled={disable}
        isClearable
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder={holderName}
        styles={customStyles}
        formatCreateLabel={formatCreateLabel}
      />
      {/* {row?.departments?.map((dep) => (
                    <Fragment key={dep}>
                      <TableRow key={dep}>
                        <StyledTableCell
                          align="center"
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
                          <TableRow>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                            {isAuthenticated && (
                              <TableCell align="center">
                                <Edit
                                  sx={{ color: "green", cursor: "pointer" }}
                                  onClick={() => handleEdit(row)}
                                />
                              </TableCell>
                            )}
                          </TableRow>
                        </>
                      )}

                      {dep?.offices?.length !== 0 &&
                        dep?.offices?.map((office) => (
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
                              {isAuthenticated && (
                                <TableCell align="center">
                                  <Edit
                                    sx={{ color: "green", cursor: "pointer" }}
                                    onClick={() => handleEdit(row)}
                                  />
                                </TableCell>
                              )}
                            </TableRow>
                          </>
                        ))}
                    </Fragment>
                  ))} */}
    </Box>
  );
};

export default MySelect;
