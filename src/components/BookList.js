import React, { useEffect, useRef, useState } from "react";
import { Flex, Heading, Image, Box, Input, TableContainer, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Button, HStack, useColorModeValue } from '@chakra-ui/react'

const BookList = (props) => {
    // useState 는 화면 랜더링에 반영됨
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(getDefaultSearch());

  // useRef 는 화면 랜더링 반영되지 않는 참조값
    const pageCount = useRef(1);

    const color = useColorModeValue("gray.500", "red.300");

    function getDefaultSearch() {
        const DEFAULT_SEARCH = "경제";

        if (props.type === "search")
            return "";

        return DEFAULT_SEARCH;
    }

    const fetchBooks = async () => {
        if (!search)
            return;

        const response = await fetch(
            `https://dapi.kakao.com/v3/search/book?query=${search}&page=${page}`,
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

            setBooks(data.documents);
        }
    };

    const changeSearch = e => {
    if (e.target.value.length >= 2) 
        setSearch(e.target.value); 
    }

    const getHeadingText = () => {
        switch (props.type) {
            case "recommandation":
                return "추천 책 목록";
            case "list":
                return "책 목록";
            case "search":
                return `${search} 책 검색 목록`;
        }
    }

    const handleSearchClick = () => {
        fetchBooks();
    }

    useEffect(() => {
        fetchBooks();
    }, [page]);

    return (
    <Flex justify="center" padding="30px" direction="column">
        <Flex direction="column" gap="10px">
            <Heading color={color}>{getHeadingText()}</Heading>
            <Flex>
                <Input type="text" placeholder="검색어 입력" onChange={changeSearch} />
                <Button bg="pink" onClick={handleSearchClick}>검색</Button>
            </Flex>
            <TableContainer>
                <Table variant="striped">
                    <Thead>
                        <Tr>
                            <Th>No</Th>
                            <Th>Title</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {books.map((book, index) => (
                            <Tr>
                                <Td>{((page - 1) * 10) + index + 1}</Td>
                                <Td>
                                    <Box fontSize='lg'>
                                        <a href={book.url}>
                                            <Image boxSize="150px" src={book.thumbnail} />
                                            {book.title}
                                        </a>
                                    </Box>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot></Tfoot>
                </Table>
            </TableContainer>
        </Flex>
        <HStack>
            {Array.from({length: pageCount.current}, (_, index) => (
                <Button color={page === index + 1 ? "pink" : color} onClick={e => { setPage(index + 1) }}>{index + 1}</Button>
            ))}
        </HStack>
    </Flex>
    );
};

export default BookList;