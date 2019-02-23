/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задавать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    let div = document.createElement('div');

    div.classList.add('draggable-div');

    let randomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';

        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    };

    let randomNumber = (min = 0, max = 100) => {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    div.style.backgroundColor = randomColor();
    div.style.cursor = 'pointer';
    div.style.position = 'absolute';
    div.style.width = `${randomNumber()}px`;
    div.style.height = `${randomNumber()}px`;

    div.style.top = `${randomNumber(0, 600)}px`;
    div.style.left = `${randomNumber(0, 1000)}px`;

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {

    let shiftX;
    let shiftY;

    let getCoords = el => {
        let elPosition = el.getBoundingClientRect();

        return {
            top: elPosition.top + pageYOffset,
            left: elPosition.left + pageXOffset
        };
    };

    let moveAt = e => {
        target.style.left = e.pageX - shiftX + 'px';
        target.style.top = e.pageY - shiftY + 'px';
    };

    let mouseDown = e => {
        let coords = getCoords(target);

        target.addEventListener('mousedown', mouseDown);
        document.addEventListener('mousemove', mouseMove);
        shiftX = e.pageX - coords.left;
        shiftY = e.pageY - coords.top;
        moveAt(e);
        target.style.zIndex = '1000';
    };

    let mouseMove = e => {
        moveAt(e);
    };

    let mouseUp = () => {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    };

    target.addEventListener('mousedown', mouseDown);
    document.addEventListener('mousemove', mouseMove);
    target.addEventListener('mouseup', mouseUp);
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', () => {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
