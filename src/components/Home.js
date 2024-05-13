import { useState } from "react";

const Home = (props) => {
    const [count, setCount] = useState(1);

    const handleClick = () => {
        setCount(count + 1);
    }

    return (
        <>
            <button onClick={handleClick} style={props.style}>{count}</button>
        </>
    );
}

export default Home;