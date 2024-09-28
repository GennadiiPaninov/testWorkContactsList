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
let items = JSON.parse(localStorage.getItem('items')) || []

function closeAddGroupSection (){
    groupMenu.classList.remove('show')
    groupInputId.value  = ''
    inputContainerId.style.display="none"
}
function closeAddContactSection (){
    contactMenuId.classList.remove('show')
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


function renderItems() {
    itemListId.innerHTML = ''

    items.forEach((item) => {
        const listItem = document.createElement('li')
        listItem.classList.add('groupElement')
        const titleContainer = document.createElement('div')
        titleContainer.classList.add('titleGroupContainer')
        const textElement = document.createElement('p')
        textElement.classList.add('regularText')
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
            items = items.filter(i => i.id !== item.id)
            localStorage.setItem('items', JSON.stringify(items))
            renderItems()
        })
        titleContainer.appendChild(textElement)
        listItem.appendChild(titleContainer)
        listItem.appendChild(deleteButton)

        itemListId.appendChild(listItem)
    })
}

function addItem() {
    const text = groupInputId.value.trim()
    if (text.length < 3) {
        alert('Текст должен содержать как минимум 3 символа!')
        return
    }
    const newItem = {
        title: text,
        id: Date.now()
    };
    items.push(newItem)
    localStorage.setItem('items', JSON.stringify(items))
    groupInputId.value = ''
    renderItems()
}

addGroupId.addEventListener('click', addItem)
renderItems()