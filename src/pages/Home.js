import Messages from "../components/Messages";
import {messages} from "../utils/mockData";

const Home = {
    render: () => {
        const current = localStorage.getItem('id') || '1';
        const currentItem = messages.find(item => item.id === current) || {};
        return `<section class="chat">
                    <nav class="chat__navigation">
                        <div class="chat__profile">
                            <a href="/settings" class="link chat__link">
                                <span>Профиль</span>
                                <span class="chat__button"></span>
                            </a>
                        </div>
                        <input class="search" type="text" placeholder="Поиск"/>
                        ${Messages.render({messages})}
                    </nav>
                    <div class="preview">
                        <div class="preview__header">
                            <div class="user">
                                <img class="user__avatar" src=${currentItem.avatar}/>
                                <span class="user__name">${currentItem.name}</span>
                            </div>
                            <button class="button menu">
                                <div class="dot"></div>
                                <div class="dot"></div>
                                <div class="dot"></div>
                            </button>                        
                        </div>
                        <div class="preview__main">
                        main
                        </div>
                        <form class="preview__footer">
                            <button class="button preview__add"></button>
                            <input class="preview__input" placeholder="Сообщение"/>
                            <button class="button preview__enter" type="submit"></button>
                        </form>
                    </div>
                </section>`
    }
}
export default Home;