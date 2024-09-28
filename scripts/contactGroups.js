class EventEmitter {
    constructor() {
        this.state = {
            toogleIconContactGroupDropDownMenu: false,
            editValue: []
        };
        this.events = {}
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(listener)
    }
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(data))
        }

        this.state[event] = data
    }
    getEventState(event) {
        return this.state[event]
    }
}
const emitter = new EventEmitter();
const addGroupId = document.getElementById('addGroupId')
const closeInputId = document.getElementById('closeInputId')
const groupInputId = document.getElementById('groupInputId')
const itemListId  = document.getElementById('itemListId')
const menuButton = document.getElementById('menuButton')
const closeButton = document.getElementById('closeButtonId')
const groupMenu = document.getElementById('groupMenuId')
const groupMenuContainer = document.getElementById('groupMenuContainer')
const addInputId = document.getElementById('addInputId')
const inputContainerId = document.getElementById('inputContainerId')
const contactMenuId = document.getElementById('contactMenuId')
const contactMenuContainer = document.getElementById('contactMenuContainer')
const addContactId = document.getElementById('addContactId')
const closeContactButtonId = document.getElementById('closeContactButtonId')
const contactGroupList = document.getElementById('contactGroupList')
const toogleButtonDropDownMenu = document.getElementById('toogleButtonDropDownMenu')
const dropdownMenuSvgContainerID = document.getElementById('dropdownMenuSvgContainerID')
const dropDownMenuTextId = document.getElementById('dropDownMenuTextId')
const saveContactId = document.getElementById('saveContactId')
const fullName = document.getElementById('fullName')
const phoneNumber = document.getElementById('phoneNumber')
const fullNameError = document.getElementById('fullNameError')
const phoneError = document.getElementById('phoneError')
const dropDownError = document.getElementById('dropDownError')
const emptyList = document.getElementById('emptyList')
const bookOfContactsId = document.getElementById('bookOfContactsId')
const mainContentId = document.getElementById('mainContentId')
const groupItemsSectionID = document.getElementById('groupItemsSectionID')
let items = JSON.parse(localStorage.getItem('items')) || []

function closeAddGroupSection (){
    groupMenu.classList.remove('show')
    groupInputId.value  = ''
    inputContainerId.style.display="none"
}
function clearError(){
    phoneError.textContent = ''
    fullName.style.border = "none"
    fullNameError.textContent = ''
    phoneNumber.style.border = "none"
    dropDownError.textContent = ''
    toogleButtonDropDownMenu.style.border = 'none'
}
function closeAddContactSection (){
    contactMenuId.classList.remove('show')
    toogleButtonDropDownMenu.disabled = false
    dropdownMenuSvgContainerID.disabled = false
}
function stopPropagation (event) {
    event.stopPropagation();
}
//add group section
menuButton.addEventListener('click', ()=>{
    groupMenu.classList.add('show')
});

closeButton.addEventListener('click', closeAddGroupSection);
groupMenu.addEventListener('click',closeAddGroupSection)

groupMenuContainer.addEventListener('click', stopPropagation);

addInputId.addEventListener('click',()=>{
    inputContainerId.style.display = 'flex'
})

closeInputId.addEventListener('click',()=>{
    inputContainerId.style.display = 'none'
})
// add contact section
addContactId.addEventListener('click',()=>{
    contactMenuId.classList.add('show')
})
contactMenuId.addEventListener('click', closeAddContactSection)

closeContactButtonId.addEventListener('click', closeAddContactSection)

contactMenuContainer.addEventListener('click', stopPropagation)
fullName.addEventListener('click',()=>{
    clearError()
})
phoneNumber.addEventListener('click',()=>{
    clearError()
})

