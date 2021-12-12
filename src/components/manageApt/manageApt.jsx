import React, { useCallback, useEffect, useState } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import SearchApt from "./searchApt/searchApt";
import styles from "./manageApt.module.css";
import { useHistory } from "react-router";

const ManageApt = ({ openApi, authService, aptService }) => {
  const historyState = useHistory().state;
  const [userId, setUserId] = useState(historyState && historyState.id);
  const history = useHistory();

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        history.push("/");
      }
    });
  }, [authService, userId, history]);

  const [level1datas, setLevel1datas] = useState([]);
  const [level1, setLevel1] = useState({ code: "", value: "" });

  const [level2datas, setLevel2datas] = useState([]);
  const [level2, setLevel2] = useState({ code: "", value: "" });

  const [level3datas, setLevel3datas] = useState([]);
  const [level3, setLevel3] = useState({ code: "", value: "" });

  const [aptdatas, setAptdatas] = useState([]);
  const [myApt, setMyApt] = useState({});

  useEffect(() => {
    aptService.getLevel1((data) => {
      const level1datas = [{ code: "", value: "선택하세요." }];
      for (const key in data) {
        level1datas.push(data[key]);
      }
      setLevel1datas(level1datas);
    });

    // aptService.save_level_2();
  }, [aptService]);

  useEffect(() => {
    setLevel2datas(null);
    setLevel2("");
    setLevel3datas(null);

    level1.value &&
      aptService.getLevel2(level1.value, (data) => {
        console.log(`getLevel2 호출 : ${level1.value}`);
        const _level2datas = [{ code: "", value: "선택하세요." }];
        for (const key in data) {
          _level2datas.push({
            code: data[key].code,
            value: data[key].value.replace(`${level1.text} `, ""),
          });
        }
        // console.log(`setLevel2datas : ${level2datas}`);
        setLevel2datas(_level2datas);
      });

    setAptdatas([]);
  }, [level1]);

  useEffect(() => {
    setLevel3datas([]);

    level2.value &&
      aptService.getLevel3(level2.value, (data) => {
        const level3datas = [{ code: "", value: "선택하세요." }];
        for (const key in data) {
          level3datas.push({
            code: data[key].code,
            value: data[key].value
              .replace(`${level1.text} `, "")
              .replace(`${level2.text} `, ""),
          });
        }
        // console.log(`setLevel3datas : ${level3datas}`);
        setLevel3datas(level3datas);
      });
    setAptdatas([]);
  }, [level2]);

  useEffect(() => {
    level3.value && console.log(`level3.value : ${level3.value}`);
    !level2.value && setLevel3datas([]);

    aptService.getLegaldongAptList(level3.value).then((data) => {
      setAptdatas(data);
    });
  }, [level3]);

  const onLogout = useCallback(() => {
    console.log(`onLogout click`);
    console.log(authService);
    authService.logout();
  }, [authService]);

  const onChangeSelectBox_1 = ({ value, text }) => {
    console.log(`onChangeSelectBox value : ${value}`);
    setLevel1({ value, text });
  };

  const onChangeSelectBox_2 = ({ value, text }) => {
    console.log(`onChangeSelectBox value : ${value}`);
    setLevel2({ value, text });
  };

  const onChangeSelectBox_3 = ({ value, text }) => {
    console.log(`onChangeSelectBox value : ${value}`);
    setLevel3({ value, text });
  };

  const onRegistApt = (data) => {
    aptService.setMyApt(userId, data.kaptCode, data.kaptName, data.sigunguCode);

    history.push("/home");
  };

  return (
    <section className={styles.searchApt}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <SearchApt
          authService={authService}
          aptService={aptService}
          onChangeSelectBox_1={onChangeSelectBox_1}
          onChangeSelectBox_2={onChangeSelectBox_2}
          onChangeSelectBox_3={onChangeSelectBox_3}
          onRegistApt={onRegistApt}
          level1datas={level1datas}
          level1={level1}
          level2datas={level2datas}
          level2={level2}
          level3datas={level3datas}
          level3={level3}
          aptdatas={aptdatas}
        />
      </div>
      {/* <Footer /> */}
    </section>
  );
};

export default ManageApt;
