type navbarListType = {
        title: string,
        url: string,
        icon: string,
        subnav: [] | {
               title: string,
               url: string
        } []
    } []
;

export const navbarList: navbarListType = [
    {
        "title": "Blogs",
        "url": "#",
        "icon": "",
        "subnav": [
            {
                "title": "Blogs",
                "url": "/admin/blogs",
            },
            {
                "title": "Categories",
                "url": "/admin/blogs-cat",
            }
        ]

    },
    {
        "title": "Users",
        "url": "/admin/user",
        "icon": "",
        "subnav": []
    }

];
