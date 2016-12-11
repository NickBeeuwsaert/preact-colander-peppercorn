import preact from 'preact';
import Book from './Book';
import {Marker} from './peppercorn.js';

export default class BookForm extends preact.Component {
    get books() {
        return this.props.books;
    }

    /** This could really be in a mixin... */
    get handleChange() {
        return this.props.onChange;
    }

    addBook() {
        let books = this.books;
        books.push({
            title: '',
            chapters: [{
                title: ''
            }]
        });
        this.handleChange({books});
    }

    removeBook(idx) {
        let books = this.books;
        if(books.length <= 1) return;
        books.splice(idx, 1);
        this.handleChange({books});
    }

    updateBook(idx, book) {
        let books = this.books;

        books.splice(idx, 1, book);

        this.handleChange({books});
    }

    render({books}) {
        return <Marker type="sequence" name="books">
            <h2>Books</h2>
            {books.map(
                ({title, chapters}, idx) => (
                    <Book
                        title={title}
                        chapters={chapters}
                        onRemoveBook={this.removeBook.bind(this, idx)}
                        onChange={this.updateBook.bind(this, idx)}
                    />
                )
            )}
            <button
                type="button"
                onClick={this.addBook.bind(this)}
            >Add Book</button>
        </Marker>;
    }
}
