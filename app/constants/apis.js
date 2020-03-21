// const API_ENDPOINT = "https://capstonebackendapi.herokuapp.com";
const API_ENDPOINT = "http://localhost:5000";

const ALL_COURSE = "/allcourses";
const GET_COURSE = '/getcourse';
const CREATE_COURSE = '/createcourse';
const DELETE_COURSE = '/deletecourse';
const UPDATE_COURSES = '/updatecourse';
const SEARCH_COURSES = '/searchcourse';
const ALL_TEACHER = '/allteachers';
const UPDATE_TEACHER_ACTIVE = '/changeteacherisactive';
const SEARCH_TEACHERS = '/searchteacher';

const GET_RECENT_HIGHLIGHT = "/getRecentHighlight";
const DELETE_HIGHLIGHT_BY_ID = "/deletehighlightbyid";
const GET_HIGHLIGHT_BY_FOLDER = "/getHighlightByCourse";
const GET_HIGHLIGHT_BY_COLOR = '/getHighlightByColor';

const GET_RECENT_NOTE = "/getRecentNote";
const GET_NOTE_BY_ID = "/getnotebyid";
const UPDATE_NOTE_BY_ID = "/updatenotebyid";
const DELETE_NOTE_BY_ID = "/deletenotebyid";
const GET_NOTE_BY_FOLDER = "/getNoteByCourse";

const GET_ALL_FOLDER = "/allfolderbystudentid/5e6a7eddb42dae46b2c25a01";
const CREATE_NEW_FOLDER = '/createfolder';
const GET_ALL_ASK = "/allaskofstudent";
const GET_ASK_BY_ID = "/getaskbyid";
const GET_ALL_ASK_TEACHER = '/allaskofteacher';

const GET_ALL_DEPARTMENT = '/allDepartment';

const GET_STUDENT_INFO = '/getstudentbyid';
const UPDATE_STUDENT_COURSE = '/updatestudentcourse';
const GET_STUDENT_STATISTIC = '/getStudentStatistic';

const LOGIN_API = '/login';

export {
    API_ENDPOINT,
    //COURSE
    ALL_COURSE,
    GET_COURSE,
    CREATE_COURSE,
    DELETE_COURSE,
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
    //NOTE
    GET_RECENT_NOTE,
    GET_NOTE_BY_ID,
    UPDATE_NOTE_BY_ID,
    DELETE_NOTE_BY_ID,
    GET_ALL_FOLDER,
    CREATE_NEW_FOLDER,
    GET_NOTE_BY_FOLDER,
    //ASK
    GET_ALL_ASK,
    GET_ASK_BY_ID,
    GET_ALL_DEPARTMENT,
    GET_ALL_ASK_TEACHER,
    //STUDENT
    GET_STUDENT_INFO,
    UPDATE_STUDENT_COURSE,
    GET_STUDENT_STATISTIC,
    //USER
    LOGIN_API,
}