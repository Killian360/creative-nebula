import { createStore, combineReducers } from 'redux';
import MUSIC from './MUSIC_reducers.js';
import SOUND from './SOUND_reducers.js';
import MENU from './MENU_reducers.js';
import WEB_GL from './WEB_GL_reducers.js';
import DESKTOP from './DESKTOP_reducers.js';
import NAVIGATION from './NAVIGATION_reducers.js';
import NAVIGATIONhome from './NAVIGATION_opacity_reducers.js';
import NAVIGATIONshort from './NAVIGATION_short_reducers.js';
import PREVIEW from './PREVIEW_reducers.js';
import HOMESLIDE from './HOMESLIDE_reducers.js';
import CONTENTHOMESLIDE from './CONTENTHOMESLIDE_reducers.js';
import VIEWERON from './NAVIGATION_viewer.js';
import SLIDE from './SLIDE_reducers.js';
import {loader_SLIDE1, loader_SLIDE2, loader_SLIDE3} from './loader_SLIDE_reducers.js';
import NavCategory from './navCategories.js';
import NavCategoryButton from './NavCategoriesButton.js';
import LANG from './Lang_reducers.js';
import Navpanel from './nav_panel_reducers.js';
import NAVIGATIONTHEME from './NAVIGATION_theme.js';
import WEB_GL_Icon from './WEB_GL_Icons_reducers.js';
import MailStatus from './MailStatus.js';
import HOMEPREV_URL from './HOMEPREV_URL';

const rootReducer = combineReducers({
    MUSIC,
    SOUND,
    MENU,
    WEB_GL,
    DESKTOP,
    NAVIGATION,
    NAVIGATIONhome,
    NAVIGATIONshort,
    PREVIEW,
    SLIDE,
    loader_SLIDE1,
    loader_SLIDE2,
    loader_SLIDE3,
    HOMESLIDE,
    VIEWERON,
    NavCategory,
    NavCategoryButton,
    LANG,
    Navpanel,
    NAVIGATIONTHEME,
    WEB_GL_Icon,
    MailStatus,
    CONTENTHOMESLIDE,
    HOMEPREV_URL
});


export const store = createStore(rootReducer);
