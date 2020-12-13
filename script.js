range = {
    checboxes: document.querySelectorAll(".sf-field-post-meta-_regular_price ul li input"),
    form: document.querySelector("#search-filter-form-7113 > ul"),
}

/*************************************** Range: Aktualizuj cenę przy filtrowaniu ***************************************/
function buildRangeSliderFunction() {
    let inputArray = [];

    // Get Values from inputs
    function getValuesFromInput() {
        if (range.checboxes.length > 1) {
            for (let checbox of range.checboxes) {
                inputArray.push(checbox.value); 
            }
            inputArray.map(i=>Number(i))
    
            inputMin = Math.min(...inputArray.map(i=>Number(i)));
            inputMax = Math.max(...inputArray.map(i=>Number(i)));
        }
    } 
    getValuesFromInput();

    // Add Range to DOM
    function createDomElement() {
        newRange = document.createElement("li");
        newRange.style.display = "block";
        newRange.innerHTML = 
        `<h4 style="display: block;">Cena</h4>
        <p style="display: flex; align-items: center;">
        <input type="number" min="${inputMin}" max="${inputMax}" step="1" id="input-select"> zł
        <input type="number" min="${inputMin}" max="${inputMax}" step="1" id="input-number"> zł
        </p>
        <div id="html5"></div>`
        range.form.appendChild(newRange);
    }
    createDomElement();

    // Update Slider
    function updateRangeSlider() {
        const select = document.getElementById('input-select');

        for (let i = inputMin; i <= inputMax; i++){
    
            let option = document.createElement("option");
                option.text = i;
                option.value = i;
    
            select.appendChild(option);
            console.log(select.value);
        }
    
        let html5Slider = document.getElementById('html5');
    
        noUiSlider.create(html5Slider, {
            start: [inputMin, inputMax],
            connect: true,
            step: 1,
            range: {
                'min': inputMin,
                'max': inputMax
            }
        });
    
        const inputNumber = document.getElementById('input-number');
        let newMinPrice, newMaxPrice;
    
        html5Slider.noUiSlider.on('update', function(values, handle) {
            let value = values[handle];
    
            if (handle) {
                inputNumber.value = Math.round(value); // cena w input zaokrąglona
                newMinPrice = inputNumber.value;
            } else {
                select.value = Math.round(value); // cena w input zaokrąglona
                newMaxPrice = select.value;
            }
        });
    
        select.addEventListener('change', function(){
            html5Slider.noUiSlider.set([this.value, null]);
        });
        inputNumber.addEventListener('change', function(){
            html5Slider.noUiSlider.set([null, this.value]);
        });
    }
    updateRangeSlider();
}
buildRangeSliderFunction();