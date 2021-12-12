import React, { useEffect, useRef, useState } from "react";
import SelectBox from "./selectBox/selectBox";
import styles from "./searchApt.module.css";
import { useHistory } from "react-router";

const SearchApt = ({
  authService,
  aptService,
  onChangeSelectBox_1,
  onChangeSelectBox_2,
  onChangeSelectBox_3,
  onRegistApt,
  level1datas,
  level1,
  level2datas,
  level2,
  level3datas,
  level3,
  aptdatas,
}) => {
  const historyState = useHistory().state;
  const [userId, setUserId] = useState(historyState && historyState.id);

  const radioRef = useRef();
  const [selectedMyApt, setSelectedMyApt] = useState({
    kaptCode: null,
    kaptName: null,
    sigunguCode: null,
  });

  const onChangeRadio = (event) => {
    setSelectedMyApt({
      kaptCode: event.target.value,
      kaptName: document.querySelector(`label[for=${event.target.value}]`)
        .textContent,
      sigunguCode: level3.value.substr(0, 5),
    });
  };

  const onClickRegistBtn = (event) => {
    onRegistApt(selectedMyApt);
  };

  useEffect(() => {
    console.log(level3);
    !level3.value &&
      setSelectedMyApt({
        kaptCode: null,
        kaptName: null,
        sigunguCode: null,
      });
    // aptService.setMyApt(userId, selectedMyApt.kaptCode, selectedMyApt.kaptName);
  }, [level3]);

  useEffect(() => {
    console.log(selectedMyApt);
    // aptService.setMyApt(userId, selectedMyApt.kaptCode, selectedMyApt.kaptName);
  }, [selectedMyApt]);

  return (
    <>
      <SelectBox
        dataName="level_1"
        datas={level1datas}
        onChangeSelectBox={onChangeSelectBox_1}
      />
      {level1.value && (
        <SelectBox
          dataName="level_2"
          datas={level2datas}
          onChangeSelectBox={onChangeSelectBox_2}
        />
      )}
      {level2.value && (
        <SelectBox
          dataName="level_3"
          datas={level3datas}
          onChangeSelectBox={onChangeSelectBox_3}
        />
      )}
      <ul>
        {aptdatas &&
          aptdatas.map((data) => {
            return (
              <li key={data.kaptCode}>
                <input
                  ref={radioRef}
                  type="radio"
                  id={data.kaptCode}
                  name="myApt"
                  value={data.kaptCode}
                  onChange={onChangeRadio}
                />
                <label htmlFor={data.kaptCode}>{data.kaptName}</label>
              </li>
            );
          })}
      </ul>
      {selectedMyApt.kaptCode && (
        <button className={styles.rigistBtn} onClick={onClickRegistBtn}>
          등록
        </button>
      )}
    </>
  );
};

export default SearchApt;
