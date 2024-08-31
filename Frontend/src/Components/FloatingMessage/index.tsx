import styles from './style.module.scss'

type FloatingMessageProps = {
    msg: string;
    variant?: 'success' | 'error';
}
export const FloatingMessage = ({msg, variant}: FloatingMessageProps) => {
    return (
        <div className={`${styles.floatingMessage} ${styles[variant]}`}>
            {msg}
        </div>
    )
}