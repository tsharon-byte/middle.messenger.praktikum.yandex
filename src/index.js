import './index.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import Error from "./pages/Error";

const routers = [
    {
        path: '/signin',
        component: Login
    },
    {
        path: '/signup',
        component: Register
    },
    {
        path: '/settings',
        component: Settings
    },
    {
        path: '/error',
        component: Error,
        props: {error: '500', description: 'Мы уже фиксим'}
    },
    {
        path: '/not-found',
        component: Error,
        props: {error: '404', description: 'Не туда попали'}
    }, {
        path: '/',
        component: Home,
    }];

function renderAll(url) {
    const content = document.querySelector('.content');
    const component = routers.find(item => item.path === url);
    let componentToRender;
    let props;
    if (undefined === component) {
        componentToRender = Error;
    } else {
        componentToRender = component.component
        props = component.props;
    }
    content.innerHTML = componentToRender.render(props);
    history.pushState({}, 'newUrl', undefined === component ? '/not-found' : url);
    navColorLink();
}

function router(event) {
    event.preventDefault();
    renderAll('/' + event.target.href.split('/').reverse()[0]);
}

window.addEventListener('DOMContentLoaded', function () {
    let path = location.pathname;
    renderAll(path);
});

function navColorLink() {
    const links = document.querySelectorAll('.link');
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('link_type_active');
        } else {
            link.classList.remove('link_type_active');
        }
    })
}