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
    {
        "name": "faq",
        "title": "FAQ",
        "path": "/faq",
        'exact': false,
    },
];

const TeacherMenu = [
    {
        "name": "dashboard",
        "title": "Dashboard",
        "path": "/tutor",
        'exact': true,
    },
    {
        "name": "ask",
        "title": "Ask",
        "path": "/tutor/ask",
        'exact': true,
    },
    {
        "name": "faq",
        "title": "FAQ",
        "path": "/tutor/faq",
        'exact': false,
    },
];

export {
    AdminMenu,
    StudentMenu,
    TeacherMenu,
}