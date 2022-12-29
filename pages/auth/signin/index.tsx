import AuthLayout from '../../../components/AuthLayout';
import Link from 'next/link'
import styles from '../../../styles/auth.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

const Signin = () => {
    const [form, setForm] = useState({ email: '', password: '' });
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
    const signin = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...form}
            const response = await axios.post('http://127.0.0.1:3001/auth/signin', payload)
            const data = response.data
            router.push('/')
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            const cookies = new Cookies();
            cookies.set('token', data.token, { path: '/' });
            cookies.set('user', JSON.stringify(data.user), { path: '/' });
        } catch (error) {
            console.log(error)
        }
    }
    return (<AuthLayout title="Projects" pageTitle="Projects">
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
            <button className={styles["submit-btn"]} type='submit'>Sign in</button>
        </form>
        <p className={styles["question"]}>Don't have an account? <Link href="/auth/signup">Register</Link></p>
    </AuthLayout>
)}

export default Signin
