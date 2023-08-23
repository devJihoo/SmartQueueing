import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { db } from "./fBase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  onSnapshot,
  setDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [time, setTime] = useState("-");

  //** 일회성 times 받아오기 (사용 X)*/
  const getTimes = async () => {
    const querySnapshot = await getDocs(collection(db, "times"));
    querySnapshot.forEach((document) => {
      console.log(document.data());
      setTime(document.data().submittedTime);
    });
  };

  const getTimeRealtime = () => {
    const gettedTimes = query(collection(db, "times"));
    onSnapshot(gettedTimes, (snapshot) => {
      const gettedTime = snapshot.docs.map((doc) => {
        return { a: doc.time, ...doc.data() };
      });

      setTime(gettedTime[gettedTime.length - 1].time);
    });
  };

  useEffect(() => {
    getTimeRealtime();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1 className={styles.title}>스마트 줄서기</h1>

      <h2 className={styles.paragraph}>
        현재 대기 시간:{" "}
        {time === "-" ? (
          <span className={styles.point} style={{ fontSize: "120%" }}>
            {time}
          </span>
        ) : parseInt(time) > 5 ? (
          <span className={styles.point} style={{ fontSize: "120%" }}>
            약 {time}분
          </span>
        ) : (
          <span className={styles.point} style={{ fontSize: "120%" }}>
            약 5분 미만
          </span>
        )}
      </h2>
      <div style={{ marginTop: "170px" }}>
        <a href="https://github.com/devJihoo/SmartQueueing" target="_blank">
          <span style={{ color: "black" }}>Developed by Jihoo</span>
          <img
            style={{ width: "20px" }}
            src="https://github.githubassets.com/pinned-octocat.svg"
          />
        </a>
      </div>
    </div>
  );
}

export default App;
