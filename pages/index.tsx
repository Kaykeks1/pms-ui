import Link from 'next/link'
import MainLayout from '../components/layouts/MainLayout'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const IndexPage = () => {
  const router = useRouter()
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token")
    if (isAuthenticated) {
      router.push('/overview')
    } else {
      router.push('/auth/signin')
    }
  }, []);
  return (
    <MainLayout>
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">About</Link>
      </p>
    </MainLayout>
  )
}

export default IndexPage
