import { useState, useEffect } from "react";
import CategoryService from "@services/CategoryService";

function CategorySelect({ callback }) {
	const [categories, setCategories] = useState([])

	const fetchCategories = () => {
		CategoryService
			.getAll()
			.then(res => setCategories(res.data.data))
	}

	useEffect(fetchCategories, [])

	return (
		<select
			name="category_id"
			onChange={callback}
			className="mt-1 w-full sm:mt-0 sm:w-1/4 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
			<option value="">-- All Categories --</option>
			{categories.map((category) => (
				<option key={category.id} value={category.id}>
					{category.name}
				</option>
			))}
		</select>
	)
}
export default CategorySelect
