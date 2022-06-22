import { Link } from "react-router-dom";

export default function MainNav() {
	return (
		<nav className="bg-white border-b border-gray-100" >
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex">
						<div className="shrink-0 flex items-center">
							<a href="/">
								React App
							</a>
						</div>

						<div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
							<Link to="/"
								className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">Posts</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}
