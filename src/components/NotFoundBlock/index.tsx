import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => {
  return (
    <>
      <h1 className={styles.root}>Ничего не найдено 😕</h1>
      <span className={styles.description}>
        Похоже, что данная страница в нашем интернет-магазине отсутствует
      </span>
    </>
  );
};
