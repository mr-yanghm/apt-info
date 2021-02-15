import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import "./app.css";
import AptInfo from "./components/AptInfo";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import useInputs from "./Hooks/useInputs";

const initialState = {
  searchRangeList: [1],
  selectedRangeIndex: 0,
  filters: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "REGIST_FILTER":
      return {
        // inputs: initialState.inputs,
        ...state, // 위와 같은 표현
        filters: [...state.filters, { ...action.filter, id: new Date() }],
      };
    case "REMOVE_FILTER":
      return {
        ...state,
        filters: state.filters.filter(
          (filter) => filter.id !== action.filter.id
        ),
      };
    default:
      return state;
  }
}

const App = ({ openApi }) => {
  const [searchRangeList, setSearchRangeList] = useState(
    initialState.searchRangeList
  );
  const [selectedRangeIndex, setSelectedRangeIndex] = useState(
    initialState.selectedRangeIndex
  );
  const [allAptInfo, setAllAptInfo] = useState([]);
  const [yulgokAptInfo, setYulgokAptInfo] = useState({});
  const [state, dispatch] = useReducer(reducer, initialState);
  const [nearAptPriceInfo, setNearAptPriceInfo] = useState([]);
  const [aptNameList, setAptNameList] = useState([]);
  const [aptSizeObj, setAptSizeObj] = useState({});
  const [selectedSizeList, setSelectedSizeList] = useState([]);

  const [{ aptName, aptSize }, onChange, onSet, reset] = useInputs({
    aptName: "",
    aptSize: "",
  });

  useEffect(() => {
    openApi
      .getAllAptInfo({ calcMonth: searchRangeList[selectedRangeIndex] })
      .then((data) => {
        setAllAptInfo(data);
        setYulgokAptInfo(
          openApi.getFilterAptInfo({ items: data, filterAptName: "율곡" })
        );
        setNearAptPriceInfo(
          openApi.getFilterAptInfo({ items: data }).newestDealApts
        );
        const aptNameList = openApi.getAptNameList({ items: data });
        setAptNameList(aptNameList);
        const aptSizeList = openApi.getAptSizeList({ items: data, names: aptNameList });

        setAptSizeObj(aptSizeList);
        // setSelectedSizeList(aptSizeList[aptNameList[0]]);

        // console.log(openApi.getFilterAptInfo({ items: data }));

        let initFilter = [
          { aptName: "한라", aptSize: 41.85 },
          { aptName: "한라", aptSize: 51.66 },
          { aptName: "래미안", aptSize: 59.94 },
          { aptName: "충무", aptSize: 41.4 },
          { aptName: "충무", aptSize: 41.85 },
          { aptName: "충무", aptSize: 42.75 },
          { aptName: "충무", aptSize: 44.06 },
          { aptName: "세종", aptSize: 58.46 },
          { aptName: "세종", aptSize: 58.71 },
          { aptName: "우륵", aptSize: 58.46 },
          { aptName: "우륵", aptSize: 58.71 },
        ];
        const filterSaved = localStorage.getItem("aptInfoFilter");
        if (filterSaved && JSON.parse(filterSaved).length) {
          initFilter = JSON.parse(filterSaved);
          document.querySelector('.filter-addon').style.display = 'block';
        }
        for (const filter of initFilter) {
          dispatch({
            type: "REGIST_FILTER",
            filter: {
              aptName: filter.aptName,
              aptSize: filter.aptSize,
            },
          });
        }
      });
  }, [searchRangeList]);


  useEffect(() => {
    setSelectedSizeList(aptSizeObj[aptName]);
    aptSizeObj[aptName] && onSet({ name: 'aptSize', value: aptSizeObj[aptName][0] });
  }, [aptName]);

  const handleChange = (event) => {
    openApi.getAllAptInfo({ calcMonth: event.target.value }).then((data) => {
      setAllAptInfo(data);
      setYulgokAptInfo(
        openApi.getFilterAptInfo({ items: data, filterAptName: "율곡" })
      );
      setNearAptPriceInfo(
        openApi.getFilterAptInfo({ items: data }).newestDealApts
      );
    });
  };

  const { filters } = state;

  const onFilterRegist = useCallback(() => {
    if (!aptName) return alert('필터등록은 아파트명이 필수입니다.');

    dispatch({
      type: "REGIST_FILTER",
      filter: {
        aptName: aptName,
        aptSize: aptSize,
      },
    });
    document.querySelector('.filter-addon').style.display = 'block';
  });

  const onFilterDelete = useCallback((filter) => {
    dispatch({
      type: "REMOVE_FILTER",
      filter: {
        id: filter.id,
        aptName: filter.aptName,
        aptSize: filter.aptSize,
      },
    });
    document.querySelector('.filter-addon').style.display = 'block';
  });

  const onFilterSave = () => {
    if (window.confirm('이 기능은 새로고침해도 현재 필터를 유지하는 기능입니다. 필터를 저장하시겠습니까?')) {
      localStorage.setItem("aptInfoFilter", JSON.stringify(filters));
    }
  };

  const onFilterReset = () => {
    localStorage.removeItem("aptInfoFilter");
    alert('로컬에 저장된 필터가 초기화 되었습니다.');
    document.location.reload();
  };

  useMemo(() => {
    const result = [];
    for (const filter of filters) {
      result.push(
        ...openApi.getFilterAptInfo({
          items: allAptInfo,
          filterAptName: filter.aptName,
          filterAptSize: filter.aptSize,
        }).newestDealApts
      );
    }
    if (filters.length === 0 && allAptInfo.length > 0) {
      result.push(
        ...openApi.getFilterAptInfo({ items: allAptInfo }).newestDealApts
      );
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
        onFilterDelete={onFilterDelete}
        filters={filters}
        onFilterSave={onFilterSave}
        onFilterReset={onFilterReset}
        aptNameList={aptNameList}
        selectedSizeList={selectedSizeList}
      />
      <AptInfo aptInfo={yulgokAptInfo} nearAptPriceInfo={nearAptPriceInfo} />
      <Footer />
    </>
  );
};

export default App;
