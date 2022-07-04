import { useCallback, useEffect, useState } from "react";
import MainLayout from "@layouts/MainLayout/MainLayout"
import CategorySelect from "@components/FormFields/CategorySelect";
import SortableTable from "@components/Tables/SortableTable";
import Paginator from "@components/Paginator/Paginator";

function PostIndex() {
	const [posts, setPosts] = useState([])
	const [params, setParams] = useState(
		{
			page: 1,
			category_id: "",
			sort_column: "id",
			sort_direction: "desc",
		}
	)

	const getColumns = () => {
		return [
			{ name: 'ID', id: 'id', sortable: true },
			{ name: 'Title', id: 'title', sortable: true },
			{ name: 'Category', id: 'category_id', sortable: true },
			{ name: 'Content', id: 'content', sortable: false },
			{ name: 'Created At', id: 'created_at', sortable: false },
		]
	}

	const fetchPosts = () => {
		window.axios
			.get("/api/posts", { params: params })
			.then(res => setPosts(res.data))
	}

	const getDirection = (column) => {
		let direction = "asc";
		if (column === params.sort_column) {
			direction =
				params.sort_direction === direction
					? "desc"
					: "asc";
		}
		return direction
	}

	const queryChanged = useCallback((e) => {
		setParams({
			page: e.target.name === 'paginator_link' ? parseInt(new URL(e.target.value).searchParams.get('page')) : 1,
			category_id: e.target.name === 'category_id' ? e.target.value : params.category_id,
			sort_column: e.currentTarget.name === 'col_sort' ? e.currentTarget.value : params.sort_column,
			sort_direction: e.currentTarget.name === 'col_sort' ? getDirection(e.currentTarget.value) : params.sort_direction,
		})
	}, [params])

	useEffect(fetchPosts, [])
	useEffect(fetchPosts, [params])

	if (!("data" in posts)) return;
	return (
		<MainLayout title={"Post Index"}>
			<div className="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
				<div className="min-w-full align-middle">
					<div className="mb-4">
						<CategorySelect callback={queryChanged} />
					</div>
					<SortableTable
						callback={queryChanged}
						cols={getColumns()}
						rows={posts.data}
						sort_column={params.sort_column}
						sort_direction={params.sort_direction} />
					<div className="mt-4">
						<Paginator links={posts.meta.links} meta={posts.meta} callback={queryChanged} />
					</div>
				</div>
			</div>
		</MainLayout>
	);
}

export default PostIndex;
