import Icon from "../Icon/Icon";
import styles from "./Search.module.scss";
import React, { memo, useEffect, useRef, useState } from "react";

interface SearchProps {
  defaultValue: string;
  onSubmit: (search: string) => void;
}

const Search = memo(function Search({
  onSubmit,
  defaultValue
}: SearchProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>(defaultValue || "")

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(value)
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  }

  const handleOnReset = () => setValue("");

  useEffect(() => {
    value.length === 0 && ref?.current?.focus();
  }, [value]);

  return (
    <div className={styles.block}>
      <h1 className={styles.block__title}>Search <span className={styles.block__title_accent}>NFT-collection</span> by address</h1>
      <form className={styles.form} onSubmit={handleOnSubmit}>
        <label htmlFor="SearchNFTCollectionInput" className={styles.form__label}>
          <Icon name="search" className={styles.form__label_icon} />
          <input
            ref={ref}
            value={value}
            onChange={handleOnChange}
            className={styles.form__input}
            defaultValue={defaultValue}
            id="SearchNFTCollectionInput"
            placeholder="Search by address"
          />
          <button
            type="reset"
            aria-label="Clear"
            onClick={handleOnReset}
            className={styles.form__clear}
          >
            <Icon name="clear" className={styles.form__clear_icon} />
          </button>
        </label>

        <button type="submit" className={styles.form__button}>Search</button>
      </form>
    </div>
  )
});


export default Search;
