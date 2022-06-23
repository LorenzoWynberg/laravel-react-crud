import { Component } from "react"
import MainLayout from "@layouts/MainLayout/MainLayout"
import CategorySelect from "@components/FormFields/CategorySelect";

class PostIndex extends Component {
	constructor(props) {
		super(props)

		this.state = {
			posts: [],
			query: {
				page: 1,
				category_id: "",
				order_column: "id",
				order_direction: "desc",
			},
		}
	}

	fetchPosts() {
		window.axios
			.get("/api/posts", { params: this.state.query })
			.then(res => this.setState({ posts: res.data }))
	}

	categoryChanged = (event) => {
		this.setState((state) => ({
			query: {
				category_id: event.target.value,
				page: 1,
				order_column: state.query.order_column,
				order_direction: state.query.order_direction,
			},
		}), () => this.fetchPosts())
	};

	pageChanged = (url) => {
		const page = new URL(url).searchParams.get('page');
		this.setState((state) => ({
			query: {
				category_id: state.query.category_id,
				page: page,
				order_column: state.query.order_column,
				order_direction: state.query.order_direction,
			},
		}), () => this.fetchPosts())
	}

	orderByChanged = (column) => {
		let direction = "asc";
		if (column === this.state.query.order_column) {
			direction = this.state.query.order_direction === "asc" ? "desc" : "asc";
		}
		this.setState((state) => ({
			query: {
				page: 1,
				order_column: column,
				order_direction: direction,
				category_id: state.query.category_id,
			},
		}), () => this.fetchPosts())
	}

	componentDidMount() {
		this.fetchPosts()
	}

	renderHead() {
		return (
			<thead className="table-header">
				<tr>
					<th>
						<div>
							<span>ID</span>
							<button
								onClick={() => this.orderByChanged("id")}
								type="button"
								className="column-sort">
								{this.renderSortIcon("id")}
							</button>
						</div>
					</th>
					<th>
						<div>
							<span>Title</span>
							<button
								onClick={() => this.orderByChanged("title")}
								type="button"
								className="column-sort">
								{this.renderSortIcon("title")}
							</button>
						</div>
					</th>
					<th>
						<div>
							<span>Category</span>
							<button
								onClick={() => this.orderByChanged("category_id")}
								type="button"
								className="column-sort">
								{this.renderSortIcon("category_id")}
							</button>
						</div>
					</th>
					<th>
						<div>
							<span>Content</span>
						</div>
					</th>
					<th>
						<div>
							<span>Created at</span>
						</div>
					</th>
				</tr>
			</thead>
		);
	}

	renderBody() {
		return (
			<tbody className="table-body">
				{this.state.posts.data.map((post) => (
					<tr key={post.id}>
						<td>{post.id}</td>
						<td>{post.title}</td>
						<td>{post.category.name}</td>
						<td>{post.content}</td>
						<td>{post.created_at}</td>
					</tr>
				))}
			</tbody>
		);
	}

	renderSortIcon(column) {
		let icon = "fa-sort";
		if (this.state.query.order_column === column) {
			icon =
				this.state.query.order_direction === "asc"
					? (icon = "fa-sort-up")
					: (icon = "fa-sort-down")
		}
		return <i className={`fa-solid ${icon}`}></i>;
	}

	renderPaginatorLinks() {
		let links = this.state.posts.meta.links
		let buttons = links.map((link, index) => (
			<button
				key={index}
				onClick={() => this.pageChanged(link.url)}
				dangerouslySetInnerHTML={{ __html: link.label }}
				disabled={link.url ? false : true}
				className={
					(link.url
						? "focus:z-10 focus:outline-none focus:ring hover:text-gray-500 ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 "
						: "cursor-not-allowed focus:outline-none ")
					+
					"relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 transition ease-in-out duration-150 first:rounded-l-md last:rounded-r-md disabled:opacity-75"}
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
						<table className="table">
							<div className="mb-4">
								<CategorySelect callback={this.categoryChanged} />
							</div>
							{this.renderHead()}
							{this.renderBody()}
							<div className="mt-4">{this.renderPaginator()}</div>
						</table>
					</div>
				</div>
			</MainLayout>
		);
	}
}

export default PostIndex;
