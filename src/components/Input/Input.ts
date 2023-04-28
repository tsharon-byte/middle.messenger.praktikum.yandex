import Block from '../../utils/Block';
import './Input.css';

class Input extends Block {
    constructor(props: InputProps) {
        super('div', {
            ...props,
            attrs: {'class': 'input-container'}
        }
        );
    }

    render() {
        const {className, placeholder, name, minlength, maxlength, id = name, type = 'text', pattern} = this.props;
        const template = `
                         <input class="${className}" 
                         placeholder="${placeholder}" 
                         name="${name}" 
                         minlength="${minlength}" 
                         type="${type}" 
                         maxlength="${maxlength}" 
                         id="${id}" 
                         pattern="${pattern}" 
                         required/>
                         <span class="input__error" id="${name + '-error'}"></span>
                        `;
        return this.compile(template);
    }
}

export default Input;
