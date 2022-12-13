import Link from 'next/link'
// import Layout from '../components/Layout'
import MainLayout from '../components/MainLayout'

const IndexPage = () => (
  // <Layout title="Home | Next.js + TypeScript Example">
  //   <h1>Hello Next.js 👋</h1>
  //   <p>
  //     <Link href="/about">About</Link>
  //   </p>
  // </Layout>
  <MainLayout>
    <h1>Hello Next.js 👋</h1>
     <p>
       <Link href="/about">About</Link>
    </p>
  </MainLayout>
)

export default IndexPage
