import Root from "./routes/Root";
import BookList from "./components/BookList";
import VideoList from "./components/VideoList";
import Home from "./components/Home";

import { createBrowserRouter } from "react-router-dom";

/*

    /demo/video
    /demo/video/list
    /demo/video/search

    /demo/book
    /demo/book/list
    /demo/book/search

    /demo/book/search/{:isbn}
*/

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />
            },
        ],
        errorElement: <>404 에러 페이지</>
    },
    {
        path: "/video",
        element: <Root />,
        children: [
            {
                path: "/video",
                element: <VideoList type={"recommandation"} />
            },
            {
                path: "/video/list",
                element: <h1>dsfdsf</h1>
            },
            {
                path: "/video/search",
                element: <VideoList type={"search"} />
            },
        ],
    },
    {
        path: "/book",
        element: <Root />,
        children: [
            {
                path: "/book",
                element: <BookList type={"recommandation"} />
            },
            {
                path: "/book/list",
                element: <BookList type={"list"} />
            },
            {
                path: "/book/search",
                element: <BookList type={"search"} />
            },
        ],
    },
], {
    basename: "/demo",
});

export default router;