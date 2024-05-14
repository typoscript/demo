import React, { useEffect, useRef, useState } from "react";
import { IconButton, Heading, Box, Input, TableContainer, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Button, HStack, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { RxVideo } from "react-icons/rx";
import { MdOutlineDarkMode, MdDarkMode} from "react-icons/md";

const BookList = () => {
    // useState 는 화면 랜더링에 반영됨
    const [bookList, setBookList] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('달고나 커피');

  // useRef 는 화면 랜더링 반영되지 않는 참조값
    const pageCount = useRef(1);

    const { colorMode, toggleColorMode } = useColorMode();
    const color = useColorModeValue("gray.500", "red.300");

    const fetchBooks = async () => {
    const response = await fetch(
        `https://dapi.kakao.com/v2/search/vclip?1query=${search}&page=${page}`,
        {
            method: "GET",
            headers: {
                Authorization: `KakaoAK ${process.env.REACT_APP_API_KEY}`,
            },
        }
    );

    const data = await response.json();

    if (data.meta) {
        pageCount.current =
        data.meta.pageable_count % 10 > 0
            ? data.meta.pageable_count / 10 + 1
            : data.meta.pageable_count / 10;

        pageCount.current = Math.floor(pageCount.current);
        pageCount.current = pageCount.current > 15 ? 15 : pageCount.current;
        console.log(pageCount.current);

        setBookList(data.documents);
    }
    };

    const changeSearch = e => {
    if (e.target.value.length >= 2) 
        setSearch(e.target.value); 
    }

    useEffect(() => {
    fetchBooks();
    }, [page, search]);

    return (
    <>
        <Box>
            <Heading color={color}><RxVideo/> 동영상 검색 목록</Heading>
            <IconButton icon={colorMode === 'dark' ? <MdDarkMode/> : <MdOutlineDarkMode/>} onClick={toggleColorMode}></IconButton>
            <Input type="text" placeholder="검색어 입력" onChange={changeSearch} />
            <TableContainer>
                <Table variant="striped">
                    <Thead>
                        <Tr>
                            <Th>No</Th>
                            <Th>Title</Th>
                            <Th>URL</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {bookList.map((book, index) => (
                            <Tr>
                                <Td>{page - 1 + 10 + index + 1}</Td>
                                <Td>{book.title}</Td>
                                <Td><a href={book.url}>{book.url}</a></Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot></Tfoot>
                </Table>
            </TableContainer>
        </Box>
        <HStack>
            {Array.from({length: pageCount.current}, (_, index) => (
                <Button colorScheme={page === index + 1 ? "pink" : color} onClick={e => { setPage(index + 1) }}>{index + 1}</Button>
            ))}
        </HStack>
    </>
    );
};

export default BookList;