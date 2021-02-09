import React from 'react';
import FilterBox from './FilterBox';

const SearchBar = ({ searchRangeList, handleChange, onChange, onFilterRegist, filters }) => {
    return (
        <>
            <div>
                <span>현재월을 제외한 최근 </span>
                <select name="searchRange" id="searchRange" onChange={handleChange}>
                    {
                        searchRangeList.map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                        ))
                    }
                </select>
                <select name="searchValue" id="searchValue">
                    <option value="month">개월</option>
                </select>
            </div>
            <div>
                <label htmlFor="aptName">아파트명 : </label><input type="text" name="aptName" id="aptName" onChange={onChange} />
                <label htmlFor="aptSize">전용면적 : </label><input type="text" name="aptSize" id="aptSize" onChange={onChange} />
                <button onClick={onFilterRegist}>등록</button>
                <FilterBox filters={filters} />
            </div>
        </>
    )
};

export default SearchBar;