import React from "react";

const Footer = (props) => (
  <footer>
    <ul>
      <li>
        해당 자료는{" "}
        <a href="https://www.data.go.kr/">https://www.data.go.kr/</a>
        에서 제공하는 자료를 토대로 만들었습니다.
      </li>
      <li>
        자료는 공공데이터 포털에 1일 주기로 갱신되며 해당화면은 새로고침 시
        새로운 자료를 받아옵니다.
      </li>
      <li>조회기간은 이번 월(n)부터 1개월전 월(n-1)까지 입니다.</li>
    </ul>
    <p>© 2021 yulgokapt CEO(yulgok.apt@gmail.com)</p>
  </footer>
);

export default Footer;
