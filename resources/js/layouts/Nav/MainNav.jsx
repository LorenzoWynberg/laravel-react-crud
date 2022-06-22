import NavLink from "./NavLink";

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
							<NavLink route={"/"} name={"Posts"} />
							<NavLink route={"/posts/create"} name={"Add Post"} />
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}
