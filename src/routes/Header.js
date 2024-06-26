import { Flex, useColorModeValue, Heading, useColorMode, Button, IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { MdOutlineDarkMode, MdDarkMode} from "react-icons/md";
import { RxVideo } from "react-icons/rx";
import { GrBook } from "react-icons/gr";
import { Link } from "react-router-dom";
 
const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const color = useColorModeValue("gray.500", "red.300");

    return (
        <>
            <Flex color='black' justifyContent="center" flexDirection="column" gap="10px">
                <Heading textAlign="center" color={color}>검색 서비스</Heading>    

                <Flex flexDirection="row" justifyContent="center" gap="10px">
                    <Button><a href="/demo">홈</a></Button>
                    <Menu>
                        <MenuButton as={Button}><RxVideo/> 영상</MenuButton>
                        <MenuList>
                            <MenuItem><Link to="/video">추천 영상</Link></MenuItem>
                            <MenuItem><Link to="/video/list">영상 목록</Link></MenuItem>
                            <MenuItem><Link to="/video/search">영상 검색</Link></MenuItem>
                        </MenuList>
                    </Menu>

                    <Menu>
                        <MenuButton as={Button}><GrBook /> 책</MenuButton>
                        <MenuList>
                            <MenuItem><Link to="/book">추천 책</Link></MenuItem>
                            <MenuItem><Link to="/book/list">책 목록</Link></MenuItem>
                            <MenuItem><Link to="/book/search">책 검색</Link></MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>

            <IconButton icon={colorMode === 'dark' ? <MdDarkMode/> : <MdOutlineDarkMode/>} onClick={toggleColorMode}></IconButton>

        </>
    );
}

export default Header;