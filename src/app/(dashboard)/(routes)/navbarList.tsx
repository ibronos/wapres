type navbarListType = {
        title: string,
        url: string,
        subnav: [] | {
               title: string,
               url: string
        } []
    } []
;

export const navbarList: navbarListType = [
    {
        "title": "Blog",
        "url": "#",
        "subnav": [
            {
                "title": "Posts",
                "url": "/admin/posts",
            },
            {
                "title": "Categories",
                "url": "/admin/postcat",
            }
        ]

    },
    {
        "title": "Users",
        "url": "/admin/user",
        "subnav": []
    }

];
