import './index.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Error from './pages/Error';
import Home from './pages/Home';
import Block from './utils/Block';

const routers: { path: string, component: Block }[] = [
    {
        path: '/signin',
        component: new Login({})
    },
    {
        path: '/signup',
        component: new Register({})
    },
    {
        path: '/settings',
        component: new Settings({})
    },
    {
        path: '/error',
        component: new Error({error: '500', description: 'Мы уже фиксим'}),
    },
    {
        path: '/not-found',
        component: new Error({error: '404', description: 'Не туда попали'}),
    }, {
        path: '/',
        component: new Home({}),
    }];

function renderAll(url: string): void {
    const content = document.querySelector('.content');
    const component = routers.find(item => item.path === url);
    let componentToRender;
    if (undefined === component) {
        componentToRender = new Error({});
    } else {
        componentToRender = component.component;
    }
    content.appendChild(componentToRender.getElement());
    history.pushState({}, 'newUrl', undefined === component ? '/not-found' : url);
    navColorLink();
}

function router(event): void {
    event.preventDefault();
    renderAll('/' + event.target.href.split('/').reverse()[0]);
}

window.addEventListener('DOMContentLoaded', function () {
    const path = location.pathname;
    renderAll(path);
});

function navColorLink(): void {
    const links:NodeListOf<HTMLLinkElement> | any[] = document.querySelectorAll('.link')||[];
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('link_type_active');
        } else {
            link.classList.remove('link_type_active');
        }
    });
}