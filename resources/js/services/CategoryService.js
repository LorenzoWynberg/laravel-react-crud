class CategoryService {
	getAll() {
		return window.axios.get('/api/categories')
	}
}

export default new CategoryService