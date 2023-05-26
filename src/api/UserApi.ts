import BaseApi, {getOptions} from './BaseApi';

class UserApi extends BaseApi {
    constructor() {
        super({path: '/user'});
    }

    public changeUserProfile(data: UserDataType) {
        return this.put('/profile', getOptions(data));
    }

    //TODO: to add binary avatar file here
    public changeUserAvatar() {
        return this.put('/profile/avatar', getOptions());
    }

    public changeUserPassword(data: PasswordRequestType) {
        return this.put('/password', getOptions(data));
    }

    public getUserById(userId: number) {
        return this.get(`/${userId}`, getOptions());
    }

    public searchForUserByLogin(login: string) {
        return this.post('/search', getOptions({login}));
    }
}

export default UserApi;
