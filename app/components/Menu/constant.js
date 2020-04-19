const AdminMenu = [
    {
        "name": "dashboard",
        "title": "Dashboard",
        "path": "/admin",
        'exact': true,
    },
    {
        "name": "department",
        "title": "Department",
        "path": "/department",
        'exact': true,
    },
    {
        "name": "course",
        "title": "Course",
        "path": "/course",
        'exact': false,
    },
    {
        "name": "teacher",
        "title": "Teacher",
        "path": "/teacher",
        'exact': false,
    },
    {
        "name": "report",
        "title": "Report",
        "path": "/report",
        'exact': false,
    }
];

const StudentMenu = [
    {
        "name": "dashboard",
        "title": "Dashboard",
        "path": "/student",
        'exact': true,
    },
    {
        "name": "note",
        "title": "Note",
        "path": "/note",
        'exact': false,
    },
    {
        "name": "highlight",
        "title": "Highlight",
        "path": "/highlight",
        'exact': false,
    },
    {
        "name": "ask",
        "title": "Ask",
        "path": "/ask",
        'exact': false,
    },
];

const TeacherMenu = [
    {
        "name": "ask",
        "title": "Ask",
        "path": "/tutor",
        'exact': true,
    },
];

export {
    AdminMenu,
    StudentMenu,
    TeacherMenu,
}