import { RxVideo } from "react-icons/rx";
import { GrBook } from "react-icons/gr";
import { Flex, Box } from '@chakra-ui/react'
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Flex justify="center" align="center">
            <Box flexBasis="200px" flexShrink="3">
                <Link to="/video/list" >
                   <RxVideo size="100%" />
                </Link>
            </Box>
            <Box flexBasis="200px" flexShrink="3">
                <Link to="/book/list">
                    <GrBook size="100%" />
                </Link>
            </Box>
        </Flex>
    );
}

export default Home;