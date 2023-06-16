import AuthApi from '../api/AuthApi';
import {router} from '../router';
import store from '../utils/Store';
import {handleError} from '../utils/handleError';

const authApi = new AuthApi();

class AuthController {
    public signup(data: SignupType) {
        authApi.signup(data).then(res => {
            if (!res.reason) {
                authApi.getUser().then(res => {
                    store.set('user', res);
                    router.go('/messenger');
                });
            }

        }).catch(handleError);
    }

    public signin(data: SignupType) {
        authApi.signin(data)
            .then(res => {
                if (!res.reason || res.reason === 'User already in system') {
                    authApi.getUser().then(res => {
                        store.set('user', res);
                        router.go('/messenger');
                    });
                }
            })
            .catch(handleError);
    }

    public checkAuth() {
        if (!store.getState().user || !store.getState().user.id) {
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
    }

    public logout() {
        authApi.logout()
            .then(() => {
                localStorage.clear();
                store.setToDefault();
                router.go('/');
            })
            .catch(handleError);
    }
}

export default new AuthController();
