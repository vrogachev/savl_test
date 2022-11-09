import { FC } from "react";
import styles from "./Error.module.scss";

interface ErrorProps {
  error: string;
}

const Error:FC<ErrorProps> = ({ error }) => {
  return (
    <div className={styles.block}>
      <p className={styles.block__text}>{error}</p>
    </div>
  )
}

export default Error;
