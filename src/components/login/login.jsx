import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './login.module.css';

const Login = ({ authService }) => {
  const history = useHistory();
  const goToMaker = userId => {
    history.push({
      pathname: '/home',
      state: { id: userId },
    });
  };

  const onLogin = event => {
    authService //
      .login(event.currentTarget.textContent)
      .then(data => goToMaker(data.user.uid));
  };

  const onLoginExt = () => alert("이 서비스는 준비중입니다.");

  useEffect(() => {
    authService.onAuthChange(user => {
      user && goToMaker(user.id);
    });
  });

  return (
    <section className={styles.login}>
      <Header />
      <section className={styles.section}>
        <h1>아래의 방법으로 서비스를 시작할 수 있습니다.</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Google
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Github
            </button>
          </li>
          <li className={`${styles.item} ${styles.notUse}`}>
            <button className={styles.button} onClick={onLoginExt}>
              Kakao
            </button>
          </li>
        </ul>
      </section>
      <Footer />
    </section>
  );
};

export default Login;