import { GetStaticProps } from 'next'
import Link from 'next/link'

import { User } from '../../interfaces'
import { sampleUserData } from '../../utils/sample-data'
import MainLayout from '../../components/MainLayout'
import List from '../../components/List'

// type Props = {
//   items: User[]
// }

// const Team = ({ items }: Props) => (
const Team = () => (
  <MainLayout title="Team" pageTitle="Team">
    <h1>Team</h1>
  </MainLayout>
)

export default Team
