## Ссылка на gh-pages.
# https://zhoriks.github.io/weather-app/

### Cервис показывающий погоду по запросу пользователя. Также дающий подсказку по выбору одежды. Сервис является тестовым заданием для поступления в "Школу Будующих СТО Яндекс.Облака". На уровень сложности "Задача со звездочкой".

>`Сервис получает от пользователя данные о том, где живет: страна, регион, город. Данные о местонахождении пользователь должен указывать самостоятельно в поле ввода.`
>`Формирует запрос на API .`
>`Из полученных с API данных формирует ответ.`
>`Отображает информацию пользователю.`
>`Чтобы сервис прогноза погоды считался по настоящему умным, он также выводит "что рекомендуется пользователю надеть  с учетом прогноза погоды на день".`

# Проектирование сервиса:
### Стек технологий.
>`html, css, JavaScript, React.js`
### Пользовательский интерфейс.
>`Сайт`
### Формат ответа.
>`Данные о городе, температуре, владжности и скорости ветра, полученные с API подставляются в таблицу "Погода в городе: ___ , За окном: ___ , Температура: ___ , Влажность: ___ , Cкорость ветра: ___ , рекомендация по выбору одежды" и выводятся пользователю на экран.`
### Демонстрация работы сервиса.
>`https://www.youtube.com/watch?v=13_VHsm42VE`

# Процесс работы приложения.
Сервис - SPA, который по заданному городу(стране, округу, области) пользователем, высылает ему ответ.

Данные приходят от пользователя через текстовое поле
 → формируется и отправляется запрос в базу данных
 → полученный ответ из базы используется для формирования ответа пользователю
 → ответ отображается на экране
 
# Процесс запуска 
Для запуска потребуется менеджер пакетов NPM. Скачать его можно с официального сайта https://nodejs.org/en/download/
### Клонируем git-репозиторий
>`git clone https://github.com/zhoriks/weather-app.git`

### Устанавливаем NPM зависимости 
>`npm install`

### Запускаем сборку приложения
>`npm run build`

### Выводим настройки приложения
>`npm run eject`

### Деплоим проект на gh-pages
>`npm run deploy`