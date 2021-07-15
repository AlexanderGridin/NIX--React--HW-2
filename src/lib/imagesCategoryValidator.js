import isValidImagesCategory from "./isValidImagesCategory";

let imagesCategoryValidator = {
  VALIDATION_FAILURE: false,
  VALIDATION_SUCCESS: true,
  validationStatus: null,

  validate(category) {
    if (!category || !isValidImagesCategory(category)) {
      this.validationStatus = this.VALIDATION_FAILURE;
      return this;
    }

    this.validationStatus = this.VALIDATION_SUCCESS;
    return this;
  },

  success(callback) {
    if (this.validationStatus === this.VALIDATION_SUCCESS) {
      callback();
      return this;
    }

    return this;
  },

  fail(callback) {
    if (this.validationStatus === this.VALIDATION_FAILURE) {
      callback();
      return this;
    }

    return this;
  }
};

export default imagesCategoryValidator;
