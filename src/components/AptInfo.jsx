import React from "react";

const AptInfo = (props) => (
  <>
    <span>최근 </span>
    <select name="searchRange" id="searchRange">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <select name="searchValue" id="searchValue">
      <option value="month">달</option>
    </select>
  </>
);

export default AptInfo;
