import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static values = {
        totalNumber: Number,
        voteUrl: String,
        // totalNumber: String,
        // totalNumber: Boolean,
        // totalNumber: Array,
        // totalNumber: Object,
    };

    static targets = ['total'];

    connect() {
        console.log('Hello stimulus');
        console.log(this.totalNumberValue);
        console.log(this.voteUrlValue);
    }

    async #changeVote(direction) { // private method in stimulus
        const response = await fetch(this.voteUrlValue, {
            method: 'POST',
            body: JSON.stringify({direction: direction}),
        })
        // without await
        // const html = ....then(response => response.text())
        // const html = ....then((response) => { return response.text() })

        // this.element.innerHTML = await response.text();
        this.totalTarget.innerHTML = await response.text();
    }

    upVote() {
        this.#changeVote('up');
    }
    downVote() {
        this.#changeVote('down');
    }
}
