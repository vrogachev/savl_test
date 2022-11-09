import { memo } from "react";
import styles from './Skeleton.module.scss';


const Skeleton = () => {
  return (
    <div className={styles.item}>
      <div className={styles.item__pacman}>
        <div className={[styles.item__pacman_jaw, styles.item__pacman_top].join(' ')}></div>
        <div className={[styles.item__pacman_jaw, styles.item__pacman_bottom].join(' ')}></div>
      </div>
      <div className={styles.item__food}>
        <div className={styles.item__food_item} />
        <div className={styles.item__food_item} />
      </div>
    </div>
  )
}

export default memo(Skeleton);
