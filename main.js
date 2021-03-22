var inputForm = document.getElementById('todo-form');
var input = document.getElementById('todo-input');
var submitBttn = document.querySelector('button[type="submit"]');
var todoList = document.getElementById('todos');
var doneList = document.getElementById('dones');
var body = document.querySelector('body');
var invalidText = document.querySelector('div.invalid-feedback');
var indexes = { toggle: 1 };
// Funkcija kuria mygtuką su tekstu ir klasemis
function createButton(buttonInnerText, buttonName, buttonClassName, buttonClassName2, buttonClassName3) {
    var button = document.createElement('button');
    button.innerHTML = buttonInnerText;
    button.classList.add(buttonName, buttonClassName, buttonClassName2, buttonClassName3);
    return button;
};
// Funkcija kuria "Todo" saraso kortele su mygtukais
function createCard(listName, taskName) {
    var card = document.createElement('div');
    var cardHeader = document.createElement('h4');
    cardHeader.innerText = taskName;
    card.classList.add("border", "p-2", "mb-2");
    card.appendChild(cardHeader);
    listName.appendChild(card);
    card.appendChild(createButton("Delete", "deleteBttn", "btn", "btn-danger", "ms-1"));
    card.appendChild(createButton("Move to Done", "moveBttn", "btn", "btn-success", "ms-1"));
};
// paspaudus "add" tikrinama ar input nera tuscias, jei ne kuriama kortele "Todo" sarase.
submitBttn.addEventListener('click', function(e) {
    e.preventDefault();
    invalidText.classList.remove('d-block');
    input.classList.remove('border-danger')
    if (input.value == '') {
        invalidText.classList.add('d-block');
        input.classList.add('border-danger')
    } else {
        createCard(todoList, input.value)
    }
});
// paspaudus "delete" mygtuka istrinama atitinkama kortele
body.addEventListener('click', function(e) {
    if (e.target.classList.contains('deleteBttn')) {
        e.target.closest('div').remove();
    }
});
// paspaudus mygtukus "Move to Done" ar "Move Back", atitinkamai pakeičiami mygtuku tekstai ir
// korteles perkeliamos i kita sarasa
body.addEventListener('click', function(e) {
    if (indexes.toggle == 1 && e.target.classList.contains('moveBttn')) {
        e.target.closest('button').innerText = "Move Back"
        var task = e.target.closest('div');
        e.target.closest('div').remove();
        doneList.appendChild(task);
        indexes.toggle = 2;
    } else if (indexes.toggle == 2 && e.target.classList.contains('moveBttn')) {
        e.target.closest('button').innerText = "Move to Done"
        var task = e.target.closest('div');
        e.target.closest('div').remove();
        todoList.appendChild(task);
        indexes.toggle = 1;
    }
});