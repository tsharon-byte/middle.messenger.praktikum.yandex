import './index.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Error from './pages/Error';
import Home from './pages/Home';
import ChangePassword from './pages/ChangePassword';
import ChangeProfile from './pages/ChangeProfile';
import {router} from './router';
import AuthController from './controller/AuthController';

const authController = new AuthController();

// Можно обновиться на /user и получить сразу пользователя
router
    .setUnprotectedPaths(['/', '/sign-up'])
    .onRoute(authController.checkAuth)
    .use('/', Login)
    .use('/sign-up', Register)
    .use('/settings', Settings)
    .use('/change-profile', ChangeProfile)
    .use('/change-password', ChangePassword)
    .use('/messenger', Home)
    .use('/error', Error, {error: '500', description: 'Мы уже фиксим'})
    .default('/not-found', Error)
    .start();
