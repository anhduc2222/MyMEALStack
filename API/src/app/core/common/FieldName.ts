/**
 * Created by vaduc on 7/25/2016.
 */
export const USER = {
    _id: '_id',
    id: 'id',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    fullName: 'fullName',
    phone: 'phone',
    title: 'title',
    avatar: 'avatar',
    modified: 'modified',
    modifiedBy: 'modifiedBy',
    created: 'created',
    createdBy: 'createdBy',
    status: 'status',
    lastLogin: 'lastLogin',
    roles: 'roles'
};

export const ROLE = {
    _id: '_id',
    user: 'user',
    name: 'name',
    resources: {
        _: 'resources',
        resource: 'resources.resource',
        resourceName: 'resources.resourceName',
        permissions: 'resources.permissions'
    },
    systemRole: 'systemRole',
    modified: 'modified',
    modifiedBy: 'modifiedBy',
    created: 'created',
    createdBy: 'createdBy'
};

export const TOKEN = {
    _id: '_id',
    secret: 'secret',
    token: 'token',
    user: 'user',
    created: 'created',
    hardExpiry: 'hardExpiry',
    softExpiry: 'softExpiry',
    lastAccess: 'lastAccess',
    features: 'features',
    access: {
        permissions : 'permissions'
    }
};