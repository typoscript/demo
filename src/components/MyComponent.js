import Home from "./Home";

// props { key: value }
// ㄴ 자식요소가 부모에게 전달하는 값

function MyComponent(props) {
    return (
        <>
            <Home style={{
                "color": 'pink',
                "backgroundColor": "white",
                "width": "100px",
                "height": "50px"
                }} />
            <h1>hello world</h1>
            <h1>{props.msg}</h1>
        </>
    );
}

export default MyComponent;