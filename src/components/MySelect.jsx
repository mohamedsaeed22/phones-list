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

  const handleChange = async (newValue, actionMeta) => {
    if (actionMeta.action === "select-option") {
      setSelectedOption(newValue);
      handleSelectedValue(newValue);
    } else if (actionMeta.action === "create-option") {
      if (flag === "sectors") {
        await dispatch(addSector(newValue.value)).then(({ payload }) => {
          console.log(payload);
          const myObj = payload.data;
          const selectedVal = {
            ...myObj,
            value: myObj?.id,
            label: myObj?.name,
          };
          setSelectedOption(selectedVal);
          handleSelectedValue(selectedVal);
        });
      }
      if (flag === "departements") {
        console.log(" added option sec", newValue.value);
        dispatch(addDepartement({ name: newValue.value, sectorId })).then(
          ({ payload }) => {
            console.log(payload.data);
            const myObj = payload.data;
            const selectedVal = {
              ...myObj,
              value: myObj?.id,
              label: myObj?.name,
            };
            setSelectedOption(selectedVal);
            handleSelectedValue(selectedVal);
          }
        );
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
    </Box>
  );
};

export default MySelect;
