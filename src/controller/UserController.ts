import UserApi from '../api/UserApi';
import {router} from '../router';
import store from '../utils/Store';

const userApi = new UserApi();

class UserController {

    public changeUserPassword(data: ChangePasswordDataType) {
        return userApi.changeUserPassword({
            oldPassword: data.old_password,
            newPassword: data.new_password
        }).then(res => {
            console.log('result', res);
            router.go('/settings');
        });
    }

    public changeUserProfile(data: UserDataType) {
        return userApi.changeUserProfile(data).then(res => {
            console.log('save to store', res);
            store.set('user', res);
            router.go('/settings');
        });
    }
}

export default UserController;
