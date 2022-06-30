import { Component } from "react"

function PaginatorButton({ link, callback }) {
	let isDisabled = !link.url || link.active;
	return (
		<button
			onClick={(e) => callback(e, { url: link.url })}
			dangerouslySetInnerHTML={{ __html: link.label }}
			disabled={isDisabled}
			className={
				(
					isDisabled
						? "cursor-not-allowed focus:outline-none "
						: "focus:z-10 focus:outline-none focus:ring hover:text-gray-500 ring-gray-300 focus:border-blue-300 hover:bg-gray-100 "
				)
				+
				(
					link.active
						? "bg-gray-100 "
						: ""
				)
				+ "relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 transition ease-in-out duration-150 first:rounded-l-md last:rounded-r-md disabled:opacity-75"
			}
		/>
	)
}

class Paginator extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<nav
				role="navigation"
				aria-label="Pagination Navigation"
				className="flex items-center justify-between">
				<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
					<div>
						<p className="text-sm text-gray-700 leading-5">
							Showing results
							<span>
								<span className="font-medium">
									{" "}{this.props.data.meta.from}{" "}
								</span>
								to
								<span className="font-medium">
									{" "}{this.props.data.meta.to}{" "}
								</span>
							</span>
							of
							<span className="font-medium">
								{" "}{this.props.data.meta.total}
							</span>
						</p>
					</div>
					<div>
						<span className="relative z-0 inline-flex shadow-sm rounded-md">
							{this.props.data.meta.links.map((link, index) => (
								<PaginatorButton key={index} link={link} callback={this.props.callback} />
							))}
						</span>
					</div>
				</div>
			</nav>
		);
	}
}

export default Paginator
