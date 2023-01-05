import AuthLayout from '../../../components/layouts/AuthLayout';
import Link from 'next/link'
import styles from '../../../styles/auth.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Signup = () => {
    const [form, setForm] = useState({ name: '', firstName: '', lastName:'', email: '', password: '', confirmPassword: '' });
    const router = useRouter()
    const handleChange = (event) => {
        switch(event.target.name){
            case 'name':
                setForm({ ...form, name: event.target.value });
                break;
            case 'firstName':
                setForm({ ...form, firstName: event.target.value });
                break;
            case 'lastName':
                setForm({ ...form, lastName: event.target.value });
                break;
            case 'email':
                setForm({ ...form, email: event.target.value });
                break;
            case 'password':
                setForm({ ...form, password: event.target.value });
                break;
            case 'confirmPassword':
                setForm({ ...form, confirmPassword: event.target.value });
                break;
        }
    }
    const signup = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...form}
            if (form.password === form.confirmPassword) {
                delete payload.confirmPassword
                const response = await axios.post('http://127.0.0.1:3001/auth/signup', payload)
                const data = response.data
                router.push('/')
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
            } else {
                alert('Password confirmation failed')
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
    return (<AuthLayout title="Projects" pageTitle="Projects">
        <h1 className={styles["title"]}>Sign up</h1>
        <form className={styles["form"]} onSubmit={signup}>
            <div className={styles["input-field"]}>
                <label>Organization Name:</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} />
            </div>
            <div className={styles["input-field"]}>
                <label>First Name:</label>
                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} />
            </div>
            <div className={styles["input-field"]}>
                <label>Last Name:</label>
                <input type="text" name="lastName" value={form.lastName} onChange={handleChange} />
            </div>
            <div className={styles["input-field"]}>
                <label>Email:</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} />
            </div>
            <div className={styles["input-field"]}>
                <label>Password:</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} />
            </div>
            <div className={styles["input-field"]}>
                <label>Confirm Password:</label>
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
            </div>
            <button className={styles["submit-btn"]} type='submit'>Sign up</button>
        </form>
        <p className={styles["question"]}>Already have an account? <Link href="/auth/signin">Sign in</Link></p>
    </AuthLayout>)
}
export default Signup
