'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});

//Определение класса продукт, который создается при щелчке на кнопку "в корзину"
class ProductToBuy {
    constructor(name, id, price, count) {
        this.name = name;
        this.id = id;
        this.price = price;
        this.count = count;
    }

    cost() {
        return this.count * this.price;
    }

    createHTML() {
        return `<td>${this.name}</td>
                <td>${this.count}</td>
                <td>$${this.price}</td>
                <td>$${this.price * this.count}</td>`;
    }
}

/*Создаем объект "корзина", в него будем складывать выбранные товары*/
const buy_bin = {
    products: [],

    //Метод ищет в корзине продукт с таким же id, если находит - увеличивает количество, если нет - добавляет продукт.
    addToBin(obj) {
        const id = obj.id;
        let index;
        for (const item of buy_bin.products) {
            if (item.id === id) {
                index = buy_bin.products.indexOf(item);
            }
        }
        if (index === 0 || index) {
            buy_bin.products[index].count += obj.count;
        } else {
            buy_bin.products.push(obj);
        }
    },

    //Конструктор HTML для корзины
    createHTML() {
        let cost = 0;
        const tableFooter = document.createElement('tr');
        const tableHeader = document.createElement('tr');
        tableHeader.innerHTML = `<th>Название</th>
                                 <th>Количество</th>
                                 <th>Цена</th>
                                 <th>Итого</th>`;
        let resultHtml = document.createElement('table');
        resultHtml.append(tableHeader);
        for (let item of this.products) {
            const element = document.createElement('tr');
            element.innerHTML = item.createHTML();
            resultHtml.append(element);
            cost += item.cost();
        }
        if (this.products.length) {
            tableFooter.innerHTML = `<td><b>Итого:</b></td><td></td><td></td><td><b>$${cost}</b></td>`;
        } else {
            tableFooter.innerHTML = `<span>Коризна пуста</span>`;
        }
        resultHtml.append(tableFooter);
        return resultHtml;
    }
}

/*Сбор элементов*/
let buyButton = document.querySelector('.featuredItems');
let countIcon = document.querySelector('.buy_count');
let binView = document.querySelector('.cartIconWrap');
let bin = document.querySelector('.bought');
let visibleBin = document.querySelector('.buy_bin');
countIcon.style.visibility = 'hidden';

/*Формирование корзины при щелчке по значку*/
binView.addEventListener('click', () => {
    if (visibleBin.style.display === 'flex') {
        visibleBin.style.display = 'none';
    } else {
        visibleBin.style.display = 'flex';
        bin.innerHTML = "";
        bin.append(buy_bin.createHTML());
        const total = bin.querySelector('.tr:last-child');
        if (total) {
            total.classList.add('total_bought');
        }
    }
});

/*Долго не мог решить, как сделать чтение данных о товаре из HTML, боюсь ничего лучше не придумал. Был еще вариант с
* querySelectorAll и forEach, но наверное так лучше*/
buyButton.addEventListener('click', function(event) {
    if (event.target.classList.contains('buy_button') || event.target.parentElement.classList.contains('buy_button')) {
        const parent = event.target.parentElement.parentElement.parentElement;
        const name = parent.querySelector('.featuredName').innerText;
        const id = parent.id;
        const price = parent.querySelector('.featuredPrice').innerText;
        const product = new ProductToBuy(name, +id, Number.parseFloat(price.slice(1)), 1);
        buy_bin.addToBin(product);
        countIcon.innerHTML = (+countIcon.innerHTML + 1).toString();
        countIcon.style.visibility = 'visible';
    }
});

/*Корзина пропадает если щелкнуть мимо (так как она выпадающая вкладка)*/
document.addEventListener('click', (event) => {
    if (!event.target.classList.contains('cartIcon')) {
        visibleBin.style.display = 'none';
    }
});