import { Component } from "react";
import MainLayout from "@layouts/MainLayout/MainLayout"
import CategorySelect from "@components/FormFields/CategorySelect";

class PostCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			content: '',
			category_id: ''
		}
	}

	handleInputChange = (event) => {
		this.setState({ [event.target.id]: event.target.value })
	}

	handleSubmit = (event) => {
		console.log(JSON.stringify(this.state));
		event.preventDefault();
	}

	render() {

		const inputClassList = "block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
		const labelClassList = "block font-medium text-sm text-gray-700"

		return (
			<MainLayout title={"Create Post"}>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor="title" className={labelClassList}>
							Title
						</label>
						<input value={this.state.title} onChange={this.handleInputChange} id="title" type="text" className={inputClassList} />
					</div>
					<div className="mt-4">
						<label htmlFor="content" className={labelClassList}>
							Content
						</label>
						<textarea value={this.state.content} onChange={this.handleInputChange} id="content" type="text" className={inputClassList} />
					</div>
					<div className="mt-4">
						<label htmlFor="category" className={labelClassList}>
							Category
						</label>
						<CategorySelect callback={this.handleInputChange} />
					</div>
					<div className="mt-4">
						<button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">
							Save
						</button>
					</div>
				</form>
			</MainLayout>
		)
	}
}

export default PostCreate;