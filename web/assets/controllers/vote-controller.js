import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['total'];

    connect() {
        console.log('Hello stimulus');
    }

    #changeVote(direction) { // private method in stimulus
        let change;
        if ('up' === direction) {
            change = 1;
        } else if ('down' === direction) {
            change = -1;
        } else {
            throw `invalid direction "${direction}". Only "up" and "down" are valid.`;
        }
        const actualTotal = parseInt(this.totalTarget.textContent, 0);
        this.totalTarget.textContent = actualTotal + change;
    }

    upVote() {
        this.#changeVote('up');
    }
    downVote() {
        this.#changeVote('down');
    }
}
