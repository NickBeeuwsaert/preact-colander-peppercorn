import preact from 'preact';

import Component from '../component';
import FormControl from './FormControl';
import Books from './Books';
import {get} from '../utils';
import defaults from '../defaultState';

let defaultBookList = defaults.bookList;

export default class Form extends Component {
    constructor({
        books=defaultBookList.books,
        name=defaultBookList.name
    }) {
        super();
        this.state = {books, name};
    }

    render({
        method='POST', action='',
        errors
    }, {books, name}) {
        return <form method={method} action={action}>
            <h1>Book list</h1>
            {get(errors, 'errors', []).map(err => (
                <div class="flash error">{err}</div>
            ))}
            <FormControl
                label="List Name"
                name="name"
                value={name}
                onInput={this.linkState('name')}
                errors={get(errors, 'child_errors.name.errors')}
            />
            <Books
                books={books}
                onChange={this.setState.bind(this)}
                errors={get(errors, 'child_errors.books', {})}
            />
            <div class="text-right">
                <button
                    class="btn primary"
                    type="submit"
                >&#x2713; Create list</button>
            </div>
        </form>;
    }
}
