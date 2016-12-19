import preact from 'preact';

import Component from '../component';
import FormControl from './FormControl';
import Book from './Book';
import {get} from '../utils';
import defaults from '../defaultState';
import {Marker} from './peppercorn.js';

let defaultBookList = defaults.bookList;

export default class Form extends Component {
  constructor(props) {
    super();
    let {books, name} = {
      ...defaultBookList,
      ...props
    };

    this.state = {books, name};
  }

  addBook() {
    let {books} = this.state;
    books.push(defaults.book);
    this.setState({books});
  }

  updateBook(idx, newBook) {
    let {books} = this.state,
        oldBook = books[idx];
    books.splice(idx, 1, {
      ...oldBook,
      ...newBook
    });
    this.setState({books});
  }

  removeBook(idx) {
    let {books} = this.state;
    books.splice(idx, 1);
    this.setState({books});
  }

  render({
    method='POST', action='',
    errors
  }, {books, name}) {
    return <form method={method} action={action}>
      <h1>Book list</h1>
      {get(errors, 'errors', []).map(err => <div class="flash error">{err}</div>)}
      <FormControl
        label="List Name"
        name="name"
        value={name}
        onInput={this.linkState('name')}
        errors={get(errors, 'child_errors.name.errors')}
      />
      <h2>Books</h2>
      <Marker type="sequence" name="books">
        {get(errors, 'child_errors.books.errors', []).map(err => <div class="flash error">{err}</div>)}
        {books.map(({title, author, chapters, date_published}, idx) => <Book
          title={title}
          chapters={chapters}
          author={author}
          date_published={date_published}
          onRemoveBook={books.length > 1 ? this.removeBook.bind(this, idx) : null}
          onChange={this.updateBook.bind(this, idx)}
          errors={get(errors, ['child_errors', 'books', 'child_errors', idx], {})}
        />)}
      </Marker>
      <div class="text-right">
        <button
            class="btn"
            type="button"
            onClick={this.addBook.bind(this)}
        >+ Add Book</button>
        <button
            class="btn primary"
            type="submit"
        >&#x2713; Create list</button>
      </div>
    </form>;
  }
}
