const imagesFinderConstants = {
  IMAGES_PER_PAGE: 18,

  pagination: {
    PAGINTAION_FIRST_PAGE: 1,
    PAGINATION_OFFSET: 1
  },

  localStorage: {
    variablesNames: {
      IMAGES_FINDER_SEARCH_INPUT_LAST_VALUE: "imagesFinderSearchInputLastValue",
      IMAGES_FINDER_PAGINATION_CURRENT_PAGE:
        "imagesFinderPaginationCurrentPage",
      IMAGES_FINDER_PAGINATION_TOTAL_PAGES: "imagesFinderPaginationTotalPages"
    }
  },

  messages: {
    NO_IMAGES_MESSAGE: "No images to display...",
    EMPTY_SEARCH_FORM_INPUT_MESSAGE: "Please, type category for search...",
    INVALID_SEARCH_FORM_INPUT_VALUE: "Please, type valid category..."
  }
};

export default imagesFinderConstants;