// group items
function renderGroupItems() {
    itemListId.innerHTML = ''

    items.forEach((item) => {
        const listItem = document.createElement('li')
        listItem.classList.add('groupElement')
        const titleContainer = document.createElement('div')
        titleContainer.classList.add('titleGroupContainer')
        const textElement = document.createElement('p')
        textElement.classList.add('regularText')
        textElement.classList.add('regularText14BoldSmall')
        textElement.textContent = item.title
        const deleteButton = document.createElement('button')
        deleteButton.classList.add('deleteGroupButton')
        deleteButton.innerHTML = `
                     <svg
                                class="trash"
                                width="38"
                                height="38"
                                fill="none"
                        >
                            <rect
                                    width="37"
                                    height="37"
                                    x="0.5"
                                    y="0.5"
                                    stroke="#000"
                                    opacity="0.1"
                                    rx="5.5"
                                    fill="white"
                            />
                            <g>
                                <path
                                        class="trash-path"
                                        fill="#000"
                                        d="M12.667 26.389c0 1.161.95 2.111 2.11 2.111h8.445c1.161 0 2.111-.95 2.111-2.111V13.722H12.667V26.39Zm2.596-7.516 1.489-1.488L19 19.623l2.238-2.238 1.488 1.488-2.238 2.238 2.238 2.238-1.488 1.488L19 22.6l-2.238 2.238-1.488-1.488 2.238-2.238-2.249-2.238Zm7.431-8.317L21.64 9.5h-5.28l-1.056 1.056H11.61v2.11h14.78v-2.11h-3.695Z"
                                        opacity="0.3"
                                />
                            </g>
                            <defs>
                                <clipPath id="a">
                                    <path fill="#fff" d="M6.333 6.333h25.333v25.333H6.333z" />
                                </clipPath>
                            </defs>
                        </svg>
                `
        deleteButton.addEventListener('click', () => {
            deleteGroupModal(item.id)
        })
        titleContainer.appendChild(textElement)
        listItem.appendChild(titleContainer)
        listItem.appendChild(deleteButton)

        itemListId.appendChild(listItem)
    })
}
function deleteGroupModal(id){
    const modal = document.createElement('div')
    modal.classList.add("modalDeleteGroup")
    modal.innerHTML = `
        <div class="modalContainer">
            <div class="closeCrossContainer">
                 <button class="blankButton" id="closeModalButton">
                    <svg width="24" height="24" fill="none">
                        <g>
                            <rect width="24" height="24" fill="#fff" rx="6"/>
                            <path
                                    fill="#000"
                                    d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"
                                    opacity="0.3"
                            />
                        </g>
                        <defs>
                            <clipPath id="a">
                                <rect width="24" height="24" fill="#fff" rx="6"/>
                            </clipPath>
                        </defs>
                    </svg>
                </button >
            </div>
            <h2 class="regularText regularText18 colorBlack">Удалить группу?</h2>
            <p class="regularText14BoldSmall">Удаление группы повлечет за собой удаление контактов связанных с этой группой</p>
                <div class="modalControlPanelContainer">
                    <button type="button" class="btn btn-primary primaryButton" id="deleteGroupItemButtonId" >
                      <span class="regularText">
                         Да, удалить
                      </span>
                    </button>
                    <button class="transparentButton" id="closeDeleteItemButtonId">
                      <span class="regularText colorBlue">
                         Отмена
                      </span>
                    </button>
                    
                </div>
        </div>
    `

    mainContentId.appendChild(modal)
    document.getElementById('closeModalButton').addEventListener('click', () => {
        modal.remove()
    });
    document.getElementById('deleteGroupItemButtonId').addEventListener('click', () => {
        items = items.filter(i => i.id !== id)
        localStorage.setItem('items', JSON.stringify(items))
        renderGroupItems()
        renderItems()
        modal.remove()
    });
    document.getElementById('closeDeleteItemButtonId').addEventListener('click', () => {
        modal.remove()
    });
}

function addItem() {
    const text = groupInputId.value.trim()
    if (text.length < 3) {
        alert('Текст должен содержать как минимум 3 символа!')
        return
    }
    const newItem = {
        title: text,
        id: Date.now(),
        contacts: []
    };
    if(items.some(el=>el.title=== text)){
        alert("not today")
    }
    items.push(newItem)
    localStorage.setItem('items', JSON.stringify(items))
    groupInputId.value = ''
    renderGroupItems()
    renderContactGroupItems()
    renderItems()
}

