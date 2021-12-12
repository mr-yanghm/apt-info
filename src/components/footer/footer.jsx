import React, { memo } from "react";
import styles from "./footer.module.css";

const Footer = memo(() => (
  <footer className={styles.footer}>
    <ul>
      <li>
        <p>
          해당 자료는
          <a href="https://www.data.go.kr/">https://www.data.go.kr/</a>
          에서 제공하는 자료중 "군포시"에 해당하는 자료를 바탕으로 만들었습니다.
        </p>
      </li>
      <li>
        <p>
          자료는 공공데이터 포털에 1일 주기로 갱신되며 해당화면은 새로고침 시
          새로운 자료를 받아옵니다.
        </p>
      </li>
      <li>
        <p>조회기간은 이번 월(n)부터 1개월전 월(n-1)까지 입니다.</p>
      </li>
    </ul>
    <p>© 2021 yulgokapt CEO(yulgok.apt@gmail.com)</p>
  </footer>
));

export default Footer;
