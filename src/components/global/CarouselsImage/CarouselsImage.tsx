import { Box, Tag, useDisclosure } from "@chakra-ui/react";
import "./carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { isMobile } from "react-device-detect";
import ModelBase from "../Model/ModelBase";

interface ICarouselsImage {
  listImages: Array<string>;
  thumb: boolean;
  popup: boolean;
  showPage?: boolean;
}

function CarouselsImage({
  listImages,
  thumb = false,
  popup = false,
  showPage = true,
}: ICarouselsImage) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getConfigurableProps = () => ({
    infiniteLoop: true,
    showThumbs: thumb,
    emulateTouch: true,
    thumbWidth: 100,
    showIndicators: false,
    showStatus: showPage,
  });

  const handlePopup = () => {
    if (!popup) return;
    if (isMobile) return;
    onOpen();
  };

  return (
    <>
      <ModelBase
        size="4xl"
        isOpen={isOpen}
        onClose={onClose}
        TextData={
          <Carousel {...getConfigurableProps()}>
            {listImages.map((url, index) => (
              <Box
                rounded="md"
                key={index}
                overflow="hidden"
                onClick={handlePopup}
              >
                <img alt="" src={url} />
              </Box>
            ))}
          </Carousel>
        }
        children={null}
      />
      <Box position={"relative"} width="100%">
        <Carousel {...getConfigurableProps()}>
          {listImages.map((url, index) => (
            <Box
              rounded="md"
              key={index}
              overflow="hidden"
              onClick={handlePopup}
            >
              <img alt="chinh.dev" src={url} />
            </Box>
          ))}
        </Carousel>
        {popup && !isMobile && (
          <Tag position="absolute" zIndex={99} top="10px" left="10px" opacity=".7">
            Click để phóng to
          </Tag>
        )}
      </Box>
    </>
  );
}

export default CarouselsImage;
