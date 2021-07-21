import React from "react";

import getJSONDataFromApi from "../../lib/getJSONDataFromApi";
import imagesCategoryValidator from "../../lib/imagesCategoryValidator";
import PixabayApi from "../../lib/PixabayApi";
import imagesFinderConstants from "../../constants/imagesFinder";

import SearchForm from "../SearchForm/SearchForm";
import ImagesGallery from "../ImagesGallery/ImagesGallery";
import Modal from "../Modal/Modal";
import Image from "../generic/Image/Image";
import Pagination from "../Pagination/Pagination";

export default class ImagesFinder extends React.Component {
  constructor(props) {
    super(props);

    this.searchFormRef = React.createRef();
    this.searchFormInputRef = React.createRef();

    this.state = {
      categoryForSearch: null,
      searchInputLastValue: null,

      apiTotalAccessibleImages: null,
      apiImages: null,

      activeGalleryItemIndex: null,

      paginationCurrentPage: null,
      paginationTotalPages: null
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

    this.handlePaginationNext = this.handlePaginationNext.bind(this);
    this.handlePaginationPrev = this.handlePaginationPrev.bind(this);
  }

  handleSearchFormSubmit(e) {
    e.preventDefault();

    const {
      handleSearchFormInputSuccessValidation,
      handleSearchFormInputValidationFailure,
      searchFormRef,
      searchFormInputRef
    } = this;

    const searchForm = searchFormRef.current;
    const searchFormInput = searchFormInputRef.current;
    const categoryForSearch = searchFormInput.value.trim().toLowerCase();

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
    const { IMAGES_PER_PAGE } = imagesFinderConstants;
    const { PAGINTAION_FIRST_PAGE } = imagesFinderConstants.pagination;

    const {
      IMAGES_FINDER_SEARCH_INPUT_LAST_VALUE,
      IMAGES_FINDER_PAGINATION_CURRENT_PAGE,
      IMAGES_FINDER_PAGINATION_TOTAL_PAGES
    } = imagesFinderConstants.localStorage.variablesNames;

    const requestUrl = new PixabayApi()
      .createRequestUrl()
      .addGetParameter("category", categoryForSearch)
      .addGetParameter("per_page", IMAGES_PER_PAGE)
      .addGetParameter("page", PAGINTAION_FIRST_PAGE)
      .getRequestUrl();

    localStorage.setItem(
      IMAGES_FINDER_SEARCH_INPUT_LAST_VALUE,
      categoryForSearch
    );

    localStorage.setItem(
      IMAGES_FINDER_PAGINATION_CURRENT_PAGE,
      PAGINTAION_FIRST_PAGE
    );

    this.setState({
      categoryForSearch,
      searchInputLastValue: categoryForSearch
    });

    getJSONDataFromApi(requestUrl).then((data) => {
      const totalPages = Math.ceil(data.totalHits / IMAGES_PER_PAGE);

      localStorage.setItem(IMAGES_FINDER_PAGINATION_TOTAL_PAGES, totalPages);

      this.setState({
        apiTotalAccessibleImages: data.totalHits,
        apiImages: data.hits,
        paginationTotalPages: totalPages,
        paginationCurrentPage: PAGINTAION_FIRST_PAGE
      });
    });
  }

  handleSearchFormInputValidationFailure(searchForm) {
    const { INVALID_SEARCH_FORM_INPUT_VALUE } = imagesFinderConstants.messages;

    searchForm.reset();
    this.setState({
      apiImages: null,
      noImagesMessage: INVALID_SEARCH_FORM_INPUT_VALUE,
      categoryForSearch: null,
      paginationCurrentPage: null,
      paginationTotalPages: null
    });
  }

  handleImagesGalleryItemClick(selectedGalleryItemIndex) {
    this.setState((state) => {
      return {
        activeGalleryItemIndex: selectedGalleryItemIndex
      };
    });
  }

  handleModalClose() {
    this.setState((state) => {
      return {
        activeGalleryItemIndex: null
      };
    });
  }

  handlePaginationNext() {
    const {
      paginationCurrentPage,
      paginationTotalPages,
      categoryForSearch
    } = this.state;

    const { IMAGES_PER_PAGE } = imagesFinderConstants;
    const { PAGINATION_OFFSET } = imagesFinderConstants.pagination;

    const {
      IMAGES_FINDER_PAGINATION_CURRENT_PAGE,
      IMAGES_FINDER_PAGINATION_TOTAL_PAGES
    } = imagesFinderConstants.localStorage.variablesNames;

    if (paginationCurrentPage === paginationTotalPages) {
      return;
    }

    const requestUrl = new PixabayApi()
      .createRequestUrl()
      .addGetParameter("category", categoryForSearch)
      .addGetParameter("per_page", IMAGES_PER_PAGE)
      .addGetParameter(
        "page",
        this.state.paginationCurrentPage + PAGINATION_OFFSET
      )
      .getRequestUrl();

    getJSONDataFromApi(requestUrl).then((data) => {
      const totalPages = Math.ceil(data.totalHits / IMAGES_PER_PAGE);

      localStorage.setItem(IMAGES_FINDER_PAGINATION_TOTAL_PAGES, totalPages);
      localStorage.setItem(
        IMAGES_FINDER_PAGINATION_CURRENT_PAGE,
        paginationCurrentPage + PAGINATION_OFFSET
      );

      this.setState((state) => {
        return {
          apiTotalAccessibleImages: data.totalHits,
          apiImages: data.hits,
          paginationCurrentPage: ++state.paginationCurrentPage
        };
      });
    });
  }

  handlePaginationPrev() {
    const { paginationCurrentPage, categoryForSearch } = this.state;

    const { IMAGES_PER_PAGE } = imagesFinderConstants;
    const {
      PAGINATION_OFFSET,
      PAGINTAION_FIRST_PAGE
    } = imagesFinderConstants.pagination;

    const {
      IMAGES_FINDER_PAGINATION_CURRENT_PAGE,
      IMAGES_FINDER_PAGINATION_TOTAL_PAGES
    } = imagesFinderConstants.localStorage.variablesNames;

    if (
      paginationCurrentPage === PAGINTAION_FIRST_PAGE ||
      paginationCurrentPage === null
    ) {
      return;
    }

    const requestUrl = new PixabayApi()
      .createRequestUrl()
      .addGetParameter("category", categoryForSearch)
      .addGetParameter("per_page", IMAGES_PER_PAGE)
      .addGetParameter(
        "page",
        this.state.paginationCurrentPage - PAGINATION_OFFSET
      )
      .getRequestUrl();

    getJSONDataFromApi(requestUrl).then((data) => {
      const totalPages = Math.ceil(data.totalHits / IMAGES_PER_PAGE);

      localStorage.setItem(IMAGES_FINDER_PAGINATION_TOTAL_PAGES, totalPages);
      localStorage.setItem(
        IMAGES_FINDER_PAGINATION_CURRENT_PAGE,
        paginationCurrentPage - PAGINATION_OFFSET
      );

      this.setState((state) => {
        return {
          apiTotalAccessibleImages: data.totalHits,
          apiImages: data.hits,
          paginationCurrentPage: --state.paginationCurrentPage
        };
      });
    });
  }

  componentDidMount() {
    const { IMAGES_PER_PAGE } = imagesFinderConstants;

    const {
      IMAGES_FINDER_SEARCH_INPUT_LAST_VALUE,
      IMAGES_FINDER_PAGINATION_CURRENT_PAGE,
      IMAGES_FINDER_PAGINATION_TOTAL_PAGES
    } = imagesFinderConstants.localStorage.variablesNames;

    const searchInputLastValue = localStorage.getItem(
      IMAGES_FINDER_SEARCH_INPUT_LAST_VALUE
    );

    const paginationTotalPages = +localStorage.getItem(
      IMAGES_FINDER_PAGINATION_TOTAL_PAGES
    );

    const paginationCurrentPage = +localStorage.getItem(
      IMAGES_FINDER_PAGINATION_CURRENT_PAGE
    );

    const requestUrl = new PixabayApi()
      .createRequestUrl()
      .addGetParameter("category", searchInputLastValue)
      .addGetParameter("per_page", IMAGES_PER_PAGE)
      .addGetParameter("page", paginationCurrentPage)
      .getRequestUrl();

    if (!searchInputLastValue) {
      return;
    }

    getJSONDataFromApi(requestUrl).then((data) => {
      this.setState({
        searchInputLastValue,
        categoryForSearch: searchInputLastValue,
        paginationCurrentPage: paginationCurrentPage,
        paginationTotalPages: paginationTotalPages,
        apiTotalAccessibleImages: data.totalHits,
        apiImages: data.hits
      });
    });
  }

  render() {
    const {
      handleSearchFormSubmit,
      handleImagesGalleryItemClick,
      handleModalClose,
      handlePaginationNext,
      handlePaginationPrev,
      searchFormRef,
      searchFormInputRef
    } = this;
    const {
      apiImages,
      activeGalleryItemIndex,
      searchInputLastValue,
      noImagesMessage,
      paginationCurrentPage,
      paginationTotalPages
    } = this.state;

    return (
      <div>
        <SearchForm
          inputLastValue={searchInputLastValue}
          onSubmit={handleSearchFormSubmit}
          formReference={searchFormRef}
          inputReference={searchFormInputRef}
        />
        {paginationTotalPages && (
          <Pagination
            currentPage={paginationCurrentPage}
            totalPages={paginationTotalPages}
            onNext={handlePaginationNext}
            onPrev={handlePaginationPrev}
          />
        )}
        <ImagesGallery
          images={this.state.apiImages}
          activeItemIndex={activeGalleryItemIndex}
          handleItemClick={handleImagesGalleryItemClick}
          noImagesMessage={noImagesMessage}
        />
        {activeGalleryItemIndex !== null && (
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
