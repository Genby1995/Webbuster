// Данный JS реализует:
// - валидацию полей IMPUT формы отправки данных
// - задаёт поведение BUTTON отправки формы 

document.addEventListener("DOMContentLoaded", function() {

    const form = document.forms["form"];
    let formArr = Array.from(form);
    let validFormArr = [];
    let productNames = [];
    for (let elem of products) { // - достаём названия товаров и добавляем их в массив
        productNames.push(elem.name)
    }
    // - присваиваем соответствующему элементу атрибут с REGEXP для дальнейшейшего использования в валидации
    form.elements['popupProd'].dataset.reg
        ="^(?:"
        + productNames
        .join("|")
        .replace(/\s+/g,"\\ ")
        .replace("-","\\-")
        +")*$";

    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        const allValid = [];
        validFormArr.forEach((el) => {allValid.push(el.getAttribute("is-valid"));});
        const isAllValid = allValid.reduce((acc, current) => {
            return +acc && +current;
        });
        
        if (isAllValid) {
            form.classList.add('_sending')

            if (!(+(email.getAttribute("is-valid")))){ //вставляем EMAIL по-умолчанию, если введённый EMAIL неверен
                email.value = "genby1995.test@mail.ru";
            }

            let formData = new FormData(form);
            formData.append(email.name, email.value);

            for(let [name, value] of formData) {
                console.log(`${name} = ${value}`);
            }

            let response = await fetch('/sendmail.php', {
                method: 'POST',
                body: formData
            });
            

            if(response.ok) {
                //let result = await response.json();
                alert("Спасибо, информация отправлено");
                form.reset(); //обнуляем поля INPUT
                for (let el of formArr) {
                    el.dispatchEvent(new Event('input', {bubbles:true}));
                }
                form.classList.remove('_sending');
                ym(91182822,'reachGoal','info_send'); //отправляем событие в Яндекс метрику
            } else {
                form.classList.remove('_sending');
                alert("Ошибка!");
            }
        }
    };

    form.addEventListener("input", inputHandler);
    email.addEventListener("input", inputHandler);//добавляем введённый EMAIL для проверки на валидацию
    
    formArr.forEach((el) => {
        if (el.hasAttribute("data-reg")) {
        el.setAttribute("is-valid", "0");
        validFormArr.push(el);
        }
    });

    function inputHandler({ target }) {
        if (target.hasAttribute("data-reg")) {
        inputCheck(target);
        }
    }
    
    function inputCheck(el) {
        let inputValue = el.value;
        let inputReg = el.getAttribute("data-reg");
        let reg = new RegExp(inputReg);
        if (el.value.length > 1 && reg.test(inputValue)) {
            el.setAttribute("is-valid", "1");
            el.style.border = "2px solid rgb(0, 196, 0)"
            el.style.boxShadow = '0px 0px 10px rgb(0, 196, 0)';
        } else {
            el.setAttribute("is-valid", "0");
            el.style.border = "2px solid rgb(255, 0, 0)";
            el.style.boxShadow = '0px 0px 10px rgb(255, 0, 0)';
        }
    }
});