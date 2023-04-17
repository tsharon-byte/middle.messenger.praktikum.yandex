const Register = {
	render: () => `<section>
                    <div class="login register">
                            <h1 class="login__header">Регистрация</h1>
                            <form class="form">
                                <div class="form__content">
                                    <div class="form__input-group">
                                         <label class="label" for="email">Почта</label>
                                         <input class="input" placeholder="Почта" name="email" id="email" type="text"/>
                                    </div>
                                    <div class="form__input-group">
                                        <label class="label" for="login">Логин</label>
                                        <input class="input" placeholder="Логин" name="login" id="login" type="text"/>
                                    </div>
                                    <div class="form__input-group">
                                        <label class="label" for="first_name">Имя</label>
                                        <input class="input" placeholder="Имя" name="first_name" id="first_name" type="text"/>
                                    </div>
                                    <div class="form__input-group">
                                        <label class="label" for="second_name">Фамилия</label>
                                        <input class="input" placeholder="Фамилия" name="second_name" id="second_name" type="text"/>
                                    </div>
                                    <div class="form__input-group">
                                        <label class="label" for="phone">Телефон</label>
                                        <input class="input" placeholder="Телефон" name="phone" id="phone" type="text"/>
                                    </div>
                                    <div class="form__input-group">
                                        <label class="label" for="password">Пароль</label>
                                        <input class="input" placeholder="Пароль" name="password" id="password" type="password"/>
                                    </div>
                                    <div class="form__input-group">
                                        <label class="label" for="password2">Пароль ещё раз</label>
                                        <input class="input" placeholder="Пароль ещё раз" name="password2" id="password2" type="password"/>
                                    </div>
                                </div>
                                <div class="form__footer">
                                    <button type="submit" class="button form__button">Зарегистрироваться</button>
                                    <a class="link form__link" href="/signin" onclick="router(event)">Войти</a>
                                </div>
                            </form>
                    </div>
               </section>`,
};
export default Register;
