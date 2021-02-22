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
import { CircularProgress } from '@material-ui/core';

const initialState = {
  inquiryPeriodList: [1, 3, 6, 12],
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
    case "REGIST_FILTERS":
      return {
        // inputs: initialState.inputs,
        ...state, // 위와 같은 표현
        filters: action.filters.map((filter) => ({ ...filter, id: new Date() })),
      };
    case "REMOVE_FILTER":
      return {
        ...state,
        filters: state.filters.filter(
          (filter) => filter.id !== action.filter.id
        ),
      };
    case "RESET_FILTER":
      return {
        ...action.initialState
      };
    default:
      return state;
  }
}

const App = ({ openApi }) => {
  let [loadingIndicator, setLoadingIndicator] = useState(true);

  const [inquiryPeriodList, setInquiryPeriodList] = useState(
    initialState.inquiryPeriodList
  );
  const [allAptInfo, setAllAptInfo] = useState([]);
  const [yulgokAptInfo, setYulgokAptInfo] = useState({});
  const [state, dispatch] = useReducer(reducer, initialState);
  const [nearAptPriceInfo, setNearAptPriceInfo] = useState([]);
  const [aptNameList, setAptNameList] = useState([]);
  const [aptSizeObj, setAptSizeObj] = useState({});
  const [selectedSizeList, setSelectedSizeList] = useState([]);

  const [{ aptName, aptSize, inquiryPeriod }, onChange, onSet, reset] = useInputs({
    aptName: "",
    aptSize: "",
    inquiryPeriod: "1",
  });

  const onLoading = () => {
    setLoadingIndicator(true);
  }

  const offLoading = () => {
    setLoadingIndicator(false);
  }

  const { filters } = state;

  /**
   * 1. 컴포넌트가 마운트 되면 아파트 정보를 조회한 후 저장된 Filter 또는 기본 Filter 로 필터링하여 화면에 출력한다.
   */

  useEffect(() => {
    setSelectedSizeList(aptSizeObj[aptName]);
    aptSizeObj[aptName] && onSet({ name: 'aptSize', value: aptSizeObj[aptName][0] });
  }, [aptName]);

  useEffect(() => {
    onLoading();
    openApi
      .getAllAptInfo({ calcMonth: inquiryPeriod })
      .then((data) => {
        console.log(`data : ${data.length}`);
        setAllAptInfo(data);
      });
  }, [inquiryPeriod]);

  useMemo(() => {
    if (!allAptInfo.length) {
      return;
    }
    console.log(`allAptInfo useMemo`);
    setYulgokAptInfo(
      openApi.getFilterAptInfo({ items: allAptInfo, filterAptName: "율곡" })
    );
    // console.log(openApi.getFilterAptInfo({ items: allAptInfo }).newestDealApts);
    setNearAptPriceInfo(
      openApi.getFilterAptInfo({ items: allAptInfo }).newestDealApts
    );
    const aptNameList = openApi.getAptNameList({ items: allAptInfo });
    setAptNameList(aptNameList);
    const aptSizeList = openApi.getAptSizeList({ items: allAptInfo, names: aptNameList });

    setAptSizeObj(aptSizeList);

    // dispatch({
    //   type: "RESET_FILTER",
    //   initialState,
    // })

    console.log(filters);
    let initFilter = [...filters];

    if (!filters.length) {

      initFilter = [
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
      // console.log(initFilter);
      // for (const filter of initFilter) {
      //   dispatch({
      //     type: "REGIST_FILTER",
      //     filter: {
      //       aptName: filter.aptName,
      //       aptSize: filter.aptSize,
      //     },
      //   });
      // }
    }
    dispatch({
      type: "REGIST_FILTERS",
      filters: initFilter,
    });

  }, [allAptInfo])

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
    offLoading();
    console.log(`filter update`);
  }, [filters]);

  const onSearchRangeChange = (event) => {
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


  return (
    <>
      {loadingIndicator === true ? <div className="modal"><div className="modalContent"><CircularProgress className="spinner" /></div><div className="modalLayer"></div></div> : null}
      <SearchBar
        // onSearchRangeChange={onSearchRangeChange}
        inquiryPeriodList={inquiryPeriodList}
        aptName={aptName}
        aptSize={aptSize}
        onChange={onChange}
        onFilterRegist={onFilterRegist}
        onFilterDelete={onFilterDelete}
        filters={filters || []}
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
