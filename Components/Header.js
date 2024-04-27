import styles from '../styles/Header.module.css'
import { useRouter } from 'next/router'

function Header() {
    const router = useRouter()

    const handleLogo = () => {
        router.push('/Academy/Home')
    }

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
                        onClick={handleLogo}
                    />
                </div>
            </nav>
        </>
    )
}

export default Header
