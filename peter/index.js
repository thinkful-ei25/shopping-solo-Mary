'use strict';

const STORE = {
<<<<<<< HEAD
  items:  [
    {name: 'apples', checked: false, edit: false},
    {name: 'oranges', checked: false, edit: true},
    {name: 'milk', checked: true, edit: false},
    {name: 'bread', checked: false, edit: false}
  ],
  hideCompleted:  false,
  searchedItems: [],
=======
  items: [
    { name: "apples", checked: false },
    { name: "oranges", checked: false },
    { name: "milk", checked: true },
    { name: "bread", checked: false }
  ],
  hideCompleted: false,
>>>>>>> a9bb3a1388e29ffc603043a7029a117a943e3f67
};
STORE.filteredSearch = STORE.items;


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item"> <span class="img">${item.checked ? '<img src="checked.png">' : '<img src="unchecked.png">'}</span>
      <input type="text" value="${item.name}" ${item.edit ? '""><button class="edit-button">OK</button>' : 'disabled>'}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
        <button class="shopping-item-edit js-item-edit">
            <span class="button-label">edit</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
<<<<<<< HEAD
  
  return items.join('');
=======

  return items.join("");
>>>>>>> a9bb3a1388e29ffc603043a7029a117a943e3f67
}


function renderShoppingList() {
<<<<<<< HEAD
=======
  let marold = STORE.filteredSearch;
  let filteredItems =  marold;
  if (STORE.hideCompleted) {
    filteredItems = filteredItems.filter(item => !item.checked);
  }
>>>>>>> a9bb3a1388e29ffc603043a7029a117a943e3f67
  // render the shopping list in the DOM
  let filteredItems = [...STORE.items];

  if (STORE.searchedItems.length !== 0){
    //toggle visibily of searched items
    filteredItems = STORE.searchedItems;
    //console.log('filtered items:' + filteredItems);
  }

  if (STORE.hideCompleted){
    //toggle visibility of checked items
    filteredItems = filteredItems.filter(item => !item.checked);
  }

  const shoppingListItemsString = generateShoppingItemsString(filteredItems);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
  console.log('`renderShoppingList` ran');
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
<<<<<<< HEAD
  STORE.items.push({name: itemName, checked: false, edit:false});
=======
  STORE.items.push({ name: itemName, checked: false });
>>>>>>> a9bb3a1388e29ffc603043a7029a117a943e3f67
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function (event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');

    //if val().length === 0
    //throw message "you need to enter an item name"
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

<<<<<<< HEAD
function deleteListItem(itemIndex) {
  console.log(`Deleting item at index  ${itemIndex} from shopping list`);
=======
function deleteItem(itemIndex) {
>>>>>>> a9bb3a1388e29ffc603043a7029a117a943e3f67
  STORE.items.splice(itemIndex, 1);
}


function handleDeleteItemClicked() {
<<<<<<< HEAD
  // like in `handleItemCheckClicked`, we use event delegation
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    // get the index of the item in STORE
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    // delete the item
    deleteListItem(itemIndex);
    // render the updated shopping list
    renderShoppingList();
=======
  $('.js-shopping-list').on('click', `.js-item-delete`, event => {
    const itemIndex = getItemIndexFromElement(event.target);
    deleteItem(itemIndex);

>>>>>>> a9bb3a1388e29ffc603043a7029a117a943e3f67
  });
}
// function editItemName(itemIndex) {
//   console.log(`Editing item at index  ${itemIndex} on shopping list`);

// }

// function editListItem(itemIndex, itemEdit) {
//   STORE.items.splice(itemIndex, 1, itemEdit);
// }
// function handleEditItemName() {
//   $('.js-shopping-list').on('click', '.js-item-edit', event => {
//     console.log('`handleEditItemName` ran');
//     const itemIndex = getItemIndexFromElement(event.currentTarget);
//     editChangeForm(itemIndex);
//   });
// }
function toggleEditItems(itemIndex) {
  console.log('Toggling editing property for item at index ' + itemIndex);
  STORE.items[itemIndex].edit = !STORE.items[itemIndex].edit;

<<<<<<< HEAD
}
//STORE.item[itemIndex.name = $(this).val();
function handleEditItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-edit', event =>{
    toggleEditItems(STORE.items);
    renderShoppingList();
  });
}

function toggleHideItems(itemIndex){
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.hideCompleted = !STORE.hideCompleted;
=======
//
function toggleHideItems() {
  STORE.hideCompleted = !STORE.hideCompleted;
}

function handleToggleHideClick() {
  $('#toggle-completed-filter').click(() => {

    toggleHideItems();
    renderShoppingList();
  })
}


function searchFunction() {
  $("#search-bar-input").on("keyup", function () {
    const value = $(this).val().toLowerCase();
    STORE.filteredSearch = STORE.items.filter(function (item) {
      return item.name.indexOf(value) > -1
    });
    console.log(STORE.filteredSearch);
    renderShoppingList();
  });
>>>>>>> a9bb3a1388e29ffc603043a7029a117a943e3f67
}

function handleToggleHideClicked(){
  $('#toggle-hide-checked').click(() =>{

    //STORE
    toggleHideItems(STORE.items);
    //Render
    renderShoppingList();
  });
}

function handleSearchInputted(){
  // prevents pressing enter on search bar which resulted in another item being added
  $('#search-bar').keypress(function (event){
    if (event.keyCode ===13){
      event.preventDefault();
    }
  });

<<<<<<< HEAD
  $('#search-bar').on('keyup', function(){
  // assigns search-bar value to variable then filters
    let value = $(this).val().toLowerCase();
    STORE.searchedItems = STORE.items.filter(function(item){
      return item.name.toLowerCase().indexOf(value)> -1;
    });
    // render
    renderShoppingList();
  });
}
=======






function toggleEditItemName() { };
//recieve the index where the item is stored in STORE then use the index
//to add the new updated value into that index
function handleToggleEdit() { };
//this will listen for the edit button being clicked and then utilize the 'toggle'
//if a toggle is what's needed
//clicking OK will call the render function which in turn updates the object &
//renders on the DOM
//“click”, you need to change the element currently holding the name into an <input> tag so that the user can input the new title.










>>>>>>> a9bb3a1388e29ffc603043a7029a117a943e3f67



function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleHideClicked();
  handleSearchInputted();
  handleEditItemClicked();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);

// search 