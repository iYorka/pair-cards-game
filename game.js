(function () {
    function checkAllGame() {
        for (currentButton of document.querySelectorAll('.btn-lrg')) {
            if (currentButton.disabled === false) {
                return false;
            }
        }
        div = document.createElement('div');
        div.textContent = 'Игра окончена, победа!!!!';
        div.classList.add('alert', 'alert-success', 'd-flex', 'align-items-center');
        refreshButton = document.createElement('button');
        refreshButton.textContent = 'Еще раз!!!!';
        refreshButton.classList.add('btn', 'btn-success');
        refreshButton.addEventListener('click', function (event) {
            event.preventDefault();
            confirmNewGame = confirm("Новая игра?");
            if (confirmNewGame) {
                let gameForm = document.querySelector('#game-form');
                if (gameForm.lastChild) {
                    gameForm.removeChild(gameForm.lastChild);
                };

                let gameMenuForm = document.getElementById('game-menu').querySelector('form').lastChild;
                if (gameMenuForm.lastChild) {
                    gameMenuForm.removeChild(gameMenuForm.lastChild);
                }
                let difficulty = document.getElementById('difficulty').value;
                renderGameForm(difficulty);
            };
        });
        container = document.getElementById('game-menu').querySelector('.space-div');
        // container;
        div.append(refreshButton);
        container.append(div);
    }
    function refreshOpenCards() {
        const refreshCardsList = [];
        for (currentButton of document.querySelectorAll('.btn-lrg')) {
            if (!currentButton.classList.contains('hiden-text') && (currentButton.disabled === false)) {
                refreshCardsList.push(currentButton);
            }
        }
        if (refreshCardsList.length >= 2) {
            for (currentButton of refreshCardsList) {
                currentButton.classList.add('hiden-text');
            }
        }
    }
    function checkCards(id) {
        buttons = document.querySelectorAll('#' + id);
        let match = false;
        let openCardsCount = 0;
        for (currentButton of buttons) {
            match = match || currentButton.classList.contains('hiden-text');
        }
        let refreshCardsList = [];

        if (!match) {
            for (currentButton of buttons) {
                currentButton.disabled = true;
                currentButton.textContent = "Matched(" + currentButton.textContent + ")";
            }
        }

    }

    function renderMenu() {
        const menu = document.querySelector('#game-menu');
        const form = document.createElement('form');
        const div = document.createElement('div');

        // <input type="range" class="form-range" min="0" max="5" id="customRange2"></input>
        inputDiv = document.createElement('div');
        const input = document.createElement('input');
        input.type = "range";
        // input.placeholder = 'Введите количество пар';
        input.classList.add('form-range');
        input.id = 'difficulty';
        input.min = '4';
        input.max = '24';
        input.step = '2';
        input.addEventListener('input', function () {
            let label = this.parentNode.querySelector('label');
            label.textContent = this.value;
        })

        label = document.createElement('LABEL');
        label.textContent = input.value;;
        inputDiv.append(label);

        button = document.createElement('button');
        button.textContent = 'Запустить игру!';
        button.classList.add('btn', 'btn-warning');
        button.addEventListener('click', function (event) {
            event.preventDefault();
            let gameForm = document.querySelector('#game-form');
            if (gameForm.lastChild) {
                gameForm.removeChild(gameForm.lastChild);
            };

            let gameMenuForm = document.getElementById('game-menu').querySelector('form').lastChild;
            if (gameMenuForm.lastChild) {
                gameMenuForm.removeChild(gameMenuForm.lastChild);
            }
            let difficulty = document.getElementById('difficulty').value;
            renderGameForm(difficulty);
        })
        div.textContent = 'уровень сложности';
        inputDiv.append(input);
        div.append(inputDiv);

        inputDiv.classList.add('d-flex', 'flex-column', 'align-items-center', 'bd-highlight', 'mb-3');
        div.append(button);
        form.append(div);

        blockDiv = document.createElement('div');
        blockDiv.classList.add('space-div');
        form.append(blockDiv);
        div.classList.add('row', 'justify-content-center', 'align-items-center', 'col-12');

        menu.append(form);

    }
    function renderGameForm(difficulty) {
        const form = document.createElement('form');
        form.classList.add('input-group');
        // const rowsCount = 4;
        // const columnsCount = 1;
        const buttonsCount = difficulty;
        const buttonsArray = [];
        for (i = 0; i < buttonsCount; i++) {
            buttonsArray[i] = Math.trunc(i / 2) + 1;
        }
        for (i = buttonsCount - 1; i > 0; i--) {
            randPos = Math.trunc(Math.random() * buttonsCount);
            let x = buttonsArray[i];
            buttonsArray[i] = buttonsArray[randPos];
            buttonsArray[randPos] = x;
        }
        let div = document.createElement('div');
        div.classList.add('row', 'justify-content-center', 'col-12');
        for (i = 0; i < buttonsCount; i++) {
            innerDiv = document.createElement('div');
            innerDiv.classList.add('col-2')
            button = document.createElement('button');
            button.classList.add('btn-lrg', 'btn-secondary', 'btn-size');
            button.textContent = buttonsArray[i];
            button.id = 'id' + button.textContent;
            button.classList.add('hiden-text');
            button.addEventListener('click', function (event) {
                event.preventDefault();
                refreshOpenCards();
                this.classList.toggle('hiden-text');
                checkCards(this.id);
                checkAllGame();
            });
            innerDiv.append(button);
            div.append(innerDiv);
        }
        form.append(div);
        container = document.getElementById('game-form')
        container.append(form);
    }
    renderMenu();
})();