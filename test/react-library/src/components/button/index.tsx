import styles from './styles.module.scss';

export type ButtonProps = {
  children?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};
