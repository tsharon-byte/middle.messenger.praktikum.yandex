const Login = {
	render: () => `<section>
                    <div class="login">
                            <h1 class="login__header">Вход</h1>
                            <form class="form">
                                <div class="form__content">
                                    <div class="form__input-group">
                                         <label class="label" for="login">Логин</label>
                                         <input class="input" placeholder="Логин" name="login" id="login" type="text"/>
                                    </div>
                                    <div class="form__input-group">
                                        <label class="label" for="password">Пароль</label>
                                        <input class="input" placeholder="Пароль" name="password" id="password" type="text"/>
                                    </div>
                                </div>
                                <div class="form__footer">
                                    <button type="submit" class="button form__button">Войти</button>
                                    <a class="link form__link" href="/signup" onclick="router(event)">Нет аккаунта?</a>
                                </div>
                            </form>
                    </div>
                </section>`,
};
export default Login;
