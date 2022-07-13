import authReducer from './auth.reducer.js';
import provinceReducer from './province.reducer.js';
import constructionReducer from './construction.reduce.js';
import langReducer from './lang.reducer.js';
const rootReducer = {
    authState: authReducer,
    provinceState: provinceReducer,
    constructionState:  constructionReducer,
    langState: langReducer
};

export default rootReducer;
