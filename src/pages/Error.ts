const Error = {
	render: ({error = '404', description = 'Не туда попали'}) => `<section class="error">
                    <h1 class="error__header">${error}</h1>
                    <p class="error__description">${description}</p>
                    <a href="/" class="link error__link">Назад к чатам</a>
                </section>`,
};

export default Error;
