import React, { useEffect, useState } from 'react';
import { Box, Badge, SimpleGrid, Container, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

interface Image {
  id: number;
  attributes: {
    name: string;
    formats: {
      thumbnail: ImageFormat;
      small: ImageFormat;
      medium: ImageFormat;
      large: ImageFormat;
    };
    url: string;
  };
}

interface Gallery {
  id: number;
  attributes: {
    title: string;
    description: string;
    publish: string;
    gallery: {
      data: Image[];
    };
  };
}

const baseURL = 'https://tadeasfort.eu/strapi';

const Photography = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);

  useEffect(() => {
    fetch(`${baseURL}/api/galleries?populate=*`)
      .then(response => response.json())
      .then(data => setGalleries(data.data));
  }, []);

  return (
    <Container maxWidth="1200px" mx="auto" my="auto" p={{ base: 5, md: 10 }}>
      <SimpleGrid columns={[1, 2, 3]} spacing="15px">
        {galleries.map((gallery) => {
          const { title, description, gallery: galleryData } = gallery.attributes;
          const image = galleryData.data[0].attributes.formats.medium.url; // Use the first image from the gallery
          return (
            <Box position="relative" key={gallery.id}>
              <Link to={`/gallery/${gallery.id}`}>
                <Box
                  borderWidth="1px"
                  shadow="md"
                  rounded="lg"
                  overflow="hidden"
                  position="relative"
                >
                  <Image src={`${baseURL}${image}`} alt={title} />
                  <Box p={{ base: 4, lg: 6 }}>
                    <Box alignItems="baseline">
                      <Box
                        fontWeight="semibold"
                        as="h2"
                        letterSpacing="wide"
                        textTransform="uppercase"
                        ml="2"
                      >
                        {title}
                      </Box>
                    </Box>
                    <Box>
                      <Box color="gray.600" fontSize="sm">
                        <Badge rounded="full" px="2" colorScheme="teal">
                          Published
                        </Badge>
                      </Box>
                    </Box>
                    <Text
                      mt="1"
                      fontWeight="semibold"
                      noOfLines={3}
                      lineHeight="tight"
                      color="gray.600"
                      fontSize="sm"
                    >
                      {description}
                    </Text>
                  </Box>
                </Box>
              </Link>
            </Box>
          );
        })}
      </SimpleGrid>
    </Container>
  );
};

export default Photography;
