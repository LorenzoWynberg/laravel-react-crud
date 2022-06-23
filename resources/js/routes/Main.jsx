import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import PostIndex from "@pages/Posts";
import PostCreate from "@pages/Posts/Create";

function Main() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PostIndex />}></Route>
				<Route path="/posts/create" element={<PostCreate />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default Main;