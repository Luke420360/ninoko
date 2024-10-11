import { Role } from '../models/roles';
import { User } from '../models/users';

export async function initializeDefaultData() {
    try {
        let adminRole = await Role.findOne({ name: 'Administrator' });
        logging.log('Checking for Administrator initialization...');
        if (!adminRole) {
            adminRole = new Role({
                name: 'Administrator',
                description: 'Admin role with all permissions'
            });
            await adminRole.save();
            logging.info('Admin role created.');
        } else {
            logging.info('Skipping Initialization');
        }

        const adminUser = await User.findOne({ username: 'admin' });
        logging.log('Checking for Admin initialization...');
        if (!adminUser) {
            const newAdminUser = new User({
                email: 'admin@ninoko.de',
                username: 'admin',
                password: 'admin',
                role_id: adminRole._id
            });
            await newAdminUser.save();
            logging.info('Admin user created.');
        } else {
            logging.info('Skipping Initialization');
        }
    } catch (error) {
        logging.error('Error initializing default data');
        logging.error(error);
    }
}
