import styles from "./ImagesGallery.module.css";

export default function ImagesGallery({
  images,
  activeItemIndex,
  handleItemClick
}) {
  return (
    <div
      className={`${styles.gallery} ${
        images ? styles.withImages : styles.noImages
      }`}
    >
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
        "No images to display..."
      )}
    </div>
  );
}

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

function ImagesGalleryImage({ src, alt }) {
  return <img className={styles.image} src={src} alt={alt} />;
}
