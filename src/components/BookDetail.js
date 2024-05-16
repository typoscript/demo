import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Flex, Text, Box, Image, Heading, useColorModeValue } from '@chakra-ui/react'

const BookDetail = () => {
    const { isbn } = useParams();
    const [book, setBook] = useState({});
    //const [params] = useSearchParams();

    //console.log(params.get("name"))

    const color = useColorModeValue("gray.500", "red.300");

    const fetchBook = async () => {
        const response = await fetch(
            `https://dapi.kakao.com/v3/search/book?query=${isbn}`,
            {
                method: "GET",
                headers: {
                    Authorization: `KakaoAK ${process.env.REACT_APP_API_KEY}`,
                },
            }
        );

        const data = await response.json();

        setBook(data.documents[0]);
    };

    useEffect(() => {
        fetchBook();
    }, []);

    return (
        <Flex direction="column" p="10px" justifyContent="center" gap="10px">
            <Heading>상세 페이지</Heading>
            <Flex direction="column" justifyContent="center" alignItems="center">
                <Link to={book.url}>
                    <Flex direction="column" p="10px" bgColor="#fff3f3" gap="10px" alignItems="center">
                        <Box>
                            <Image src={book.thumbnail}></Image>
                        </Box>
                        <Flex justifyContent="space-between" gap="20px">
                            <Box>
                                <Text fontSize="lg" minH="30px">제목</Text>
                                <Text fontSize="lg" minH="30px">저자</Text>
                                <Text fontSize="lg" minH="30px">출판사</Text>
                                <Text fontSize="lg" minH="30px">정가</Text>
                            </Box>
                            <Box>
                                <Text fontSize="lg" minH="30px">{book.title}</Text>
                                <Text fontSize="lg" minH="30px">{book.authors}</Text>
                                <Text fontSize="lg" minH="30px">{book.publisher}</Text>
                                <Text fontSize="lg" minH="30px">{book.price}</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </Link>
            </Flex>
            <Flex direction="column" bg="#f3f3f3" p="10px" gap="20px">
                <Heading color={color} size="lg">내용</Heading>
                <Text fontSize="xl">{book.contents}</Text>
            </Flex>
        </Flex>
    );
}

export default BookDetail;