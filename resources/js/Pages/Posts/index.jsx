import { Component } from "react"
import MainLayout from "@layouts/MainLayout/MainLayout"
import CategorySelect from "@components/FormFields/CategorySelect";
import SortableTable from "@components/Tables/SortableTable";
import Paginator from "@components/Paginator/Paginator";

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
							<Paginator data={this.state.posts} callback={this.queryChanged} />
						</div>
					</div>
				</div>
			</MainLayout>
		);
	}
}

export default PostIndex;
