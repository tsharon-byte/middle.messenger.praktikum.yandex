# Спринт 1. Веб-приложение "Чат"

Задание включат верстку следующих страниц:

1. Авторизация
2. Регистрация
3. Страница со списком чатов
4. Страница профиля
5. Страница 404
6. Страница 5хх ошибок

Возможности чатов:

- создание чата;
- изменение аватара чата;
- удаление чата;
- добавление и удаление пользователей из чата;
- поиск по всем чатам;
- отправка сообщений.

Работа с формами:

- все поля должны содержать валидацию и отображение ошибок как ввода, так и результата отправки формы.

## Команды для запуска

`npm i` - установка зависимостей  
`npm run serve` - запуск приложения в режиме разработки  
`npm run build` - запустить сборку статики  
`npm run start` - запустить express-сервер для раздачи статики

[Макеты с примером дизайна от Яндекс.Практикума](https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1)

## Бейджи

[![Тесты для проекта Чат](https://github.com/tsharon-byte/middle.messenger.praktikum.yandex/actions/workflows/tests.yml/badge.svg)](https://github.com/tsharon-byte/middle.messenger.praktikum.yandex/actions/workflows/tests.yml)

## Описание работы

### Этап 1: Подготовка

Шаг 0.

- клонирую репозиторий, перехожу на веточку sprint_1, добавляю .gitignore

Шаг 1: Подключить Parcel.

- Инициализирую npm командой `npm init -y`
- Прописываю `registry=https://npm.prakticum-team.ru/` в файл .npmrc
- Устанавливаю Parcel командой `npm install parcel --save-dev`
- Добавляю index.html и модуль на JavaScript
- Добавляю скрипт в package.json для сборки проекта с помощью parcel `"build": "parcel build index.html"`

Шаг2: Настроить dev-окружение и NodeJS + Express для раздачи статических файлов на локальном компьютере.

- Устанавливаю express: `npm install express --save-dev`
- Создаю файл server.js в котором прописываю запуск сервера на порту 3000 и раздачу статических файлов
- Добавляю скрипт в package.json для запуска express-сервера `"start": "node src/server.js"`

### Этап 2: Роутинг

Делаю маршрутизацию с помощью Vanilla JavaScript
[How to Create a SPA Router with JavaScript](https://blog.bitsrc.io/creating-a-spa-router-using-vanilla-js-95caf348ee4)

Экраны и пути:

- Авторизация `/signin`
- Регистрация `/signup`
- Список чатов и лента переписки `/`
- Настройки пользователя `/settings`
- Страница 404 `/not-found`
- Страница 5** `/error`

### Этап 3: Верстка основных страниц

### Этап 4: Настраиваю Netlify

[Ссылка на задеплоенное приложение](https://jocular-kringle-df365b.netlify.app/)

### Этап 5: Внедряю Typescript

Typescript доступен в Parcel 'из коробки', поэтому специально ничего подключать не нужно.

- добавляю tsconfig.json конфигурацию
- меняю расширение файлов с *.js на *.ts
- добавляю типизацию в код

### Этап 6: Настраиваю статический анализ кода с помощью eslint

Устанавливаю и конфигурирую eslint с помощью команды `npm install --save-dev eslint `
`npm install --save-dev eslint-config-airbnb `

### Этап 7: Создаю основные компоненты приложения

Использую в качестве базового класса для компонентов класс Block а также шаблон проектирования Event Bus

### Этап 8: Добавляю класс Router для маршрутизации в проекте

Неавторизованный пользователь перенаправляется на страницу логина.

### Этап 9: Налаживаю взаимодействие с бэкендом приложения

Доступное API описано тут: [Swagger](https://ya-praktikum.tech/api/v2/swagger/)

### Этап 10: Подключаю WebSocket для работы с real-time сообщениями.

### Этап 11: Добавляю тесты для роутера, компонента, модуля отправки запросов.

- Устанавливаю зависимости для разработки
  `npm i -D mocha @types/mocha chai @types/chai @babel/register @babel/preset-typescript @babel/preset-env`
- Добавляю конфигурационный файл `.mocharc.json`
- Добавляю скрипт для запуска тестов: `npm run test`


### Этап 12: Настраиваю Webpack 

### Этап 13: Добавляю precommit
 - Устанавливаю Husky: `npm install husky --save-dev`
 - Устанавливаю Git хуки `npx husky install`
 - `npm set-script prepare "husky install"`
 - Устанавливаю скрипт для одновременного запуска нескольких команд `npm i npm-run-all`
 - `npx husky add .husky/pre-commit "npm test"`
