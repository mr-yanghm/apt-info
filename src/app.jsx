import React, { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import AptInfo from "./components/AptInfo";
import SearchBar from './components/SearchBar';
import useInputs from './Hooks/useInputs';

const initialState = {
  searchRangeList: [1],
  selectedRangeIndex: 0,
  filters: []
}

function reducer(state, action) {
  switch (action.type) {
    case "REGIST_FILTER":
      return {
        // inputs: initialState.inputs,
        ...state, // 위와 같은 표현
        filters: state.filters.concat(action.filter),
      };
    case "REMOVE_FILTER":
      return {
        ...state,
        filters: state.filters.filter((filter) => filter.aptName !== action.aptName),
      };
    default:
      return state;
  }
}

function activeFilter(data) {
  return data;
}

const App = ({ openApi }) => {
  const [searchRangeList, setSearchRangeList] = useState(initialState.searchRangeList);
  const [selectedRangeIndex, setSelectedRangeIndex] = useState(initialState.selectedRangeIndex);
  const [allAptInfo, setAllAptInfo] = useState({});
  const [yulgokAptInfo, setYulgokAptInfo] = useState({});
  const [state, dispatch] = useReducer(reducer, initialState);
  const [nearAptPriceInfo, setNearAptPriceInfo] = useState([]);

  const [{ aptName, aptSize }, onChange, reset] = useInputs({
    aptName: "",
    aptSize: "",
  });

  useEffect(() => {
    openApi.getAllAptInfo({ calcMonth: searchRangeList[selectedRangeIndex] }).then((data) => {
      setAllAptInfo(data);
      setYulgokAptInfo(openApi.getFilterAptInfo({ items: data }));
      // console.log(openApi.getFilterAptInfo({ items: data }));
    })
  }, [searchRangeList]);

  const handleChange = (event) => {
    openApi.getAllAptInfo({ calcMonth: event.target.value }).then((data) => {
      setAllAptInfo(data);
      setYulgokAptInfo(openApi.getFilterAptInfo({ items: data }));
    })
  }

  const { filters } = state;

  const onFilterRegist = useCallback(() => {
    // console.log(`aptName : ${aptName}, aptSize : ${aptSize}`);
    dispatch({
      type: "REGIST_FILTER",
      filter: {
        aptName: aptName,
        aptSize: aptSize,
      },
    });
    // console.log(filters);
    // console.log(`aptName : ${aptName}, aptSize : ${aptSize}`);

    // setNearAptPriceInfo(openApi.getFilterAptInfo({ items: allAptInfo, filterAptName: aptName, filterAptSize: aptSize }));
  });

  useMemo(() => {
    // setNearAptPriceInfo(openApi.getFilterAptInfo({ items: allAptInfo, filterAptName: aptName, filterAptSize: aptSize }));
    const result = [];
    for (const filter of filters) {
      result.push(...openApi.getFilterAptInfo({ items: allAptInfo, filterAptName: filter.aptName, filterAptSize: filter.aptSize }).newestDealApts);
    }
    setNearAptPriceInfo(result);
  }, [filters]);

  return (
    <>
      <SearchBar
        handleChange={handleChange}
        searchRangeList={searchRangeList}
        aptName={aptName}
        aptSize={aptSize}
        onChange={onChange}
        onFilterRegist={onFilterRegist}
        filters={filters} />
      <AptInfo aptInfo={yulgokAptInfo} nearAptPriceInfo={nearAptPriceInfo} />
    </>);
};

export default App;