addGroupId.addEventListener('click', addItem)
renderGroupItems()
function falseToogleState(){
    dropdownMenuSvgContainerID.innerHTML = ""
    const svg = document.createElement('button')
    svg.style.border = 'none'
    svg.innerHTML = `
          <svg
            width= "24"
            height= "24"
            fill="none"
          >
            <g  opacity= "0.5">
              <path
                fill="#000"
                d="m7.115 15.705 4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6 1.41 1.41Z"
              />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M24 24H0V0h24z" />
              </clipPath>
            </defs>
          </svg>
        `
    dropdownMenuSvgContainerID.appendChild(svg)
}
function trueToogleState(){
    dropdownMenuSvgContainerID.innerHTML = ""
    const svg = document.createElement('button')
    svg.style.border = 'none'
    svg.innerHTML = `
          <svg
            width='24'
            height='24'
            fill="none"
          >
            <g opacity="0.5">
              <path
                fill="#000"
                d="m16.885 8.295-4.59 4.58-4.59-4.58-1.41 1.41 6 6 6-6-1.41-1.41Z"
              />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h24v24H0z" />
              </clipPath>
            </defs>
          </svg>
        `
    dropdownMenuSvgContainerID.appendChild(svg)
}
toogleButtonDropDownMenu.addEventListener('click', () => {
    const currentState = emitter.getEventState('toogleIconContactGroupDropDownMenu')
    const newState = !currentState;
    dropdownMenuSvgContainerID.innerHTML = ""
    clearError()
    if(emitter.getEventState('toogleIconContactGroupDropDownMenu')){
        trueToogleState()
    } else {
        falseToogleState()
    }
    emitter.emit('toogleIconContactGroupDropDownMenu', newState)
});
// contact items
function renderContactGroupItems() {
    contactGroupList.innerHTML = ''
    items.forEach((item) => {
        emitter.emit(item, false)
        const liItem = document.createElement('li')
        liItem.classList.add('contactGroupElement')
        liItem.textContent = item.title
        liItem.addEventListener('click',()=>{
            dropDownMenuTextId.innerHTML = ''
            dropDownMenuTextId.textContent = item.title
            contactGroupList.classList.remove('show')
            toogleButtonDropDownMenu.style.color = 'black'
        })
        contactGroupList.appendChild(liItem)
    })
}
renderContactGroupItems()
function renderDropDownMenuSvgContainer(){
    dropdownMenuSvgContainerID.innerHTML = ""
    const svg = document.createElement('button')
    svg.style.border = 'none'
    svg.innerHTML = `
          <svg
            width='24'
            height='24'
            fill="none"
          >
            <g opacity="0.5">
              <path
                fill="#000"
                d="m16.885 8.295-4.59 4.58-4.59-4.58-1.41 1.41 6 6 6-6-1.41-1.41Z"
              />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h24v24H0z" />
              </clipPath>
            </defs>
          </svg>
        `
    dropdownMenuSvgContainerID.appendChild(svg)
}
renderDropDownMenuSvgContainer()
saveContactId.addEventListener('click',()=>{
    const fullNameValue = fullName.value.trim()
    const nameParts = fullNameValue.split(' ');
    const group = dropDownMenuTextId.textContent
    const phoneNumberValue = phoneNumber.value.trim()
    const phonePattern = /^\+?[0-9]{10,14}$/
    console.log(group)
    if(emitter.getEventState('toogleIconContactGroupDropDownMenu')){
        console.log(true)
        trueToogleState()
        contactGroupList.classList.remove('show')
    }
    const validate =()=>{
        let validField = true
        if (nameParts.length < 2) {
            fullNameError.textContent = 'Поле является обязательным '
            fullName.style.border = "red 1px solid"
            validField = false
        } else {
            fullNameError.textContent = '';
        }
        if (!phonePattern.test(phoneNumberValue)) {
            phoneError.textContent = 'Поле является обязательным '
            phoneNumber.style.border = "red 1px solid"
            validField = false
        } else {
            phoneError.textContent = ''
        }
        if(group === 'Выберите группу'){
            dropDownError.textContent = 'Не выбрана группа.'
            toogleButtonDropDownMenu.style.border = 'red 1px solid'
            validField = false
        }
       return validField
    }
    if(validate()){
        const editValues = emitter.getEventState('editValue')
        const newItem = {
            fullNameValue,
            phoneNumberValue,
            id: Date.now(),

        };
        if(editValues.length>0){
            const item = items.find(el=>el.title===editValues[2]).contacts.find(el => el.fullNameValue === editValues[0])

            if (item) {
                item.fullNameValue = fullNameValue
                item.phoneNumberValue = phoneNumberValue
            }

            toogleButtonDropDownMenu.disabled = false
            emitter.emit("editValue", [])
        } else {
            items.forEach((item) => {
                if (item.title === group) {
                    item.contacts.push(newItem)
                }
            });
            showNotification()
        }
        renderItems()
        fullName.value = ""
        phoneNumber.value = ""
        dropDownMenuTextId.textContent = 'Выберите группу'
        clearError()
        localStorage.setItem('items', JSON.stringify(items))
        toogleButtonDropDownMenu.style.color = 'grey'
        closeAddContactSection()
        emptyList.style.display = 'none'

    }
})


