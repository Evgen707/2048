class Cell {
    constructor(fieldElement, game) {
        this.game = game;
        this.fieldElement = fieldElement;
        this.element = createAndAppend({
            className: 'cell',
            parentElement: fieldElement
        });

        this.element.style.width = this.game.cellSize + 'vmin';
        this.element.style.height = this.game.cellSize + 'vmin';

        if (Math.random() > 0.9) {
            this.spawn();
        }
        // this.element.onclick = this.merge.bind(this);
    }
    get value() {
        return this._value || 0;
    }
    set value(value) {
        this._value = value;
        this.element.innerHTML = value == 0 ? '' : value;
        this.element.setAttribute('data-ship', value);
    }

    clear() {
        this.value = '';
    }
    merge(cell) {
        if (this.value) {
            this.game.addScore(this.value + cell.value);
        }
        new AnimateCell(cell, this);

        this.value += cell.value;

        this.hightlight();

        cell.clear();
    }
    isSameTo(cell) {
        return this.value == cell.value;
    }

    spawn() {
        this.value = Math.random() > 0.9 ? 4 : 2;
    }

    get isEmpty() {
        return this.value == 0;
    }

    hightlight() {
        this.element.className = 'cell hightlight'

        let hightlightTime = 200;
        let hightlightStartTime = new Date();
        this.hightlightStartTime = hightlightStartTime;

        setTimeout(function() {
            if (hightlightStartTime == this.hightlightStartTime) {
                this.element.className = 'cell';
            }
        }.bind(this), hightlightTime);
    }
}

class AnimateCell {
    constructor(fromCell, toCell) {
        this.element = fromCell.element.cloneNode(true);
        this.element.className = 'cell animate';

        this.element.style.width = fromCell.game.cellSize + 'vmin';
        this.element.style.height = fromCell.game.cellSize + 'vmin';

        this.element.style.top = fromCell.element.offsetTop + 'px';
        this.element.style.left = fromCell.element.offsetLeft + "px";

        fromCell.fieldElement.appendChild(this.element);

        this.element.style.top = toCell.element.offsetTop + 'px';
        this.element.style.left = toCell.element.offsetLeft + "px";

        setTimeout(function() {
            fromCell.fieldElement.removeChild(this.element)
        }.bind(this), 200)

        // toCell.element.offsetTop;
        // toCell.element.offsetLeft;
    }
}