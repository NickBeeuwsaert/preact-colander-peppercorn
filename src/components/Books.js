import preact from 'preact';
import Component from '../component';
import Book from './Book';
import ErrorList from './ErrorList';
import {Marker} from './peppercorn.js';
import {get} from '../utils';
import {book as defaultBook} from '../defaultState';

export default class Books extends Component {
    addBook() {
        let {books} = this.props;
        books.push({...defaultBook});
        this.props.onChange({books});
    }

    removeBook(idx) {
        let {books} = this.props;
        if(books.length <= 1) return;
        books.splice(idx, 1);
        this.props.onChange({books});
    }

    updateBook(idx, newData) {
        let {books} = this.props,
            book = books[idx];

        books.splice(idx, 1, {
            ...book,
            ...newData
        });

        this.props.onChange({books});
    }

    render({books, errors}) {
        return <Marker type="sequence" name="books">
            <h2>Books</h2>
            {get(errors, 'errors', []).map(err => (
                <div class="flash error">{err}</div>
            ))}
            {books.map(
                ({title, author, chapters, date_published}, idx) => (
                    <Book
                        title={title}
                        chapters={chapters}
                        author={author}
                        date_published={date_published}
                        onRemoveBook={
                            books.length === 1 ?
                            null : this.removeBook.bind(this, idx)
                        }
                        onChange={this.updateBook.bind(this, idx)}
                        errors={get(errors, ['child_errors', idx], {})}
                    />
                )
            )}
            <div class="text-right">
                <button
                    type="button"
                    class="btn"
                    onClick={this.addBook.bind(this)}
                >+ Add Book</button>
            </div>
        </Marker>;
    }
}
