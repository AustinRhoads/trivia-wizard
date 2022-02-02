

const SEARCH_ROUTES = {
    BASE_URL: "https://opentdb.com/api.php?",
    CATEGORIES_URL: "https://opentdb.com/api_category.php",
    RETRIEVE_TOKEN_URL: "https://opentdb.com/api_token.php?command=request",
    RESET_TOKEN_URL: "https://opentdb.com/api_token.php?command=reset&token=",
    ADD_CATEGORY: "&category=",
    ADD_TOKEN: "&token=",
    ADD_AMOUNT: "amount=",
    MULTIPLE_CHOICE_TYPE: "&type=multiple",
    TRUE_FALSE_TYPE: "&type=boolean",
    DIFFICULTY_PREFIX: "&difficulty=",
    SET_DIFFICULTY_TO_EASY: "&difficulty=easy",   
    SET_DIFFICULTY_TO_MEDIUM: "&difficulty=medium",
    SET_DIFFICULTY_TO_HARD: "&difficulty=hard",


};

export default SEARCH_ROUTES;