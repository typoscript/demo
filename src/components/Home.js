import { RxVideo } from "react-icons/rx";
import { GrBook } from "react-icons/gr";
import { Flex, Text } from '@chakra-ui/react'

const Home = () => {
    return (
        <Flex justify="center" align="center">
            <a href="/demo/video/list">
                <RxVideo size="300px" />
            </a>
            <a href="/demo/book/list">
                <GrBook size="300px" />
            </a>
        </Flex>
    );
}

export default Home;