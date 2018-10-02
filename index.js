'use strict';

const STORE = {
  items:  [
    {name: 'apples', checked: false, edit: false},
    {name: 'oranges', checked: false, edit: true},
    {name: 'milk', checked: false, edit: false},
    {name: 'bread', checked: false, edit: false}
  ],
  hideCompleted:  false,
  searchedItems: [],
};


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item"> <span class="img">${item.checked ? '<img src="checked.png">' : '<img src="unchecked.png">'}</span>
      <input type="text" class="input-item-name" value="${item.name}" ${item.edit ? '""><button class="edit-button">OK</button>' : 'disabled>'}</span>
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
  
  return items.join('');
}


function renderShoppingList() {
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
  STORE.items.push({
    name: itemName, 
    checked: false, 
    edit:false});
  }


function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
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

function deleteListItem(itemIndex) {
  console.log(`Deleting item at index  ${itemIndex} from shopping list`);
  STORE.items.splice(itemIndex, 1);
}


function handleDeleteItemClicked() {
  // like in `handleItemCheckClicked`, we use event delegation
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    // get the index of the item in STORE
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    // delete the item
    deleteListItem(itemIndex);
    // render the updated shopping list
    renderShoppingList();
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


function addNewName(itemIndex, newName) {
  STORE.items[itemIndex].name = newName;
}
function handleOKClick(){
  $('.js-shopping-list').on('click', '.edit-button', function(event) {
const itemIndex = getItemIndexFromElement($(this));
const newName = $(this).parent().children('.input-item-name').val();
console.log(itemIndex);
console.log(newName);
addNewName(itemIndex, newName);
toggleEditItem(itemIndex);
renderShoppingList();
  });
}

function toggleEditItem(itemIndex) {
  console.log('Toggling editing property for item at index ' + itemIndex);
  STORE.items[itemIndex].edit = !STORE.items[itemIndex].edit;

}
//STORE.item[itemIndex.name = $(this).val();
function handleEditItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-edit', function(event) {
    let test = $(this).closest('li');
    console.log(test);
    const itemIndex = getItemIndexFromElement($(this).closest('li'))
    toggleEditItem(itemIndex);
    renderShoppingList();
  });
}

function toggleHideItems(itemIndex){
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.hideCompleted = !STORE.hideCompleted;
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



function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleHideClicked();
  handleSearchInputted();
  handleEditItemClicked();
  handleOKClick();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);

// search 