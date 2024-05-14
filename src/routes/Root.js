import Header from "./Header";
import Body from "./Body";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Root = () => {
    return (
        <>
            <Header />
            <Outlet/>
            <Footer />
        </>
    );
}

export default Root;