function renderItems() {

    bookOfContactsId.innerHTML = ''
    if(items.length < 1) {
        const span = document.createElement('span')
        span.classList.add("regularText")
        span.classList.add("regularTextOpacity18")
        span.classList.add("noListItem")
        span.textContent = "Список контактов пуст"
        span.id = "emptyContactListMessageId";
        groupItemsSectionID.appendChild(span);
        return
    }
    const emptyContactListMessageId = document.getElementById('emptyContactListMessageId')
    if( emptyContactListMessageId){
        emptyContactListMessageId.remove()
    }
    items.forEach((item, index) => {

        const accordionId = `collapse${index}`

        const accordionItem = document.createElement('div')

        accordionItem.classList.add('accordion')
        accordionItem.classList.add('fullWidth')

        accordionItem.innerHTML = `
                    <div class="accordion-item withoutEffects">
                        <h2 class="accordion-header" id="heading${index}">
                            <button class="accordion-button collapsed withoutEffects" type="button" data-bs-toggle="collapse" data-bs-target="#${accordionId}" aria-expanded="false" aria-controls="${accordionId}">
                               ${item.title}
                            </button>
                        </h2>
                        <div id="${accordionId}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body contactsAccordionBody">
                                ${renderContacts(item.contacts, item.title)}
                            </div>
                        </div>
                    </div>
                `;

        bookOfContactsId.appendChild(accordionItem)
    });
}

function renderContacts(contacts, group) {

    return contacts.map(contact => `
                <div class="contact-item contactItemStyle">
                    <div>
                        <span class="regularText regularText18 colorGrey">${contact.fullNameValue}</span>
                    </div>
                    <div class="contact-buttons contactsButtonContainer">
                        <span>${contact.phoneNumberValue}</span>
                        <button class="blankButton" onclick="editContact('${contact.fullNameValue}', '${contact.phoneNumberValue}','${group}')">
                          <svg
                            width="38"
                            height="38"
                            fill="none"
                            class="pencil"
                          >
                            <rect
                                class="pencil"
                              width="37"
                              height="37"
                              x="0.5"
                              y="0.5"
                              stroke="#000"
                              opacity="0.1"
                              rx="5.5"
                            />
                            <g >
                              <path
                                class="pencilPath"
                                fill="#000"
                                d="M10 24.25V28h3.75l11.06-11.06-3.75-3.75L10 24.25Zm17.71-10.21a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z"
                                opacity="0.3"
                              />
                            </g>
                            <defs>
                              <clipPath id="a">
                                <path fill="#fff" d="M7 7h24v24H7z" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                        <button class="blankButton" onclick="deleteContact('${contact.fullNameValue}', '${group}')">
                            <svg
                                    id="closeInputId"
                                    class="trash"
                                    width="38"
                                    height="38"
                                    fill="none"
                            >
                                <rect
                                        width="37"
                                        height="37"
                                        x="0.5"
                                        y="0.5"
                                        stroke="#000"
                                        opacity="0.1"
                                        rx="5.5"
                                />
                                <g>
                                    <path
                                            class="trash-path"
                                            fill="#000"
                                            d="M12.667 26.389c0 1.161.95 2.111 2.11 2.111h8.445c1.161 0 2.111-.95 2.111-2.111V13.722H12.667V26.39Zm2.596-7.516 1.489-1.488L19 19.623l2.238-2.238 1.488 1.488-2.238 2.238 2.238 2.238-1.488 1.488L19 22.6l-2.238 2.238-1.488-1.488 2.238-2.238-2.249-2.238Zm7.431-8.317L21.64 9.5h-5.28l-1.056 1.056H11.61v2.11h14.78v-2.11h-3.695Z"
                                            opacity="0.3"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="a">
                                        <path fill="#fff" d="M6.333 6.333h25.333v25.333H6.333z" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>
                </div>
            `).join('')
}

function editContact(title, number, group) {

    emitter.emit("editValue", [title, number, group])
    toogleButtonDropDownMenu.disabled = true
    dropdownMenuSvgContainerID.disabled = true
    fullName.value = title
    phoneNumber.value = number
    dropDownMenuTextId.textContent = group
    contactMenuId.classList.add('show')
}

function deleteContact(title, group) {
    console.log(title, group)
    let item = items.find(i => i.title === group);
    console.log(item)
    if (item) {
        item.contacts = item.contacts.filter(contact => contact.fullNameValue !== title);
        localStorage.setItem('items', JSON.stringify(items));
    }
    renderItems()
}

renderItems();
function showNotification() {
    const notification = document.getElementById('notification');

    // Показываем плашку
    notification.classList.add('showNotification');

    // Закрываем через 3 секунды
    setTimeout(() => {
        notification.classList.remove('showNotification');
    }, 3000);
}