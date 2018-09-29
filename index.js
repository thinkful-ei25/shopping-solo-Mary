'use strict';

const STORE = {
  items: [
    { name: "apples", checked: false },
    { name: "oranges", checked: false },
    { name: "milk", checked: true },
    { name: "bread", checked: false }
  ],
  hideCompleted: false,
};
STORE.filteredSearch = STORE.items;

//STORE.items[itemIndex].name = (NEWvalue)

function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
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
  console.log("Generating shopping list element");

  const items = shoppingList.map((item, index) => generateItemElement(item, index));

  return items.join("");
}


function renderShoppingList() {
  let marold = STORE.filteredSearch;
  let filteredItems =  marold;
  if (STORE.hideCompleted) {
    filteredItems = filteredItems.filter(item => !item.checked);
  }
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(filteredItems);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({ name: itemName, checked: false });
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
  console.log("Toggling checked property for item at index " + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function deleteItem(itemIndex) {
  STORE.items.splice(itemIndex, 1);
}


function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', `.js-item-delete`, event => {
    const itemIndex = getItemIndexFromElement(event.target);
    deleteItem(itemIndex);

  });
}

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
}










function toggleEditItemName() { };
//recieve the index where the item is stored in STORE then use the index
//to add the new updated value into that index
function handleToggleEdit() { };
//this will listen for the edit button being clicked and then utilize the 'toggle'
//if a toggle is what's needed
//clicking OK will call the render function which in turn updates the object &
//renders on the DOM
//“click”, you need to change the element currently holding the name into an <input> tag so that the user can input the new title.













// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  searchFunction();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);