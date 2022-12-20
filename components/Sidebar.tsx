import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faThLarge, faUsers, faTasks, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Image from 'next/image'
import profilePic from './gear.png'
// import profilePic from './growth.png'

const Sidebar = () => (
  <div className="flex flex-col w-1/5 border-r border-gray-200 h-screen py-10">
    <div className="flex items-center mb-10">
        <Image
            className="object-cover w-12 h-12 ml-6 mr-4 rounded-full"
            src={profilePic}
            alt="Logo"
            width={60}
            height={60}
        />
        <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-black">PMS.</h1>
    </div>
    <div className="flex flex-col h-screen justify-between">
        <div className="flex flex-col">
            <Link className="flex py-1 my-2 h-12 ml-8 w-full group hover:ml-0 hover:before:p-1 hover:before:mr-6 hover:before:rounded-tr-lg hover:before:rounded-br-lg hover:before:bg-violet-600" href="/overview">
                <FontAwesomeIcon icon={faThLarge} className="text-violet-400 group-hover:text-violet-600 self-center mr-3" />
                <p className="text-gray-500 group-hover:text-violet-600 self-center">Overview</p>
            </Link>
            <Link className="flex py-1 my-2 h-12 ml-8 w-full group hover:ml-0 hover:before:p-1 hover:before:mr-6 hover:before:rounded-tr-lg hover:before:rounded-br-lg hover:before:bg-violet-600" href="/projects">
                <FontAwesomeIcon icon={faTasks} className="text-violet-400 group-hover:text-violet-600 self-center mr-3" />
                <p className="text-gray-500 group-hover:text-violet-600 self-center">Projects</p>
            </Link>
            <Link className="flex py-1 my-2 h-12 ml-8 w-full group hover:ml-0 hover:before:p-1 hover:before:mr-6 hover:before:rounded-tr-lg hover:before:rounded-br-lg hover:before:bg-violet-600" href="/team">
                <FontAwesomeIcon icon={faUsers} className="text-violet-400 group-hover:text-violet-600 self-center mr-3" />
                <p className="text-gray-500 group-hover:text-violet-600 self-center">Teams</p>
            </Link>
        </div>
        <div className="flex flex-col">
            <div className="flex py-1 my-2 h-12 ml-8 w-full group cursor-pointer">
                <FontAwesomeIcon icon={faSignOutAlt} className="text-violet-400 group-hover:text-violet-600 self-center mr-3" />
                <p className="text-gray-500 group-hover:text-violet-600 self-center">Logout</p>
            </div>
        </div>
    </div>
  </div>
)

export default Sidebar
