import Block from '../../utils/Block';
import './Status.css';

class Status extends Block {
    constructor(props) {
        super('div', props);
    }

    render() {
        const template = '<div class="status"></div>';
        return this.compile(template);
    }

}

export default Status;