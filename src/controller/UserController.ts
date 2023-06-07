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
            router.go('/settings');
        });
    }

    public changeUserProfile(data: UserDataType) {
        return userApi.changeUserProfile(data).then(res => {
            store.set('user', res);
            router.go('/settings');
        });
    }

    public searchForUserByLogin(login: string) {
        return userApi.searchForUserByLogin(login);
    }
}

export default new UserController();
