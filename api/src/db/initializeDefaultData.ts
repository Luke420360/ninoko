import { Permission } from '../models/permissions';
import { Role } from '../models/roles';
import permissions from '../common/permissions';

export async function initializeDefaultData() {
    try {
        // Check default Permissions
        let existingPermissions = await Permission.find();
        const resourceNames = Object.keys(permissions);
        logging.log('Checking for Permissions initialization...');
        const methods: string[] = [];
        for (const key in permissions) {
            if (permissions.hasOwnProperty(key)) {
                const permissionSet = permissions[key];
                methods.push(permissionSet.create, permissionSet.read, permissionSet.update, permissionSet.delete);
            }
        }
        logging.warning('Methods:', methods);
        if (methods.length !== existingPermissions.length) {
            logging.log('Permissions not found. Initializing...');

            for (const permissionName of methods) {
                const permission = new Permission({
                    name: permissionName,
                    description: permissions[permissionName]
                });
                await permission.save();
            }
            logging.info('Permissions initialized.');
        } else {
            logging.info('Skipping Permission Initialization');
        }

        let adminRole = await Role.findOne({ name: 'admin' });
        logging.log('Checking for Administrator initialization...');
        if (!adminRole) {
            adminRole = new Role({
                name: 'admin',
                description: 'Admin with all permissions',
                permissions: existingPermissions.map((permission) => permission._id)
            });
            await adminRole.save();
            logging.info('Admin role created.');
        } else {
            logging.info('Skipping Initialization');
        }
    } catch (error) {
        logging.error('Error initializing default data');
        logging.error(error);
    }
}
