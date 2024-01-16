import AuthLayout from '../../../components/layouts/AuthLayout';
import Link from 'next/link'
import styles from '../../../styles/auth.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import toast from "../../../utils/toast"

const Signin = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const handleChange = (event) => {
        switch(event.target.name){
            case 'email':
                setForm({ ...form, email: event.target.value });
                break;
            case 'password':
                setForm({ ...form, password: event.target.value });
                break;
        }
    }
    const disableSignin = () => !(!!form.email && !!form.password)
    const signin = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...form}
            setLoading(true)
            const response = await axios.post(`${process.env.BASE_API_URL}/auth/signin`, payload)
            setLoading(false)
            const data = response.data
            toast("success", 'Login successful', undefined)
            router.push('/')
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            const cookies = new Cookies();
            cookies.set('token', data.token, { path: '/' });
            cookies.set('user', JSON.stringify(data.user), { path: '/' });
        } catch (error) {
            setLoading(false)
            toast("error", error.response.data.message, undefined)
        }
    }
    return (<AuthLayout title="Projects" pageTitle="Projects" pageType="signin">
        <h1 className={styles["title"]}>Sign in</h1>
        <form className={styles["form"]} onSubmit={signin}>
            <div className={styles["input-field"]}>
                <label>Email:</label>
                <input type="text" name="email" value={form.email} onChange={handleChange} />
            </div>
            <div className={styles["input-field"]}>
                <label>Password:</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} />
            </div>
            <button className={styles["submit-btn"]} type='submit' disabled={disableSignin()} style={disableSignin() ? { cursor: 'not-allowed', backgroundColor: 'grey' } : { cursor: 'pointer' }}>
                {
                    loading ? (<i className="fa fa-circle-o-notch fa-spin" />) : 'Sign in'
                }
            </button>
        </form>
        <p className={styles["question"]}>Don't have an account? <Link href="/auth/signup">Register</Link></p>
    </AuthLayout>
)}

export default Signin
