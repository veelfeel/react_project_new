import React from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { setSearchValue } from '../../redux/filter/slice';

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 150),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      <svg className={styles.svgSearch} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <title />
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.svgClear}
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg">
          <g id="cross">
            <line className="cls-1" x1="7" x2="25" y1="7" y2="25" />
            <line className="cls-1" x1="7" x2="25" y1="25" y2="7" />
          </g>
        </svg>
      )}
    </div>
  );
};
