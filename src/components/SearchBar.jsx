import React from "react";
import FilterBox from "./FilterBox";

const SearchBar = ({
  inquiryPeriodList,
  onSearchRangeChange,
  onChange,
  onFilterRegist,
  filters,
  onFilterDelete,
  onFilterSave,
  onFilterReset,
  aptNameList,
  selectedSizeList,
  isVisibleSearchbox
}) => {
  return (
    <article className="searchBox" className={isVisibleSearchbox ? "" : "inVisible"}>
      <div className="">
        <label htmlFor="inquiryPeriod">조회기간 : (현재월을 제외한 최근)</label>
        <div className="display-flex">
          <span></span>
          <select name="inquiryPeriod" id="inquiryPeriod" onChange={onChange} className="width25">
            {inquiryPeriodList.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
          <span>개월</span>
        </div>
      </div>
      <div>
        <h1>인근아파트 시세 필터</h1>
        <div>
          <label htmlFor="aptName">아파트명 : ({aptNameList && aptNameList.length})</label>
          {/* <input type="text" name="aptName" id="aptName" onChange={onChange} /> */}
          <select name="aptName" id="aptName" onChange={onChange}>
            <option value="">선택하세요</option>
            {
              aptNameList && aptNameList.map((name, index) => {
                return <option key={index} value={name}>{name}</option>
              })
            }
          </select>
          <br />
          <label htmlFor="aptSize">전용면적 : ({selectedSizeList && selectedSizeList.length})</label>
          {/* <input type="text" name="aptSize" id="aptSize" onChange={onChange} /> */}
          <select name="aptSize" id="aptSize" onChange={onChange}>
            <option value="">선택하세요</option>
            {
              selectedSizeList && selectedSizeList.map((name, index) => {
                return <option key={index} value={name}>{name}</option>
              })
            }
          </select>
        </div>
        <div className="filter-control-box">
          <button onClick={onFilterRegist} className="habit-button regist">필터 등록</button>
        </div>
        {/* <FilterBox filters={filters} onFilterDelete={onFilterDelete} /> */}
        <p>
          ※ 모든 필터를 삭제할 시 인근아파트 최근 시세에 전체 아파트 정보가 나옵니다.
        </p>
        <hr />
        <div className="filter-addon display-none">
          <span className="filter-control-box">
            <button onClick={onFilterSave} className="habit-button save">
              필터 저장
            </button>
            <button onClick={onFilterReset} className="habit-button reset">
              필터 초기화
            </button>
          </span>
          <ul>
            <li>
              <p>
                필터 저장 : 로컬에 필터를 저장함. 새로고침해도 저장한 필터 기준으로 화면에 보임
              </p>
            </li>
            <li>
              <p>
                필터 초기화 : 브라우저에 저장된 필터를 초기화. 새로고침시 적용
              </p>
            </li>
          </ul>
        </div>
        {/* <div className="filter-show habit-button">
          <button onClick=""><i className="fas fa-plus-square"></i> 기능 더보기</button>
        </div> */}
      </div>
    </article>
  );
};

export default SearchBar;
