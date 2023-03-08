import Link from 'next/link';

export default function NavBar(){
    return(
        <div>
            <nav className="flex justify-center space-x-4 py-4">
                <Link href="/">
                <span className="font-normal px-3 py-2 rounded-lg hover:text-white transition duration-500">Home</span>
                </Link>
                <Link href="/test/main">
                <span className="font-normal px-3 py-2 rounded-lg hover:text-white transition duration-500">Test</span>
                </Link>
                <Link href="/dashboard">
                <span className="font-normal px-3 py-2 rounded-lg hover:text-white transition duration-500">API_TEST</span>
                </Link>
                <Link href="/dashboard">
                <span className="font-normal px-3 py-2 rounded-lg hover:text-white transition duration-500">Home</span>
                </Link>
            </nav>
        </div>
    )
}
