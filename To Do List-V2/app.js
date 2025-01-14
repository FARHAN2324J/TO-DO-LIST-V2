const btn_Add = document.getElementById('btn1');
const Input = document.getElementById('input');
const Item_container = document.getElementById('item-container');

// بارگذاری کارها از Local Storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.checked, task.icons);
    });
}

// ایجاد عنصر جدید برای هر کار
function createTaskElement(text, checked = false, icons = { frown: false, meh: false, smile: false }) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('DIV', 'check-box-container');

    const newElement = document.createElement('p');
    newElement.textContent = text;

    const newCheckBox = document.createElement('input');
    newCheckBox.classList.add('checkBox');
    newCheckBox.type = 'checkbox';
    newCheckBox.checked = checked;

    const newIcon = document.createElement('i');
    newIcon.classList.add('fas', 'fa-trash-alt');
    newIcon.style.color = 'darkred';
    newIcon.style.fontSize = '1.1em';
    newIcon.style.cursor = 'pointer';

    const newEmoji = document.createElement('i');
    newEmoji.classList.add('far', 'fa-frown');
    if (icons.frown) newEmoji.classList.add('icon-red');
    
    const newEmoji2 = document.createElement('i');
    newEmoji2.classList.add('far', 'fa-meh');
    if (icons.meh) newEmoji2.classList.add('icon-yellow');

    const newEmoji3 = document.createElement('i');
    newEmoji3.classList.add('far', 'fa-smile');
    if (icons.smile) newEmoji3.classList.add('icon-green');

    // افزودن رویداد برای چک باکس
    newCheckBox.addEventListener('change', () => {
        if (newCheckBox.checked) {
            newElement.classList.add('line-through');
        } else {
            newElement.classList.remove('line-through');
        }
        updateLocalStorage();
    });

    // افزودن رویداد برای حذف کار
    newIcon.addEventListener('click', () => {
        newDiv.remove();
        updateLocalStorage();
    });

    // افزودن رویداد برای آیکون‌ها
    newEmoji.addEventListener('click', function () {
        this.classList.toggle('icon-red');
        icons.frown = this.classList.contains('icon-red');
        updateLocalStorage();
    });

    newEmoji2.addEventListener('click', function () {
        this.classList.toggle('icon-yellow');
        icons.meh = this.classList.contains('icon-yellow');
        updateLocalStorage();
    });

    newEmoji3.addEventListener('click', function () {
        this.classList.toggle('icon-green');
        icons.smile = this.classList.contains('icon-green');
        updateLocalStorage();
    });

    // افزودن عناصر به newDiv
    newDiv.appendChild(newElement);
    newDiv.appendChild(newCheckBox);
    newDiv.appendChild(newIcon);
    newDiv.appendChild(newEmoji);
    newDiv.appendChild(newEmoji2);
    newDiv.appendChild(newEmoji3);

    // افزودن newDiv به Item_container
    Item_container.appendChild(newDiv);

    // تنظیم وضعیت اولیه
    if (checked) {
        newElement.classList.add('line-through');
    }
}

// به‌روزرسانی Local Storage
function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.check-box-container').forEach(div => {
        const text = div.querySelector('p').textContent;
        const checked = div.querySelector('.checkBox').checked;
        
        // بررسی وضعیت آیکون‌ها
        const icons = {
            frown: div.querySelector('.fa-frown').classList.contains('icon-red'),
            meh: div.querySelector('.fa-meh').classList.contains('icon-yellow'),
            smile: div.querySelector('.fa-smile').classList.contains('icon-green')
        };

        tasks.push({ text, checked, icons });
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// تابع افزودن عنصر جدید
function addNewElement() {
    const input_text = Input.value.trim();
    
    if (input_text) {
        createTaskElement(input_text);
        Input.value = '';
        updateLocalStorage();
    } else {
        Input.classList.add('border-red');
    }
}

// بارگذاری کارها هنگام بارگذاری صفحه
loadTasks();

// افزودن رویداد کلیک برای دکمه افزودن
btn_Add.addEventListener('click', addNewElement);

// افزودن رویداد کلید برای Enter
Input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addNewElement();
    }
});

// حذف حاشیه قرمز
Input.addEventListener('keyup', () => {
    if (Input.value.trim()) {
        Input.classList.remove('border-red');
    }
});

// تغییر تم
const container = document.querySelector('.container');
const body = document.querySelector('body');
let light_theme = 'theme-light';
let dark_theme = 'theme-dark';

document.getElementById(dark_theme).addEventListener('click', () => {
    container.classList.remove('container-light-theme');
    body.classList.remove('container-light-theme');
    container.classList.add('container-dark-theme');
    body.classList.add('container-dark-theme');
});

document.getElementById(light_theme).addEventListener('click', () => {
    container.classList.add('container-light-theme');
    body.classList.add('container-light-theme');
    container.classList.remove('container-dark-theme');
    body.classList.remove('container-dark-theme');
});
