import React, { useState } from "react";
import AptInfo from "./components/AptInfo";

const App = ({ openApi }) => {
  const [aptInfo, setAptInfo] = useState({});
  const search = (query) => {
    return openApi.highestPriceApt().then((data) => {
      console.log(data);
    });
    // return openApi
    //   .search(query || '202101')
    //   .then((data) => {

    //     const allData = data.items.item.filter((data) => {
    //       return data.아파트 === '율곡'
    //     });

    //     console.log(allData);
    //     const sizeArr = allData.map((data) => {
    //       return data.전용면적;
    //     })

    //     console.log(new Set(sizeArr));

    //     console.log([...new Set(sizeArr)].map((data) => {
    //       return data / 3.3;
    //     }));
    //   }
    //   );
  };

  search();

  // useEffect(() => {
  //   youtube //
  //     .mostPopular()
  //     .then((items) => setVideos(items));
  // }, [youtube]);

  return <AptInfo />;
};

export default App;
