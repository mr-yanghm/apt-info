import React, { useRef } from "react";

const SelectBox = ({ dataName, datas, onChangeSelectBox }) => {
  const selectRef = useRef();
  const onChangeLevel = (event) => {
    // console.log(event.target.selectedOptions[0].text);
    onChangeSelectBox({
      value: event.target.value,
      text: event.target.selectedOptions[0].text,
    });
  };
  return (
    <select name={dataName} onChange={onChangeLevel} ref={selectRef}>
      {datas &&
        datas.map((data) => {
          return (
            <option key={data.code} value={data.code}>
              {data.value}
            </option>
          );
        })}

      {/* <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option> */}
    </select>
  );
};

export default SelectBox;
