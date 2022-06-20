import axios from "axios";
import { Component } from "react";

class PostIndex extends Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: []
		}
	}

	fetchPosts() {
		axios.get('/api/posts')
			.then(res => this.setState({ posts: res.data.data }))
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
				{this.state.posts.map(
					post => <tr>
						<td>{post.id}</td>
						<td>{post.title}</td>
						<td>{post.content}</td>
						<td>{post.created_at}</td>
					</tr>
				)}
			</tbody>
		)
	}

	render() {
		return (
			<div className="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
				<div className="min-w-full align-middle">
					<table className="table">
						{this.renderHead()}
						{this.renderBody()}
					</table>
				</div>
			</div>
		)
	}
}

export default PostIndex;
