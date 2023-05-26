import AuthApi from '../api/AuthApi';
import {router} from '../router';
import store from '../utils/Store';

const authApi = new AuthApi();

class AuthController {
    public signup(data: SignupType) {
        authApi.signup(data).then(res => {
            console.log('save to store', res);
            if (!res.reason) {
                authApi.getUser().then(res => {
                    console.log('save to store', res);
                    store.set('user', res);
                    router.go('/messenger');
                });
            }

        });
    }

    public signin(data: SignupType) {
        authApi.signin(data)
            .then(res => {
                console.log('result', res);
                if (!res.reason || res.reason === 'User already in system') {
                    console.log('inside if');
                    authApi.getUser().then(res => {
                        console.log('save to store', res);
                        store.set('user', res);
                        router.go('/messenger');
                    });
                }
            })
            .catch(error => console.log(error));
    }

    public logout() {
        authApi.logout()
            .then(res => {
                console.log('save to store!!!', res);
                store.set('user', {});
                router.go('/');
            })
            .catch(error => console.log(error));
    }
}

export default AuthController;
