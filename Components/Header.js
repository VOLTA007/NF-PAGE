import styles from '../styles/Header.module.css'



function Header() {
    return (
        <>
            <div className={styles.header1}>
                <p className={styles.paragraph1}>Welcome To Nutri Fit</p>
            </div>

            <nav className={styles.navcontainer}>
                <div className="absolute left-2 top-2">
                    <img
                        className={styles.Logo}
                        src="/Nutrifitlogo.jpg"
                        alt="Logo"
                    />
                </div>
            </nav>
        </>
    )
}

export default Header
