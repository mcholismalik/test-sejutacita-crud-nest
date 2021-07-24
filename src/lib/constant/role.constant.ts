export enum RoleEnum {
  ADMIN = 'admin',
  MEMBER = 'member'
}

export const RolePermission = {
  admin: [
    {
      module: 'user',
      path: '/user',
      method: 'GET'
    },
    {
      module: 'user',
      path: '/user/:id',
      method: 'GET'
    },
    {
      module: 'user',
      path: '/user',
      method: 'POST'
    },
    {
      module: 'user',
      path: '/user/:id',
      method: 'PUT'
    },
    {
      module: 'user',
      path: '/user/:id',
      method: 'DELETE'
    },
  ],
  member: [
    {
      module: 'user',
      path: '/user',
      method: 'GET'
    },
    {
      module: 'user',
      path: '/user/:id',
      method: 'GET'
    }
  ]
}