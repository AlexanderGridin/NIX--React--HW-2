export default function isValidImagesCategory(category) {
  const CATEGORY_IS_VALID = true;
  const CATEGORY_IS_INVALID = false;

  const validCategories = [
    "backgrounds",
    "fashion",
    "nature",
    "science",
    "education",
    "feelings",
    "health",
    "people",
    "religion",
    "places",
    "animals",
    "industry",
    "computer",
    "food",
    "sports",
    "transportation",
    "travel",
    "buildings",
    "business",
    "music"
  ];

  for (let validCategory of validCategories) {
    if (validCategory === category.toLowerCase()) {
      return CATEGORY_IS_VALID;
    }
  }

  return CATEGORY_IS_INVALID;
}
