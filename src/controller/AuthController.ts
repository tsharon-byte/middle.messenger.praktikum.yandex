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
                    authApi.getUser().then(res => {
                        store.set('user', res);
                        router.go('/messenger');
                    });
                }
            })
            .catch(error => console.log(error));
    }

    public checkAuth() {
        authApi.getUser().then(res => {
            if (res.reason) {
                throw new Error('error');
            }
            store.set('user', res);
        }).catch(error => {
            console.log(error);
            router.go('/');
        });
    }

    public logout() {
        authApi.logout()
            .then(res => {
                console.log('save to store!!!', res);
                store.set('user', {});
                localStorage.removeItem('user');
                router.go('/');
            })
            .catch(error => console.log(error));
    }
}

export default AuthController;
