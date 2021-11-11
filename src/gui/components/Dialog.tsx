import { ReactNode } from 'react';
import styles from './Dialog.module.css';

interface FrameProps {
  children: ReactNode;
};

export function Frame(props: FrameProps) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.frame}>{props.children}</div>
    </div>
  );
}

interface HeaderProps {
  children: ReactNode;
};

export function Header(props: HeaderProps) {

  return (
    <div className={styles.header}>
      {props.children}
    </div>
  );
}

interface TitleProps {
  children: ReactNode;
};

export function Title(props: TitleProps) {
  return (
    <div className={styles.title}>{props.children}</div>
  );
}

interface BodyProps {
  children: ReactNode;
};

export function Body(props: BodyProps) {

  return (
    <div className={styles.body}>
      {props.children}
    </div>
  );
}

interface FooterProps {
  children: ReactNode;
};

export function Footer(props: FooterProps) {

  return (
    <div className={styles.footer}>
      {props.children}
    </div>
  );
}
