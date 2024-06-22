import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./styles/reset.scss";
import "./styles/index.scss";
import { Page404 } from "./pages/Page404.tsx";
import { PageBlog } from "./pages/PageBlog.tsx";
import { PageCreateEntry } from "./pages/PageCreateEntry.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <Page404 />,
		element: <App />,
		children: [
			{
				path: "/blog",
				element: <PageBlog/>
			},
			{
				path: "create-entry",
				element: <PageCreateEntry/>
			},
			{
				path: "/",
				element: <Navigate to="/blog" replace />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<RouterProvider router={router} />
);
