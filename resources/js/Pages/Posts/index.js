import axios from "axios"
import { Component } from "react"

class PostIndex extends Component {
	constructor(props) {
		super(props)

		this.state = {
			posts: []
		}
	}

	fetchPosts(page = 1) {
		axios.get('/api/posts', { params: { page } })
			.then(res => this.setState({ posts: res.data }))
	}

	pageChanged(url) {
		const fullUrl = new URL(url)
		const page = fullUrl.searchParams.get('page')
		this.fetchPosts(page)
	}

	componentDidMount() {
		this.fetchPosts()
	}

	renderHead() {
		return (
			<thead className="table-header">
				<tr>
					<th>
						<span>ID</span>
					</th>
					<th>
						<span>Title</span>
					</th>
					<th>
						<span>Category</span>
					</th>
					<th>
						<span>Content</span>
					</th>
					<th>
						<span>Created at</span>
					</th>
				</tr>
			</thead>
		)
	}

	renderBody() {
		return (
			<tbody className="table-body">
				{this.state.posts.data.map(
					post => <tr key={post.id}>
						<td>{post.id}</td>
						<td>{post.title}</td>
						<td>{post.category}</td>
						<td>{post.content}</td>
						<td>{post.created_at}</td>
					</tr>
				)}
			</tbody>
		)
	}

	renderPaginatorLinks() {
		return this.state.posts.meta.links.map((link, index) =>
			<button
				key={index}
				onClick={() => this.pageChanged(link.url)}
				dangerouslySetInnerHTML={{ __html: link.label }}
				className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 first:rounded-l-md last:rounded-r-md" />
		);
	}

	renderPaginator() {
		return (
			<nav role="navigation" aria-label="Pagination Navigation" className="flex items-center justify-between">
				<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
					<div>
						<p className="text-sm text-gray-700 leading-5">
							Showing
							<span>
								<span className="font-medium"> {this.state.posts.meta.from} </span>
								to
								<span className="font-medium"> {this.state.posts.meta.to} </span>
							</span>
							of
							<span className="font-medium"> {this.state.posts.meta.total} </span>
							results
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
		if (!('data' in this.state.posts)) return;
		return (
			<div className="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
				<div className="min-w-full align-middle">
					<table className="table">
						{this.renderHead()}
						{this.renderBody()}
					</table>
					<div className="mt-4">
						{this.renderPaginator()}
					</div>
				</div>
			</div>
		)
	}
}

export default PostIndex;
