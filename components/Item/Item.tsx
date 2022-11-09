import { memo } from "react";
import Image from "next/image";
import Icon from "../Icon/Icon";
import styles from "./Item.module.scss";
import { INFT } from "../../interface/collection";


export const Item = memo(function ListItem({
   uri, name, image
}: INFT) {
  return (
    <div className={styles.item}>
      <div className={styles.item__image}>
        <Image
          fill
          src={image}
          alt={name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.item__desc}>
        <a href={uri} className={styles.item__link}>
          {name}
          <Icon name="arrow" className={styles.item__arrow} />
        </a>
      </div>
    </div>
  )
});
