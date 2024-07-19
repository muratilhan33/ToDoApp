const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnAdd = document.querySelector('#btnAddNewTask');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const ulList = document.querySelector('#task-list');
//const items = ['item 1', 'item 2', 'item 3'];             eğer başlangıç değerleri istiyorsak...
let items;

eventListeners();
loadItems();

function eventListeners() {
    form.addEventListener('submit', addNewItem);
    btnDeleteAll.addEventListener('click', deleteAll);
    ulList.addEventListener('click', deleteItem);
}

function loadItems() {
    items = getItemsFromLS();

    items.forEach(function (item) {
        createItem(item);
    });
}

function createItem(text) {

    //create li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';


    //create a
    const a = document.createElement('a');
    a.className = 'delete-item float-end text-danger';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    //add a to li
    li.appendChild(a);

    //add node to li
    li.appendChild(document.createTextNode(text));

    //add li to ul
    ulList.appendChild(li);

}

function addNewItem(e) {
    if (input.value === '')
        alert('input values');

    createItem(input.value);

    setItemToLS(input.value);

    input.value = '';

    e.preventDefault();
}


function deleteAll(e) {
    if (confirm('Are you sure?')) {
        //ulList.innerHTML = '';            alternatif

        // ulList.childNodes.forEach(function (item) {
        //     if (item.nodeType === 1)
        //         item.remove();
        // })

        while (ulList.firstChild) {
            ulList.removeChild(ulList.firstChild);
        }

        localStorage.clear();
    }
    e.preventDefault();
}

function deleteItem(e) {
    if (e.target.className === 'fas fa-times') {
        e.target.parentElement.parentElement.remove();
        deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }
    if (e.target.className === 'delete-item float-end text-danger') {
        e.target.parentElement.remove();

        deleteItemFromLS(e.target.parentElement.textContent);
    }
}


function getItemsFromLS() {
    if (localStorage.getItem('items') === null)
        items = [];
    else
        items = JSON.parse(localStorage.getItem('items'));

    return items;
}

function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function (item, index) {
        if (item === text) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}