import { TYPES } from '../types.js';
import {en} from '../../language/en.js';
import {vi} from '../../language/vi.js';
import icons from '../../constants/icons.js';

const initState = {
    codeLang: null,
    languageCode:'en',
    language: en,
    languageName:'EN',
    flag:icons.ukFlag,
    listLang:[
        { name:'Tiếng Việt', code:'vi', source: icons.vietnamFlag},
        { name:'English', code:'en', source: icons.ukFlag}
    ]
};

const langReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case TYPES.SET_LANGUAGE:
            switch(payload) {
                case 'vi':
                    return {
                        ...state,
                        language: vi,
                        flag:icons.vietnamFlag,
                        languageName:'VI',
                        languageCode:'vi',
                    };
                case 'en':
                    return {
                        ...state,
                        language: en,
                        flag:icons.ukFlag,
                        languageName:'EN',
                        languageCode:'en',
                    };
                default:
                  return state;
              }
        default:
            return state;
    }
};

export default langReducer;