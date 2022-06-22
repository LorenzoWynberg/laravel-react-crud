import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import PostsIndex from "@pages/Posts";

function Main() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PostsIndex />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default Main;