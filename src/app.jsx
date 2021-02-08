import React, { useState } from 'react';
import AptInfo from './components/AptInfo';

const App = ({ openApi }) => {
  const [aptInfo, setAptInfo] = useState({});
  const search = (query) => {
    openApi
      .search(query || '202101')
      .then((data) => {
        console.log(data.items.item.filter((data) => {
          return data.아파트 === '율곡'
        }));
      }
      );
  }

  search();

  // useEffect(() => {
  //   youtube //
  //     .mostPopular()
  //     .then((items) => setVideos(items));
  // }, [youtube]);

  return (
    <AptInfo />
  );
};

export default App;