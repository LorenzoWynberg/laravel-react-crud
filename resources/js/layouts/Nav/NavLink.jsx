import { NavLink as Link } from "react-router-dom";

export default function NavLink({ route, name }) {
	return (
		<Link to={route}
			className={
				({ isActive }) => (isActive
					? "border-indigo-400 text-gray-900 focus:border-indigo-700 "
					: "border-transparent text-gray-500 hover:text-gray-700 hover:border-indigo-200 focus:text-gray-700 active:border-indigo-300 ")
					+ "focus:outline-none text-sm font-medium leading-5 inline-flex items-center px-1 pt-1 border-b-2 transition duration-150 ease-in-out"}>
			{name}
		</Link>
	)
}
