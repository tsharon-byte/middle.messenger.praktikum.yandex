import UserApi from '../api/UserApi';

const userApi = new UserApi();

class UserController {

    public changeUserPassword(data: ChangePasswordDataType) {
        return userApi.changeUserPassword({oldPassword:data.old_password, newPassword:data.new_password}).then(res => console.log('save to store', res));
    }
    public changeUserProfile(data: UserDataType) {
        return userApi.changeUserProfile(data).then(res => console.log('save to store', res));
    }
}

export default UserController;
