const API_ENDPOINT = "https://capstonebackendapi.herokuapp.com";
const API_ENDPOINT_WS = "ws://capstonebackendapi.herokuapp.com";

const ALL_COURSE = "/allcourses";
const GET_COURSE = '/getcourse';
const CREATE_COURSE = '/createcourse';
const DELETE_COURSES = '/deletecourse';
const UPDATE_COURSES = '/updatecourse';
const SEARCH_COURSES = '/searchcourse';
const ALL_TEACHER = '/allteachers';
const UPDATE_TEACHER_ACTIVE = '/changeteacherisactive';
const SEARCH_TEACHERS = '/searchteacher';

const GET_RECENT_HIGHLIGHT = "/getRecentHighlight";
const DELETE_HIGHLIGHT_BY_ID = "/deletehighlightbyid";
const GET_HIGHLIGHT_BY_FOLDER = "/getHighlightByFolderID";
const GET_HIGHLIGHT_BY_COLOR = '/getHighlightByColor';
const GET_SEARCH_HIGHLIGHT = '/searchHighlight';
const GET_HIGHLIGHT_FOLDER = '/getFolderByStudentID';
const DELETE_HIGHLIGHTS_BY_FOLDER = '/deleteHighlightByFolderID';

const GET_RECENT_NOTE = "/getRecentNote";
const GET_NOTE_BY_ID = "/getnotebyid";
const UPDATE_NOTE_BY_ID = "/updatenotebyid";
const DELETE_NOTE_BY_ID = "/deletenotebyid";
const GET_NOTE_BY_FOLDER = "/getNoteByFolderID";
const GET_SEARCH_NOTE = '/searchNote';
const GET_NOTE_FOLDER = '/getFolderByStudentID';
const DELETE_NOTES_BY_FOLDER = "/deleteNoteByFolderID";

const GET_ALL_ASK = "/allaskofstudent";
const GET_ASK_BY_ID = "/getAsk";
const GET_ALL_ASK_TEACHER = '/allaskofteacher';
const CLOSE_ASK_API = '/closeAsk';
const SEARCH_ASK_API = '/searchAsk';
const CREATE_ASK_API = '/createask';
const REOPEN_ASK = '/openAsk';

const GET_ALL_DEPARTMENT = '/allDepartment';
const CREATE_DEPARTMENT = '/createDepartment';
const DELETE_DEPARTMENT = '/deleteDepartment';
const UPDATE_DEPARTMENT = '/updateDepartment';
const SEARCH_DEPARTMENTS = '/searchDepartment';

const GET_STUDENT_INFO = '/getstudentbyid';
const UPDATE_STUDENT_COURSE = '/updatestudentcourse';
const GET_STUDENT_STATISTIC = '/getStudentStatistic';
const EXIT_COURSE = '/exitCourse';

const LOGIN_API = '/login';
const GET_ADMIN_STATISTIC = '/getStatisticNumber';
const DELETE_FOLDER_API = '/deleteFolderByID';
const GET_REPORT = '/getReport';

const CREATE_FAQ = '/createFAQ';
const LOAD_FAQ_API = '/getAllFAQ';
const SEARCH_FAQ_API = '/searchFAQ';
const LOAD_DETAIL_API = '/getFAQ';
const REMOVE_FAQ = '/removeFAQ';
const LOAD_FILTER_FAQ = '/getFAQbyFilter';

const GET_TEACHER_STATISTIC_API = '/getTeacherDashboard';

export {
    API_ENDPOINT,
    API_ENDPOINT_WS,
    //COURSE
    ALL_COURSE,
    GET_COURSE,
    CREATE_COURSE,
    DELETE_COURSES,
    UPDATE_COURSES,
    SEARCH_COURSES,
    //TEACHER
    ALL_TEACHER,
    UPDATE_TEACHER_ACTIVE,
    SEARCH_TEACHERS,
    //HIGHLIGHT
    GET_RECENT_HIGHLIGHT,
    DELETE_HIGHLIGHT_BY_ID,
    GET_HIGHLIGHT_BY_FOLDER,
    GET_HIGHLIGHT_BY_COLOR,
    GET_SEARCH_HIGHLIGHT,
    GET_HIGHLIGHT_FOLDER,
    DELETE_HIGHLIGHTS_BY_FOLDER,
    //NOTE
    GET_RECENT_NOTE,
    GET_NOTE_BY_ID,
    UPDATE_NOTE_BY_ID,
    DELETE_NOTE_BY_ID,
    GET_NOTE_BY_FOLDER,
    GET_SEARCH_NOTE,
    GET_NOTE_FOLDER,
    DELETE_NOTES_BY_FOLDER,
    //ASK
    GET_ALL_ASK,
    GET_ASK_BY_ID,
    GET_ALL_DEPARTMENT,
    GET_ALL_ASK_TEACHER,
    CLOSE_ASK_API,
    SEARCH_ASK_API,
    CREATE_ASK_API,
    REOPEN_ASK,
    //STUDENT
    GET_STUDENT_INFO,
    UPDATE_STUDENT_COURSE,
    GET_STUDENT_STATISTIC,
    //USER
    LOGIN_API,
    //DEPARTMENT
    CREATE_DEPARTMENT,
    DELETE_DEPARTMENT,
    UPDATE_DEPARTMENT,
    SEARCH_DEPARTMENTS,
    //ADMIN
    GET_ADMIN_STATISTIC,
    //
    DELETE_FOLDER_API,
    GET_REPORT,
    EXIT_COURSE,
    //FAQ
    CREATE_FAQ,
    LOAD_FAQ_API,
    SEARCH_FAQ_API,
    LOAD_DETAIL_API,
    REMOVE_FAQ,
    LOAD_FILTER_FAQ,
    //
    GET_TEACHER_STATISTIC_API,
}