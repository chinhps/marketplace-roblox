import { Box, Tag, useDisclosure } from "@chakra-ui/react";
import "./carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { isMobile } from "react-device-detect";
import ModelAlert from "../ModelAlert/ModelAlert";

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
      <ModelAlert
        isOpen={isOpen}
        title="Chi tiết hình ảnh"
        isClose={false}
        msg={
          <Carousel {...getConfigurableProps()}>
            {listImages.map((url, index) => (
              <Box
                rounded="2xl"
                key={index}
                overflow="hidden"
                onClick={handlePopup}
              >
                <img alt="" src={url} />
              </Box>
            ))}
          </Carousel>
        }
        onClose={onClose}
        size="5xl"
      />
      <Box position={"relative"} width="100%">
        <Carousel {...getConfigurableProps()}>
          {listImages.map((url, index) => (
            <Box
              rounded="2xl"
              key={index}
              overflow="hidden"
              onClick={handlePopup}
            >
              <img alt="chinh.dev" src={url} />
            </Box>
          ))}
        </Carousel>
        {popup && !isMobile && (
          <Tag position="absolute" zIndex={99} top="5%" left="2%" opacity=".9">
            Click để phóng to
          </Tag>
        )}
      </Box>
    </>
  );
}

export default CarouselsImage;
