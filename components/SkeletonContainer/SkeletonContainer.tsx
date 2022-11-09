import Skeleton from "../Skeleton/Skeleton";
import styles from './SkeletonContainer.module.scss';

const placeholder = new Array(6).fill({});

const SkeletonContainer = () => {
  return (
    <div className={styles.block}>
      <h2 className={styles.block__title}>Wait a bit…</h2>
      <div className={styles.block__container}>
        { placeholder.map(({ index }) => (
          <Skeleton key={index} />
        )) }
      </div>
    </div>
  )
}

export default SkeletonContainer;
