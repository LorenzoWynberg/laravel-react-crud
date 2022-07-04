import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@layouts/MainLayout/MainLayout"
import CategorySelect from "@components/FormFields/CategorySelect";

function PostCreate() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [errors, setErrors] = useState({});

	const navigate = useNavigate()
	const submit = (event) => {
		event.preventDefault()
		window.axios
			.post('/api/posts', {
				title: title,
				content: content,
				category_id: categoryId,
			})
			.then(res => navigate('/'))
			.catch(e => setErrors(e.response.data.errors))
	}

	const errorMessage = (field) => {
		return (
			<div className="text-red-600 mt-1">
				{
					errors?.[field]?.map((message, index) => {
						return (
							<div key={index}>{message}</div>
						)
					})
				}
			</div>
		)
	}

	const inputClassList = "block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
	const labelClassList = "block font-medium text-sm text-gray-700"

	return (
		<MainLayout title={"Create Post"}>
			<form onSubmit={submit}>
				<div>
					<label htmlFor="title" className={labelClassList}>
						Title
					</label>
					<input value={title} onChange={(e) => { setTitle(e.target.value) }} name="title" type="text" className={inputClassList} />
					{errorMessage('title')}
				</div>
				<div className="mt-4">
					<label htmlFor="content" className={labelClassList}>
						Content
					</label>
					<textarea value={content} onChange={(e) => { setContent(e.target.value) }} name="content" type="text" className={inputClassList} />
					{errorMessage('content')}
				</div>
				<div className="mt-4">
					<label htmlFor="category_id" className={labelClassList}>
						Category
					</label>
					<CategorySelect callback={(e) => { setCategoryId(e.target.value) }} />
					{errorMessage('category_id')}
				</div>
				<div className="mt-4">
					<button type="submit" className="px-3 py-2 bg-indigo-500 text-white rounded">
						Save
					</button>
				</div>
			</form>
		</MainLayout>
	)
}

export default PostCreate;