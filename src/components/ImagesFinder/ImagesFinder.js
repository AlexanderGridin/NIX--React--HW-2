import React from "react";

import getJSONDataFromApi from "../../lib/getJSONDataFromApi";
import isValidImagesCategory from "../../lib/isValidImagesCategory";

import SearchForm from "../SearchForm/SearchForm";
import ImagesGallery from "../ImagesGallery/ImagesGallery";
import Modal from "../Modal/Modal";
import Image from "../generic/Image/Image";

export default class ImagesFinder extends React.Component {
  constructor(props) {
    super(props);

    this.imagesApiUrl = "https://pixabay.com/api/";
    this.imagesApiKey = "22470526-412f3aeb0ddde7d412a24acdb";

    this.NO_IMAGES_MESSAGE = "No images to display...";
    this.EMPTY_INPUT_MESSAGE = "Please, type category for search...";
    this.INVALID_INPUT_VALUE = "Please, type valid category...";

    this.state = {
      categoryForSearch: null,
      searchInputLastValue: null,

      apiTotalAccessibleImages: null,
      apiImages: null,

      activeGalleryItemIndex: null,
      isRenderModal: false
    };

    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
    this.handleImagesGalleryItemClick = this.handleImagesGalleryItemClick.bind(
      this
    );
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleSearchFormSubmit(e) {
    e.preventDefault();

    const searchForm = e.target;
    const [searchInput] = searchForm.elements;
    const categoryForSearch = searchInput.value.trim().toLowerCase();
    const requestUrl = `${this.imagesApiUrl}?key=${this.imagesApiKey}&category=${categoryForSearch}`;

    if (!categoryForSearch) {
      searchForm.reset();
      this.setState({
        apiImages: null,
        noImagesMessage: this.EMPTY_INPUT_MESSAGE,
        categoryForSearch: null
      });
      localStorage.removeItem("imagesFinderSearchInputLastValue");

      return;
    }

    if (!isValidImagesCategory(categoryForSearch)) {
      searchForm.reset();
      this.setState({
        apiImages: null,
        noImagesMessage: this.INVALID_INPUT_VALUE,
        categoryForSearch: null
      });
      localStorage.removeItem("imagesFinderSearchInputLastValue");

      return;
    }
    localStorage.setItem("imagesFinderSearchInputLastValue", categoryForSearch);

    this.setState({
      categoryForSearch
    });

    getJSONDataFromApi(requestUrl).then((data) => {
      this.setState({
        apiTotalAccessibleImages: data.totalHits,
        apiImages: data.hits
      });
    });
  }

  handleImagesGalleryItemClick(selectedGalleryItemIndex) {
    this.setState((state) => {
      return {
        activeGalleryItemIndex: selectedGalleryItemIndex,
        isRenderModal: !state.isRenderModal
      };
    });
  }

  handleModalClose() {
    this.setState((state) => {
      return {
        activeGalleryItemIndex: null,
        isRenderModal: !state.isRenderModal
      };
    });
  }

  componentDidMount() {
    const searchInputLastValue = localStorage.getItem(
      "imagesFinderSearchInputLastValue"
    );
    const { imagesApiUrl, imagesApiKey } = this;
    const requestUrl = `${imagesApiUrl}?key=${imagesApiKey}&category=${searchInputLastValue}`;

    if (!searchInputLastValue) {
      return;
    }

    this.setState({
      searchInputLastValue
    });

    getJSONDataFromApi(requestUrl).then((data) => {
      this.setState({
        apiTotalAccessibleImages: data.totalHits,
        apiImages: data.hits
      });
    });
  }

  render() {
    const {
      handleSearchFormSubmit,
      handleImagesGalleryItemClick,
      handleModalClose
    } = this;
    const {
      isRenderModal,
      apiImages,
      activeGalleryItemIndex,
      searchInputLastValue,
      noImagesMessage
    } = this.state;

    return (
      <div>
        <SearchForm
          inputLastValue={searchInputLastValue}
          onSubmit={handleSearchFormSubmit}
        />
        <ImagesGallery
          images={this.state.apiImages}
          activeItemIndex={activeGalleryItemIndex}
          handleItemClick={handleImagesGalleryItemClick}
          noImagesMessage={noImagesMessage}
        />
        {isRenderModal && (
          <Modal
            onClose={handleModalClose}
            contentBackgroundImageUrl={
              apiImages[activeGalleryItemIndex].largeImageURL
            }
          >
            <Image
              src={apiImages[activeGalleryItemIndex].largeImageURL}
              alt={apiImages[activeGalleryItemIndex].user}
            />
          </Modal>
        )}
      </div>
    );
  }
}
