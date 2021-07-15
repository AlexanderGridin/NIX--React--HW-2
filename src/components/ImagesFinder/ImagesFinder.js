import React from "react";

import getJSONDataFromApi from "../../lib/getJSONDataFromApi";
import imagesCategoryValidator from "../../lib/imagesCategoryValidator";
import PixabayApi from "../../lib/PixabayApi";
import messages from "../../lib/messages";

import SearchForm from "../SearchForm/SearchForm";
import ImagesGallery from "../ImagesGallery/ImagesGallery";
import Modal from "../Modal/Modal";
import Image from "../generic/Image/Image";

export default class ImagesFinder extends React.Component {
  constructor(props) {
    super(props);

    this.IMAGES_FINDER_SEARCH_INPUT_LAST_VALUE =
      "imagesFinderSearchInputLastValue";
    this.IMAGES_PER_PAGE = 24;

    this.state = {
      categoryForSearch: null,
      searchInputLastValue: null,

      apiTotalAccessibleImages: null,
      apiImages: null,

      activeGalleryItemIndex: null,
      isRenderModal: false
    };

    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
    this.handleSearchFormInputSuccessValidation = this.handleSearchFormInputSuccessValidation.bind(
      this
    );
    this.handleSearchFormInputValidationFailure = this.handleSearchFormInputValidationFailure.bind(
      this
    );

    this.handleImagesGalleryItemClick = this.handleImagesGalleryItemClick.bind(
      this
    );
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleSearchFormSubmit(e) {
    e.preventDefault();

    const {
      handleSearchFormInputSuccessValidation,
      handleSearchFormInputValidationFailure
    } = this;
    const searchForm = e.target;
    const [searchInput] = searchForm.elements;
    const categoryForSearch = searchInput.value.trim().toLowerCase();

    imagesCategoryValidator
      .validate(categoryForSearch)
      .success(() => {
        handleSearchFormInputSuccessValidation(categoryForSearch);
      })
      .fail(() => {
        handleSearchFormInputValidationFailure(searchForm);
      });
  }

  handleSearchFormInputSuccessValidation(categoryForSearch) {
    const { IMAGES_FINDER_SEARCH_INPUT_LAST_VALUE, IMAGES_PER_PAGE } = this;
    const requestUrl = new PixabayApi()
      .createRequestUrl()
      .addGetParameter("category", categoryForSearch)
      .addGetParameter("per_page", IMAGES_PER_PAGE)
      .getRequestUrl();

    localStorage.setItem(
      IMAGES_FINDER_SEARCH_INPUT_LAST_VALUE,
      categoryForSearch
    );

    this.setState({
      categoryForSearch,
      searchInputLastValue: categoryForSearch
    });

    getJSONDataFromApi(requestUrl).then((data) => {
      this.setState({
        apiTotalAccessibleImages: data.totalHits,
        apiImages: data.hits
      });
    });
  }

  handleSearchFormInputValidationFailure(searchForm) {
    searchForm.reset();
    this.setState({
      apiImages: null,
      noImagesMessage: messages.ImagesFinder.INVALID_SEARCH_FORM_INPUT_VALUE,
      categoryForSearch: null
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
    const { IMAGES_FINDER_SEARCH_INPUT_LAST_VALUE, IMAGES_PER_PAGE } = this;
    const searchInputLastValue = localStorage.getItem(
      IMAGES_FINDER_SEARCH_INPUT_LAST_VALUE
    );
    const requestUrl = new PixabayApi()
      .createRequestUrl()
      .addGetParameter("category", searchInputLastValue)
      .addGetParameter("per_page", IMAGES_PER_PAGE)
      .getRequestUrl();

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
