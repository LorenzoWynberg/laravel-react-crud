import React from "react";
import ReactDOM from 'react-dom/client';
import Main from "@routes/Main";

export default function App() {
	return (
		<React.StrictMode>
			<Main />
		</React.StrictMode>
	);
}

const root = ReactDOM.createRoot(
	document.getElementById('app')
);
root.render(<App />);