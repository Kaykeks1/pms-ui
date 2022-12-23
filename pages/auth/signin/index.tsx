import AuthLayout from '../../../components/AuthLayout';
import Link from 'next/link'
import styles from '../../../styles/auth.module.css';

const Signin = () => (
    <AuthLayout title="Projects" pageTitle="Projects">
        <h1 className={styles["title"]}>Signin</h1>
        <form className={styles["form"]}>
            <div className={styles["input-field"]}>
                <label>Email:</label>
                <input type="text" name="name" />
            </div>
            <div className={styles["input-field"]}>
                <label>Password:</label>
                <input type="password" name="name" />
            </div>
            <button className={styles["submit-btn"]} type='submit'>Signin</button>
        </form>
        {/* <p>Already have an account?</p>{' '}<p>Sign up</p> */}
        <p className={styles["question"]}>Don't have an account? <Link href="/auth/signup">Sign up</Link></p>
    </AuthLayout>
)

export default Signin
