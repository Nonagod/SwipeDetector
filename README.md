# SwipeDetector
Пакет предназначен для определения свайп движений в браузере.

## Пример[ы]
Пример[ы] использования расположен[ы] в папке [build](/build). Для его/их запуска нужно:
1. клонировать проект (`git clone`)
2. установить зависимости (`npm i`)
3. собрать проет (`gulp`)
4. открыть в браузере интересующий вас файл 

## Как подключать
> Используется только для браузеров.
### С системой сборки
1. Добавить пакет к проекту (`npm i @nonagod/swipe_detector`)
1. Подключить пакет в нужный файл (`require("@nonagod/swipe_detector")`)

### Без системы сборки
1. Скопировать проект (`git clone`)
1. Собрать проект (`gulp`)
1. В файле `/build/libs.min.js` будет лежать код пакета

## Как использовать
```
let SwipeDetectorObject = new NGSwipeDetector( options );
```
### Параметры
При создании объекта класса, конструктор принимает один параметр - объект опций, следующего содержания:
- `element` - `object | required` - Dom Element Object для которого необходимо инициализировать функционал
- `swipe_handler` - `function | optional` - Функция-обработчик свайпа, принимает один параметр `direction`, который может принимать строковое значения:
    - `up` - пользователь смахнул вверх (снизу вверх) (соответствует константе класса `NGSwipeDetector.DIRECTIONS.UP`)
    - `down` - пользователь смахнул вниз (сверху вниз) (соответствует константе класса `NGSwipeDetector.DIRECTIONS.DOWN`)
    - `left` - пользователь смахнул налево (справа налево) (соответствует константе класса `NGSwipeDetector.DIRECTIONS.LEFT`)
    - `right` - пользователь смахнул направо (слева направо) (соответствует константе класса `NGSwipeDetector.DIRECTIONS.RIGHT`)
    > **default:** ``` ( direction ) => { console.log(direction); }```
- `minimal_swipe_delta` - `int | optional` - минимальное расстояние (в `px`) между началом и концом свайпа, при котором сработает `swipe_handler`
    >**default:** 10
  
### Методы
- `lock()` - блокирует `swipe_handler` и освобождает скролл на `element`
- `unlock()` - освобождает `swipe_handler` и блокирует скролл на `element`
- `destroy()` - уничтожает всех (которые были установлены при создании объекта) слушателей на элементе

## Зависимости
Для использования класса возможно потребуются подключить полифилы.

___
_Please, read about source code [there](_resources/readme_sources/original_copyright.md)._
