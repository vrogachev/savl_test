import { FC } from "react";
import { Item } from "../Item/Item";
import styles from "./Items.module.scss";
import { INFT } from "../../interface/collection";

interface ItemsProps {
  collections: INFT[];
}

const Items:FC<ItemsProps> = ({ collections }) => {
  return (
    <div className={styles.block}>
      <div className={styles.block__top}>
        <h2 className={styles.block__title}>My collections</h2>
        <h2 className={[styles.block__title, styles.block__count].join(' ')}>{collections.length}</h2>
      </div>
      <div className={styles.block__container}>
        { collections && collections.map((item) => (
          <Item
            key={item.image}
            uri={item.uri}
            name={item.name}
            image={item.image}
            address={item.address}
          />
        )) }
      </div>
    </div>
  )
}

export default Items;
