import React from "react";
import FilterBox from "./FilterBox";

const SearchBar = ({
  searchRangeList,
  handleChange,
  onChange,
  onFilterRegist,
  filters,
  onFilterDelete,
  onFilterSave,
  onFilterReset,
}) => {
  return (
    <article>
      <div className="display-none">
        <span>현재월을 제외한 최근 </span>
        <select name="searchRange" id="searchRange" onChange={handleChange}>
          {searchRangeList.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
        <select name="searchValue" id="searchValue">
          <option value="month">개월</option>
        </select>
      </div>
      <div>
        <h1>인근아파트 시세 필터</h1>
        <label htmlFor="aptName">아파트명 : </label>
        <input type="text" name="aptName" id="aptName" onChange={onChange} />
        <br />
        <label htmlFor="aptSize">전용면적 : </label>
        <input type="text" name="aptSize" id="aptSize" onChange={onChange} />
        <button onClick={onFilterRegist}>등록</button>
        <FilterBox filters={filters} onFilterDelete={onFilterDelete} />
        <div className="filter-control-box">
          <button onClick={onFilterSave} className="habit-button save">
            필터저장
          </button>
          <button onClick={onFilterReset} className="habit-button reset">
            저장 필터 초기화
          </button>
        </div>
      </div>
    </article>
  );
};

export default SearchBar;
