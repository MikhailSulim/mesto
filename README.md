# Проектная работа: "Место". Создана в рамках учёбы в [Яндекс.Практикум](https://practicum.yandex.ru) на факультете ["Веб-разработчик"](https://practicum.yandex.ru/web/). Спринты 4 — 8.

## Описание:

"Место" — типовой сайт о различных туристических местах и достопримечательностях в России и не только. Проектная работа была выполнена на основе макета в Figma с использованием расширенных возможностей HTML и CSS, в том числе с применением адаптивной вёрстки посредством Flexbox, Grid Layout и Media queries.

С помощью скриптов, написанных на JavaScript, реализовано:
- наполнение страницы контентом;
- возможность редактирования профиля;
- возможность ставить и удалять лайки под выбранными фотографиями;
- возможность добавлять и удалять карточки с фотографиями;
- валидация корректности вводимых пользователем данных в полях редактирования профиля и добавления карточки;
- возможность закрытия модальных окон нажатием кнопки Esc или кликом вне данного модального окна.

Скрипты написаны с использованием ООП. Функционалы добавления новой карточки и валидации на формах добавления новой карточки и редактирования профиля реализованы через соответствующие классы и их методы.

[Проектная работа на GitHub Pages](https://mikhailsulim.github.io/mesto/index.html)

## Функционал:

- Адаптивный дизайн
- Трансформация элементов страницы средствами CSS
- Добавление контента на страницу через JS
- Интерактивная форма для редактирования профиля
- Интерактивная форма для добавления новой карточки с фото
- Возможность ставить и удалять лайки выбранным карточкам
- Возможность удалять карточки
- Валидация вводимых пользователем данных в полях форм редактирования профиля и добавления новой карточки

## Изображения:

Автор изображений в карточках - Михаил Сулим.
[Профиль Сулим Михаила на Flickr](https://flickr.com/photos/mikhailsoulim/albums)

## Технологии:

- Flexbox
- Grid Layout
- БЭМ
- Файловая структура по методологии БЭМ (Nested BEM)
- Git
- GitHub Pages
- Figma
- JavaScript
- JS-свойство ValidityState
- ООП
- Webpack
- npm

## Этапы создания проектной работы:
### Спринт 4
Свёрстан одностраничный сайт с блоками фотографий с описанием.
Создано модальное окно редактирования профиля пользователя.

### Спринт 5
- первоначальное наполнение страницы контентом вынесено в отдельный скрипт;
- добавлена возможность удалять карточку с фото;
- добавлена возможность добавлять новую карточку с фото через модальное окно;
- добавлена возможность просмотра выбранного фото в увеличенном размере;
- добавлена возможность поставить/убрать лайк выбранному фото;

### Спринт 6
- добавлена функция валидации введённых значений в полях модальных окон;

### Спринт 7
- добавлен класс Card, в который вынесено создание и наполнение карточки с фото;
- добавлен класс FormValidator, в который вынесено проверка на валидность заполнения форм в модальных окнах;

### Спринт 8
- все константы вынесены в файл constants.js
- внесение элементов в разметку выделено в отдельный класс Section;
- добавлен класс UserInfo, в который переесено управление данными пользователя;
- добавлен класс Popup и его наследники PopupWithForm и PopupWithImage, в которые перенесено создание и управление всеми модальными окнами;
- настроен сборщик проекта Webpack: все скрипты и стили объединены в один файл и подключаются в html сборщиком.


## Клонировать репозиторий:

git clone https://github.com/MikhailSulim/mesto.git

## Собрать проект:

npm run build

## Будущая доработка проекта будет включать в себя:

- Дальнейший рефакторинг кода
- Подключение бэкенда и сохранение данных о карточках на сервере
- Возможность изменения фото на аватаре

## Ссылки на макеты:

- [Ссылка на макет в Figma. Спринт 4.](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)
- [Ссылка на макет в Figma. Спринт 5.](https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0%3A1)
- [Ссылка на макет в Figma. Спринт 6.](https://www.figma.com/file/kRVLKwYG3d1HGLvh7JFWRT/JavaScript.-Sprint-6?node-id=0%3A1)


## Ссылки на чеклисты:

- [Чеклист проектной работы. Спринт 4.](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist-4.pdf)
- [Чеклист проектной работы. Спринт 5.](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist-5.pdf)
- [Чеклист проектной работы. Спринт 6.](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist-6.pdf)
- [Чеклист проектной работы. Спринт 7.](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist-7.pdf)
- [Чеклист проектной работы. Спринт 8.](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist-8.pdf)
