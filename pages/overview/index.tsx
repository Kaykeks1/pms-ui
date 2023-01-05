import { GetStaticProps } from 'next'
import Link from 'next/link'

import { User } from '../../interfaces'
import { sampleUserData } from '../../utils/sample-data'
import MainLayout from '../../components/layouts/MainLayout'
import List from '../../components/List'

// type Props = {
//   items: User[]
// }

// const Overview = ({ items }: Props) => (
const Overview = () => (
  <MainLayout title="Overview" pageTitle="Analytics">
    <h1>Analytics</h1>
  </MainLayout>
)

export default Overview
