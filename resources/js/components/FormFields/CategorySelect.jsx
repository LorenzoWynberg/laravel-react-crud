import { Component } from "react"

class CategorySelect extends Component {

	constructor(props) {
		super(props);
		this.state = {
			categories: []
		};
	}

	fetchCategories() {
		window.axios
			.get("/api/categories")
			.then(res => this.setState({ categories: res.data.data }))
	}

	componentDidMount() {
		this.fetchCategories()
	}

	render() {
		const categories = this.state.categories.map((category) => (
			<option key={category.id} value={category.id}>
				{category.name}
			</option>
		))

		return (
			<select
				onChange={this.props.callback}
				className="mt-1 w-full sm:mt-0 sm:w-1/4 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
				<option value="">-- all categories --</option>
				{categories}
			</select>
		)
	}
}
export default CategorySelect
