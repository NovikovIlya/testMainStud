import { LogoSvg } from "../../assets/svg/LogoSvg";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <LogoSvg />
    </header>
  );
};
