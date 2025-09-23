export const API = {
    categories:{
        get: '/categories',
        create: '/categories',
        update: '/categories/:id',
        delete: '/categories/:id',
    },
    tags:{
        get: '/tags',
        create: '/tags',
        update: '/tags/:id',
        delete: '/tags/:id',
    },
    transactions:{
        get: '/transactions',
        create: '/transactions',
        update: '/transactions/:id',
        delete: '/transactions/:id',
    },
    groups:{
        get: '/groups',
        create: '/groups',
        update: '/groups/:id',
        delete: '/groups/:id',
    },
    users:{
        get: '/users',
        create: '/users',
        update: '/users/:id',
        delete: '/users/:id',
    },
    invitations:{
        get: '/invitations',
        create: '/invitations',
        update: '/invitations/:id',
        delete: '/invitations/:id',
    }
}