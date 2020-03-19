// const API_ENDPOINT = "https://capstonebackendapi.herokuapp.com";
const API_ENDPOINT = "http://localhost:5000/";

const ALL_COURSE = "/allcourses";
const GET_COURSE = '/getcourse';
const CREATE_COURSE = '/createcourse';
const DELETE_COURSE = '/deletecourse';
const UPDATE_COURSES = '/updatecourse';
const SEARCH_COURSES = '/searchcourse';
const ALL_TEACHER = '/allteachers';
const UPDATE_TEACHER_ACTIVE = '/changeteacherisactive';
const SEARCH_TEACHERS = '/searchteacher';

const GET_ALL_HIGHLIGHT = "/allhighlightbystudentid/5e6a7eddb42dae46b2c25a01";
const DELETE_HIGHLIGHT = "/deletehighlightbyid";

const GET_ALL_NOTE = "/allnotebystudentid/5e6a7eddb42dae46b2c25a01";
const GET_NOTE_BY_ID = "/getnotebyid";
const UPDATE_NOTE_BY_ID = "/updatenotebyid";
const DELETE_NOTE_BY_ID = "/deletenotebyid";

const GET_ALL_FOLDER = "/allfolderbystudentid/5e6a7eddb42dae46b2c25a01";
const CREATE_NEW_FOLDER = '/createfolder';
const GET_ALL_ASK = "/allaskofstudent/5e6a7eddb42dae46b2c25a01";
const GET_ASK_BY_ID = "/getaskbyid";

const GET_ALL_DEPARTMENT = '/allDepartment';

export {
    API_ENDPOINT,
    ALL_COURSE,
    GET_COURSE,
    CREATE_COURSE,
    DELETE_COURSE,
    UPDATE_COURSES,
    SEARCH_COURSES,
    ALL_TEACHER,
    UPDATE_TEACHER_ACTIVE,
    SEARCH_TEACHERS,
    GET_ALL_HIGHLIGHT,
    DELETE_HIGHLIGHT,
    GET_ALL_NOTE,
    GET_NOTE_BY_ID,
    UPDATE_NOTE_BY_ID,
    DELETE_NOTE_BY_ID,
    GET_ALL_FOLDER,
    CREATE_NEW_FOLDER,
    GET_ALL_ASK,
    GET_ASK_BY_ID,
    GET_ALL_DEPARTMENT,
}