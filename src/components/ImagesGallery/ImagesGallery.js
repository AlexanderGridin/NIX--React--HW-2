import PropTypes from "prop-types";
import styles from "./ImagesGallery.module.css";

export default function ImagesGallery({
  images,
  activeItemIndex,
  handleItemClick,
  noImagesMessage
}) {
  const { gallery, withImages, noImages } = styles;

  return (
    <div className={`${gallery} ${images ? withImages : noImages}`}>
      {images ? (
        <ImagesGalleryList>
          {images.map((image, index) => {
            return (
              <ImagesGalleryItem
                activeItemIndex={activeItemIndex}
                currentItemIndex={index}
                key={image.id}
                handleClick={handleItemClick}
              >
                <ImagesGalleryImage src={image.previewURL} alt={image.user} />
              </ImagesGalleryItem>
            );
          })}
        </ImagesGalleryList>
      ) : (
        noImagesMessage
      )}
    </div>
  );
}

ImagesGallery.propTypes = {
  images: PropTypes.array,
  activeItemIndex: PropTypes.number,
  handleItemClick: PropTypes.func
};

function ImagesGalleryList({ children }) {
  return <ul className={styles.list}>{children}</ul>;
}

function ImagesGalleryItem({
  activeItemIndex,
  currentItemIndex,
  handleClick,
  children
}) {
  return (
    <li
      className={`${styles.listItem} ${
        activeItemIndex === currentItemIndex ? styles.active : ""
      }`}
      onClick={() => {
        handleClick(currentItemIndex);
      }}
    >
      {children}
    </li>
  );
}

ImagesGalleryItem.propTypes = {
  activeItemIndex: PropTypes.number,
  currentItemIndex: PropTypes.number,
  handleClick: PropTypes.func
};

function ImagesGalleryImage({ src, alt }) {
  return <img className={styles.image} src={src} alt={alt} />;
}

ImagesGalleryImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
};
