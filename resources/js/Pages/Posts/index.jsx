import { Component } from "react"
import MainLayout from "@layouts/MainLayout/MainLayout"
import CategorySelect from "@components/FormFields/CategorySelect";
import SortableTable from "@components/Table/SortableTable";

class PostIndex extends Component {
	constructor(props) {
		super(props)

		this.state = {
			posts: [],
			query: {
				page: 1,
				category_id: "",
				sort_column: "id",
				sort_direction: "desc",
			},
		}
	}

	getColumns() {
		return [
			{ name: 'ID', id: 'id', sortable: true },
			{ name: 'Title', id: 'title', sortable: true },
			{ name: 'Category', id: 'category_id', sortable: true },
			{ name: 'Content', id: 'content', sortable: false },
			{ name: 'Created At', id: 'created_at', sortable: false },
		]
	}

	fetchPosts() {
		window.axios
			.get("/api/posts", { params: this.state.query })
			.then(res => this.setState({ posts: res.data }))
	}

	directionHandler(column) {
		let direction = "asc";
		if (column === this.state.query.sort_column) {
			direction =
				this.state.query.sort_direction === direction
					? "desc"
					: "asc";
		}
		return direction
	}

	queryChanged = (e, params = {}) => {
		this.setState((state) => ({
			query: {
				page: params.hasOwnProperty('url') ? parseInt(new URL(params.url).searchParams.get('page')) : 1,
				category_id: e.target.name === 'categorySelect' ? e.target.value : state.query.category_id,
				sort_column: params.hasOwnProperty('column') ? params.column : state.query.sort_column,
				sort_direction: params.hasOwnProperty('column') ? this.directionHandler(params.column) : state.query.sort_direction,
			},
		}), () => this.fetchPosts())
	}

	componentDidMount() {
		this.fetchPosts()
	}

	renderPaginatorLinks() {
		let links = this.state.posts.meta.links
		let buttons = links.map((link, index) => (
			<button
				key={index}
				onClick={(e) => this.queryChanged(e, { url: link.url })}
				dangerouslySetInnerHTML={{ __html: link.label }}
				disabled={link.url ? false : true}
				className={
					(
						link.url
							? "focus:z-10 focus:outline-none focus:ring hover:text-gray-500 ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 "
							: "cursor-not-allowed focus:outline-none "
					)
					+ "relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 transition ease-in-out duration-150 first:rounded-l-md last:rounded-r-md disabled:opacity-75"}
			/>
		))
		return buttons
	}

	renderPaginator() {
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
									{" "}{this.state.posts.meta.from}{" "}
								</span>
								to
								<span className="font-medium">
									{" "}{this.state.posts.meta.to}{" "}
								</span>
							</span>
							of
							<span className="font-medium">
								{" "}{this.state.posts.meta.total}
							</span>
						</p>
					</div>

					<div>
						<span className="relative z-0 inline-flex shadow-sm rounded-md">
							{this.renderPaginatorLinks()}
						</span>
					</div>
				</div>
			</nav>
		);
	}

	render() {
		if (!("data" in this.state.posts)) return;
		return (
			<MainLayout title={"Post Index"}>
				<div className="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
					<div className="min-w-full align-middle">
						<div className="mb-4">
							<CategorySelect callback={this.queryChanged} />
						</div>
						<SortableTable
							cb={this.queryChanged}
							cols={this.getColumns()}
							rows={this.state.posts.data}
							sort_column={this.state.query.sort_column}
							sort_direction={this.state.query.sort_direction} />
						<div className="mt-4">
							{this.renderPaginator()}
						</div>
					</div>
				</div>
			</MainLayout>
		);
	}
}

export default PostIndex;
