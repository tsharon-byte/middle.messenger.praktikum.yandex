import BaseAPI from './BaseApi';

class AuthApi extends BaseAPI {
    constructor() {
        super({path: '/auth'});
    }

    public signup(data: SignupType) {
        return this.post('/signup', {
            withCredentials: true,
            data: JSON.stringify(data),
        });
    }

    public signin(data: SigninType) {
        return this.post('/signin', {
            withCredentials: true,
            data: JSON.stringify(data),
        });
    }

    public getUser() {
        return this.get('/user', {
            withCredentials: true,
        });
    }

    public logout() {
        return this.post('/logout', {
            withCredentials: true,
        });
    }
}

export default AuthApi;
