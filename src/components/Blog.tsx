/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  HStack,
  VStack,
  Stack,
  Link as ChakraLink,
  Text,
  Icon,
  Tag,
  useColorModeValue
} from '@chakra-ui/react';
import { GoChevronRight } from 'react-icons/go';
import { Link } from 'react-router-dom';

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string; // changed from content to description
    published: string;
    tags: string;
  };
}

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('https://tadeasfort.eu/strapi/api/articles') // replace with your Strapi URL
      .then(response => response.json())
      .then(data => setArticles(data.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Container p={{ base: 5, md: 10 }}>
      <VStack spacing={8} w={{ base: 'auto', md: '2xl' }}>
        {articles.map(article => (
          <Stack
            key={article.id}
            direction="column"
            spacing={4}
            p={4}
            bg={useColorModeValue('gray.100', 'gray.800')}
            border="1px solid"
            borderColor="blue.100"
            _hover={{
              borderColor: 'blue.300',
              boxShadow: useColorModeValue(
                '0 4px 6px rgba(160, 174, 192, 0.6)',
                '0 4px 6px rgba(9, 17, 28, 0.9)'
              )
            }}
            rounded="lg"
          >
            <HStack spacing={2} mb={1}>
              {article.attributes.tags.split(',').map((tag, index) => (
                <Tag
                  key={index}
                  colorScheme={useColorModeValue('blackAlpha', 'gray')}
                  borderRadius="full"
                >
                  {tag.trim()}
                </Tag>
              ))}
            </HStack>
            <Box textAlign="left">
              <ChakraLink
                as={Link}
                to={`/blog/${article.id}`}
                fontSize="xl"
                lineHeight={1.2}
                fontWeight="bold"
                w="100%"
                _hover={{ color: 'blue.400', textDecoration: 'underline' }}
              >
                {article.attributes.title}
              </ChakraLink>
              <Text fontSize="md" color="gray.500" noOfLines={2} lineHeight="normal">
                {article.attributes.description} 
              </Text>
            </Box>
            <Box>
              <Stack justify="space-between" direction={{ base: 'column', sm: 'row' }}>
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    {new Date(article.attributes.published).toLocaleString()}
                  </Text>
                </Box>
                <HStack
                  as={Link}
                  to={`/blog/${article.id}`}
                  spacing={1}
                  p={1}
                  alignItems="center"
                  height="2rem"
                  w="max-content"
                  margin="auto 0"
                  rounded="md"
                  color="blue.400"
                  _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                >
                  <Text fontSize="sm"> Read more</Text>
                  <Icon as={GoChevronRight} w={4} h={4} />
                </HStack>
              </Stack>
            </Box>
          </Stack>
        ))}
      </VStack>
    </Container>
  );
};

export default Blog;
