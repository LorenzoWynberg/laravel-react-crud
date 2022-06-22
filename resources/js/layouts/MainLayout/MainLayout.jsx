import React from "react";
import MainNav from "@layouts/Nav/MainNav";
import MainHeader from "@layouts/Nav/MainHeader";

export default function MainLayout({ children, title }) {
	return (
		<div className="min-h-screen bg-gray-100">
			<MainNav />
			<MainHeader title={title} />
			<main>
				<div className="py-12">
					<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
						<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
							<div className="p-6 bg-white border-b border-gray-200">
								{children}
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}