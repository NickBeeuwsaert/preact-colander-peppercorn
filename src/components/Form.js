import preact from 'preact';

import Component from '../component';
import FormControl from './FormControl';
import Book from './Book';
import Flash from './Flash';
import defaults from '../defaultState';
import {get} from '../utils';
import {Marker} from './peppercorn.js';

export default class Form extends Component {
  addBook() {
    let {books, onChange} = this.props;
    books.push(defaults.book);
    onChange({books});
  }

  updateBook(idx, newBook) {
    let {books, onChange} = this.props,
        oldBook = books[idx];

    books.splice(idx, 1, {...oldBook, ...newBook});
    onChange({books});
  }

  removeBook(idx) {
    let {books, onChange} = this.props;
    books.splice(idx, 1);
    onChange({books});
  }

  render({
    books, name,
    method='POST', action='',
    errors: {
      errors=[],
      children: child_errors={}
    }
  }) {
    return <form method={method} action={action}>
      <h1>Book list</h1>
      {errors.map(err => <Flash type="error">{err}</Flash>)}
      <FormControl
        label="List Name" name="name" value={name}
        onInput={this.handleInput.bind(this)}
        errors={get(child_errors, 'name.errors', [])}
      />
      <h2>Books</h2>
      <Marker type="sequence" name="books">
        {get(child_errors, 'books.errors', []).map(
          err => <Flash type="error">{err}</Flash>
        )}
        {books.map(({title, author, chapters, date_published}, idx) => (
          <Book
            title={title} chapters={chapters} author={author}
            date_published={date_published}
            onRemoveBook={books.length>1?this.removeBook.bind(this, idx):null}
            onChange={this.updateBook.bind(this, idx)}
            errors={get(child_errors, ['books', 'children', idx], {})}
          />
        ))}
      </Marker>
      <div class="text-right">
        <button
          class="btn" type="button"
          onClick={this.addBook.bind(this)}
        >+ Add Book</button>
        <button class="btn primary" type="submit">&#x2713; Create list</button>
      </div>
    </form>;
  }
}
