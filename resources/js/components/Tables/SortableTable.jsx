import { Component } from "react"

function SortIcon({ col, sort_column, sort_direction }) {
	let icon = "fa-sort";
	if (sort_column === col.id) {
		icon =
			sort_direction === "asc"
				? (icon = "fa-sort-up")
				: (icon = "fa-sort-down")
	}
	return <i className={`fa-solid ${icon}`}></i>;
}

function SortButton({ col, sort_column, sort_direction, cb }) {
	if (!col.sortable) return;
	return (
		<button
			onClick={(e) => cb(e, { column: col.id })}
			type="button"
			className="column-sort ml-3">
			<SortIcon col={col} sort_column={sort_column} sort_direction={sort_direction} />
		</button>
	)
}

function TableHead({ cols, sort_column, sort_direction, cb }) {
	return (
		<thead className="">
			<tr>
				{cols.map((col) => {
					return (
						<th className="text-left py-4 px-6 text-white bg-indigo-400" key={col.id}>
							<div>
								<span>{col.name}</span>
								<SortButton col={col} cb={cb} sort_column={sort_column} sort_direction={sort_direction} />
							</div>
						</th>
					)
				})}
			</tr>
		</thead >
	);
}

function TableBody({ rows }) {
	return (
		<tbody className="table-body">
			{rows.map((row) => (
				<tr key={row.id}>
					<td>{row.id}</td>
					<td>{row.title}</td>
					<td>{row.category.name}</td>
					<td>{row.content}</td>
					<td>{row.created_at}</td>
				</tr>
			))}
		</tbody>
	);
}

class SortableTable extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<table className="table">
				<TableHead
					sort_column={this.props.sort_column}
					sort_direction={this.props.sort_direction}
					cols={this.props.cols}
					cb={this.props.cb} />
				<TableBody rows={this.props.rows} />
			</table>
		)
	}
}

export default SortableTable;