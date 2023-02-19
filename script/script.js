/*
Необходимо реализовать приложение, которое загружает карточки с API по ссылке https://fakestoreapi.com/products 
и отображает в виде карточек с продуктами.  
В каждой карточке должна быть кнопка удалить. При нажатии на нее карточка должна удаляться. 
Обратите внимание, что хранение данных вы должны реализовать через массив. 
При удалении товар должен удаляться из карточки и потом должен происходить процесс перерисовки интерфейса 
(на подобии функции render ).
*/

const container = document.querySelector('.container')
const button = document.querySelector('.btn')
let products = [];


fetch(`https://fakestoreapi.com/products`)
    .then(resp => resp.json())
    .then(data => console.log(data));


function createProdCard(id, title, price, description, category, image, rating) {
    const product = document.createElement('div')
    const title_p = document.createElement('h5')
    const category_p = document.createElement('p')
    const info_p = document.createElement('p')
    const btn = document.createElement('button')
    const price_p = document.createElement('p')
    const rating_div = document.createElement('div')
    const rate_p = document.createElement('p')
    const count = document.createElement('p')

    rating_div.append(rate_p, count)
    product.append(title_p, category_p, info_p, btn, img, price_p, rating_div)
    container.append(product)

    product.classList.add('product')
    title_p.classList.add('title')
    category_p.classList.add('category')
    info_p.classList.add('info')
    img.classList.add('img')
    price_p.classList.add('price')
    rating_div.classList.add('rating')
    rate_p.classList.add('score')
    count.classList.add('count')

    title_p.innerText = title
    category_p.innerText = `category: ${category}`
    info_p.innerHTML = `<span> Description: </span> <br> ${description}`
    img.src = image
    price_p.innerText = `${price} $ `
    rate_p.innerHTML = `<i class="las la-star"></i> ${rating.rate}`
    count.innerText = `in stock: ${rating.count}`
    btn.innerHTML = '<i class="las la-times"></i>'

    btn.addEventListener('click', () => {
        delCard(id)
    })
}

function rerender() {
    container.innerText = ''
    products.map(({ id, title, price, description, category, image, rating }) =>
        createProdCard(id, title, price, description, category, image, rating))
}
function delCard(id) {
    products = products.filter((product) => product.id !== id)
    rerender()
}