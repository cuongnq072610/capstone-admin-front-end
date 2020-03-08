const API_ENDPOINT = "https://capstonebackendapi.herokuapp.com";

const ALL_COURSE = "/allcourses";
const GET_COURSE = '/getcourse';
const CREATE_COURSE = '/createcourse';
const DELETE_COURSE = '/deletecourse';
const UPDATE_COURSES = '/updatecourse';
const SEARCH_COURSES = '/searchcourse';
const ALL_TEACHER = '/allteachers';
const UPDATE_TEACHER_ACTIVE = '/changeteacherisactive';
const SEARCH_TEACHERS = '/searchteacher';

const GET_ALL_HIGHLIGHT = "/allhighlightbystudentid/5e4ea4d07c213e67373d3cdb";
const DELETE_HIGHLIGHT = "/deletehighlightbyid";

const GET_ALL_NOTE = "/allnotebystudentid/5e4ea4d07c213e67373d3cdb";
const GET_NOTE_BY_ID = "/getnotebyid";

const GET_ALL_FOLDER = "/allfolderbystudentid/5e4ea4d07c213e67373d3cdb";
const CREATE_NEW_FOLDER = '/createfolder';

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
    GET_ALL_FOLDER,
    CREATE_NEW_FOLDER,
}