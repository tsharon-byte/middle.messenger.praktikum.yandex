import UserApi from '../api/UserApi';
import {router} from '../router';
import store from '../utils/Store';
import {handleError} from '../utils/handleError';
import {CHANGE_AVATAR_MODAL_NAME} from '../config/constant';

const userApi = new UserApi();

class UserController {

    public changeUserPassword(data: ChangePasswordDataType) {
        return userApi.changeUserPassword({
            oldPassword: data.old_password,
            newPassword: data.new_password
        }).then(res => {
            router.go('/settings');
        }).catch(handleError);
    }

    public changeUserProfile(data: UserDataType) {
        return userApi.changeUserProfile(data).then(user => {
            store.set('user', user);
            router.go('/settings');
        }).catch(handleError);
    }

    public searchForUserByLogin(login: string) {
        return userApi.searchForUserByLogin(login).then(res => res).catch(handleError);
    }

    public updateAvatar(data: FormData) {
        return userApi.updateAvatar(data)
            .then((res) => {
                console.log('Аватар обновлён', 'success');
                const user = res;
                store.set('user', user);
                return user;
            })
            .catch(handleError)
            .finally(() =>
                store.set(CHANGE_AVATAR_MODAL_NAME, false));
    }
}

export default new UserController();
