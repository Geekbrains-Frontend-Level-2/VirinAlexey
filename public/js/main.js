// Класс всех объектов для вывода
class Renderer{
    constructor (root) {
        this._root = root
        this.prepareTemplate()
    }

    prepareTemplate () {
        this._template = document.createElement('div')        
    }

    getTemplate () {        
    }

    render (primaryRoot) {
        if (primaryRoot) {
            this._root = primaryRoot
        }
        this.getTemplate()    
        this._root.appendChild(this._template)
    }
}

// Класс карточек товаров
class Item extends Renderer {
    constructor (data = {}, root) {
        super(root)
    this._data = data
    }

// Добавляем товар в корзину
    addToCart() {
        console.log('clicked on:', this._data)
        Cart.CartList.push(this._data)   /*Вот здесь я проставил ссылку на объект корзины, а не класс*/
        console.log(Cart.CartList) /*Вот здесь я проставил ссылку на объект корзины, а не класс*/
        Cart.addAndRemove() /*Вот здесь я проставил ссылку на объект корзины, а не класс*/
    }

    getTemplate () {
        const {title, price} = this._data
        this._template.className = 'card'
        this._template.innerHTML = `
        <div class="item_img"><img src="" /></div>
        <div class="item_meta"><span>${title}</span></div>
        <div class="item_meta"><span>${price}</span></div>
        <button class="buy">Добавить в корину</button>
        `
        const button = this._template.querySelector('button') /*Ищем button в этом this._template и привязываем действие*/
        button.addEventListener('click', this.addToCart.bind(this)) 
    }
}

// Класс списка товаров
class ItemsList extends Renderer {
    constructor (root) {
        super(root)
        this.fetchData()
    }

    fetchData () {
        const items = [
            {title: 'Товар', price: 1200,},
            {title: 'Супер Товар', price: 2350,},
            {title: 'Мега Товар', price: 4500,},
            {title: 'Мега Пауэр Товар', price: 6800,},
            {title: 'Эль Товар', price: 1200,},
            {title: 'Товар Самовар', price: 2890,},
            {title: 'Мега Турбо Товар', price: 7500,},
            {title: 'Турбо Пауэр Товар', price: 9800,},
            {title: 'Не Товар', price: 1,},
            {title: 'Такой Себе Товар', price: 1650,},
            {title: 'Ну и Товар', price: 999,},
            {title: 'Царь Товар', price: 99999,},
        ]

        this._items = items.map (item => {
            return new Item(item)
        })        
    }
    getTemplate () {
        this._template.className = 'items-list'
        this._items.forEach(item => item.render(this._template))
    }
}

// Класс корзины
class CartListCreate extends Renderer {
    constructor (root) {
        super(root)
        this.addAndRemove()
    }

    // Создаем массив для хранения товаров в корзине
    CartList = new Array

    // Функция подсчета в корзине ИТОГО через reduce
    calcValue() {
        this.value = 0
        this.value = this.CartList.reduce(function(sum, current) {
            return sum + current.price
          }, 0)
        return this.value
    }

    // Функция добавления и удаления из корзины
    addAndRemove () { 
        this._items = this.CartList.map (item => {
            return new CartItem(item)
        }) 
        this.render()       
    }
    getTemplate () {
        this.calcValue()
        this._template.className = 'cart-list'
        this._template.innerHTML = `        
        <div class="cart_meta"><span>Корзина</span></div>
        <div class="value">ИТОГО: ${this.value}</div>
        `
        this._items.forEach(item => item.render(this._template))
    }
}

// Класс элемента корзины
class CartItem extends Renderer {
    constructor (data = {}, root) {
        super(root)
    this._data = data
    }

    // Удаляем из корзины
    removeFromCart() {
        console.log('clicked on:', this._data)
        for (let i = 0; i < Cart.CartList.length; i++) {
            if (this._data == Cart.CartList[i]) {   /*Вот здесь я проставил ссылку на объект корзины, а не класс*/
                Cart.CartList.splice(i, 1);   /*Вот здесь я проставил ссылку на объект корзины, а не класс*/
                break   
            }
        }

    // Не могу понять, почему не определяет здесь this._data
    //     Cart.CartList = Cart.CartList.filter(function(item) {
    //         return item !==  this._data
    // })
        console.log(Cart.CartList)  /*Вот здесь я проставил ссылку на объект корзины, а не класс*/
        Cart.addAndRemove()  /*Вот здесь я проставил ссылку на объект корзины, а не класс*/
    }

    getTemplate () {
        const {title, price} = this._data
        this._template.className = 'cart-card'
        this._template.innerHTML = `  
        <div class="cart_meta"><span>${title}</span><button class="remove-btn">x</button></div>
        <div class="cart_meta"><span>${price}</span></div>
        `
        const button = this._template.querySelector('button')
        button.addEventListener('click', this.removeFromCart.bind(this))   /*Ищем button в этом this._template и привязываем действие*/
    }
}

const List = new ItemsList(document.querySelector('main'))
const Cart = new CartListCreate(document.getElementById('cart'))
List.render()
Cart.render()