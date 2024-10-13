interface PermissionSet {
    create: string;

    read: string;

    update: string;

    delete: string;
}

const permissions: { [key: string]: PermissionSet } = {
    departments: { create: 'createDepartments', read: 'readDepartments', update: 'updateDepartments', delete: 'deleteDepartments' },

    users: { create: 'createUsers', read: 'readUsers', update: 'updateUsers', delete: 'deleteUsers' },

    roles: { create: 'createRoles', read: 'readRoles', update: 'updateRoles', delete: 'deleteRoles' },

    employees: { create: 'createEmployees', read: 'readEmployees', update: 'updateEmployees', delete: 'deleteEmployees' },

    addresses: { create: 'createAddresses', read: 'readAddresses', update: 'updateAddresses', delete: 'deleteAddresses' },

    attendance: { create: 'createAttendance', read: 'readAttendance', update: 'updateAttendance', delete: 'deleteAttendance' }
};

export default permissions;
