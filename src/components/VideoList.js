import React, { useEffect, useRef, useState } from "react";
import { Flex, Link, Text, Heading, Image, Box, Input, Button, HStack, useColorModeValue } from '@chakra-ui/react'

const VideoList = (props) => {
    // useState 는 화면 랜더링에 반영됨
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(getDefaultSearch());

    // useRef 는 화면 랜더링 반영되지 않는 참조값
    const pageCount = useRef(1);

    const color = useColorModeValue("gray.500", "red.300");

    function getDefaultSearch() {
        const DEFAULT_SEARCH = "축구";

        if (props.type === "search")
            return "";

        return DEFAULT_SEARCH;
    }

    const fetchVideos = async () => {
        if (!search)
            return;

        const response = await fetch(
            `https://dapi.kakao.com/v2/search/vclip?query=${search}&page=${page}`,
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

            setVideos(data.documents);
        }
    };

    const changeSearch = e => {
    if (e.target.value.length >= 2) 
        setSearch(e.target.value); 
    }

    useEffect(() => {
        fetchVideos();
    }, [page]);

    const handleSearchClick = () => {
        fetchVideos();
    }

    const getHeadingText = () => {
        switch (props.type) {
            case "recommandation":
                return "추천 영상 목록";
            case "list":
                return "영상 목록";
            case "search":
                return `${search} 영상 검색 목록`;
        }
    }

    return (
    <Flex justify="center" padding="30px" direction="column">
        <Flex direction="column" gap="10px">
            <Heading color={color}>{getHeadingText()}</Heading>
            <Flex>
                <Input type="text" placeholder="검색어 입력" onChange={changeSearch} />
                <Button bg="pink" onClick={handleSearchClick}>검색</Button>
            </Flex>
            <Flex padding="10px" direction="row" flexWrap="wrap">
                {videos.map(video => (
                    <Box borderRadius="10px" width="50%" p="10px" _hover={{"background-color": "pink"}}>
                        <Link to={video.url}>
                            <Flex gap="10px" align="center">
                                <Image borderRadius="10px" boxSize="150px" src={video.thumbnail} />
                                <Flex direction="column" gap="10px">
                                    <Text fontSize="20px">{video.title}</Text>
                                    <Text fontSize="15px">{video.author}</Text>
                                    <Text fontSize="15px">{video.datetime.split("T")[0]}</Text>
                                </Flex>
                            </Flex>
                        </Link>
                    </Box>
                ))}
            </Flex>
        </Flex>
        <HStack justify="center">
            {Array.from({length: pageCount.current}, (_, index) => (
                <Button color={page === index + 1 ? "pink" : color} onClick={e => { setPage(index + 1) }}>{index + 1}</Button>
            ))}
        </HStack>
    </Flex>
    );
};

export default VideoList;