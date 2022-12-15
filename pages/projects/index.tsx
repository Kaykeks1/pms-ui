import { GetStaticProps } from 'next'
import Link from 'next/link'

import { User } from '../../interfaces'
import { sampleUserData } from '../../utils/sample-data'
import MainLayout from '../../components/MainLayout'
import List from '../../components/List'

// type Props = {
//   items: User[]
// }

// const Projects = ({ items }: Props) => (
const Projects = () => (
  <MainLayout title="Projects" pageTitle="Projects">
    <h1>Projects</h1>
  </MainLayout>
)

export default Projects
