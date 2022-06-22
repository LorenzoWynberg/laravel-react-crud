import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import PostsIndex from "@pages/Posts";
import PostsCreate from "@pages/Posts/Create";

function Main() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PostsIndex />}></Route>
				<Route path="/posts/create" element={<PostsCreate />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default Main;