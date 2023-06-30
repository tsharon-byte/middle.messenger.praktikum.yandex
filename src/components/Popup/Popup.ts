import Block from '../../utils/Block/Block';
import store, {UPDATED} from '../../utils/Store';
import Button from '../Button/Button';

class Popup extends Block {
    constructor({children, name}: PopupType) {
        super('div', {
            attrs: {
                'id': name
            },
            button: new Button({
                className: 'image-button popup__close-icon',
                events: {
                    'click': () => {
                        store.set(name, false);
                    }
                }
            }),
            children
        });
        store.on(UPDATED, () => {
            this.setProps({
                [name]: store.getState()[name],
                name
            });
        });
    }

    render() {
        const isOpen = this.props[this.props.name];
        const template = `
<div class="popup ${isOpen ? 'popup_opened' : ''}">
    <div class="popup__container">
         <div id="children"></div>
         <button id="button"></button>
    </div>
</div>`;
        return this.compile(template);
    }

}

export default Popup;
