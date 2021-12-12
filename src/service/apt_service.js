import { firebaseDatabase } from "./firebase";

class AptService {
  "use strict";

  constructor() {
    this.getRequestOptions = {
      method: "GET",
      redirect: "follow",
    };
  }

  /**
   * 법정동에 해당하는 아파트 목록 조회
   * @param {*} bjdCode 법정동 코드 10자리 (ex: 2638010100)
   * @returns
   */
  async getLegaldongAptList(bjdCode) {
    if (!bjdCode) {
      return;
    }

    console.log(`bjdCode  : ${bjdCode}`);

    const response = await fetch(
      `https://apt-info.cuvnd.com/getList/apt/legaldong?bjdCode=${bjdCode}&pageNo=1&numOfRows=100`,
      this.getRequestOptions
    );
    const result = await response.json();
    const items = [];

    if (result.items.item && Array.isArray(result.items.item)) {
      for (const item of result.items.item) {
        items.push({
          kaptCode: item.kaptCode,
          kaptName: item.kaptName,
        });
      }
      // items = result.items.item.map((item) => ({
      //   kaptCode: item.kaptCode,
      //   kaptName: item.kaptName,
      // }));
    } else if (result.items.item && !Array.isArray(result.items.item)) {
      items.push(result.items.item);
    }

    return items;
  }

  /**
   * 시군구에 해당하는 아파트 목록 조회
   * @param {*} sigunguCode 시군구 코드 5자리 (ex: 11320)
   * @returns
   */
  async getSigunguAptList(sigunguCode) {
    if (!sigunguCode) {
      return;
    }

    console.log(`bjdCode  : ${sigunguCode}`);

    const response = await fetch(
      `https://apt-info.cuvnd.com/getList/apt/sigungu?sigunguCode=${sigunguCode}&pageNo=1&numOfRows=100`,
      this.getRequestOptions
    );
    const result = await response.json();
    const items =
      result.items.item &&
      result.items.item.map((item) => ({
        kaptCode: item.kaptCode,
        kaptName: item.kaptName,
      }));
    return items || [];
  }

  /**
   * 시도 목록 조회
   * @param {*} userId
   * @param {*} onUpdate
   * @returns
   */
  getLevel1(callback) {
    const ref = firebaseDatabase.ref("baseinfo/bjdlist/level_1");
    ref
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          callback(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getLevel2(id, callback) {
    console.log(`getlevel2 id : ${id}`);
    const ref = firebaseDatabase.ref(`baseinfo/bjdlist/level_2/${id}`);
    ref
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          callback(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getLevel3(id, callback) {
    console.log(`getlevel2 id : ${id}`);
    const ref = firebaseDatabase.ref(`baseinfo/bjdlist/level_3/${id}`);
    ref
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          callback(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * 내 아파트 정보 저장
   * @param {*}} userId 사용자 고유 id
   * @param {*} kaptCode  아파트 코드
   * @param {*} kaptName  아파트 명
   */
  setMyApt(userId, kaptCode, kaptName, sigunguCode) {
    firebaseDatabase.ref(`baseinfo/myApt/${userId}`).set({
      kaptCode: kaptCode,
      kaptName: kaptName,
      sigunguCode: sigunguCode,
    });
  }

  /**
   * 내 아파트 정보 조회
   * @param {*} userId
   * @param {*} callback ({kaptCode, kaptName, sigunguCode})
   */
  getMyApt(userId, callback) {
    const ref = firebaseDatabase.ref(`baseinfo/myApt/${userId}`);

    ref
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          callback(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * 저장된 아파트 정보 삭제
   */
  removeApt() {
    firebaseDatabase.ref(`baseinfo/bjdlist/level_2`).remove();
  }
}

export default AptService;
