import preact from 'preact';

import Component from '../component';
import Chapter from './Chapter';
import Flash from './Flash';
import FormControl from './FormControl';
import defaults from '../defaultState';
import {Marker} from './peppercorn';
import {get} from '../utils';


export default class Book extends Component {
  removeChapter(idx) {
    let {chapters, onChange} = this.props;

    chapters.splice(idx, 1);
    onChange({chapters});
  }

  updateChapter(idx, newChapter) {
    let {chapters, onChange} = this.props,
        oldChapter = chapters[idx];

    chapters.splice(idx, 1, {...oldChapter, ...newChapter});
    onChange({chapters});
  }

  addChapter() {
    let {chapters, onChange} = this.props;

    chapters.push(defaults.chapter);
    onChange({chapters});
  }

  render({
    chapters=[], author, date_published, title,
    onRemoveBook,
    errors: {
      errors=[],
      children: child_errors={}
    }
  }) {
    return <Marker type="mapping" class="book-section">
      {errors.map(err => <Flash type="error">{err}</Flash>)}
      <FormControl
        label="Book Title" name="title" value={title}
        onInput={this.handleInput.bind(this)}
        errors={get(child_errors, 'title.errors', [])}
      />
      <FormControl
        label="Author" name="author" value={author}
        onInput={this.handleInput.bind(this)}
        errors={get(child_errors, 'author.errors', [])}
      />
      <FormControl
        label="Date Published" name="date_published" value={date_published}
        onInput={this.handleInput.bind(this)}
        errors={get(child_errors, 'date_published.errors', [])}
      />
      <h3>Chapters</h3>
      {get(child_errors, 'chapters.errors', []).map(
        err => <Flash type="error">{err}</Flash>
      )}
      <Marker type="sequence" name="chapters">
        {chapters.map(({title}, idx) => (
          <Chapter
            title={title}
            onRemoveChapter={
              chapters.length > 1 ?
              this.removeChapter.bind(this, idx) :
              null
            }
            onChange={this.updateChapter.bind(this, idx)}
            errors={get(child_errors, ['chapters', 'children', idx], [])}
          />
        ))}
      </Marker>
      <div class="text-right">
        <button
          type="button" class="btn"
          onClick={this.addChapter.bind(this)}
        >+ Add Chapter</button>
        <button
          type="button" class="btn" disabled={!onRemoveBook}
          onClick={onRemoveBook}
        >&minus; Remove Book</button>
      </div>
    </Marker>;
  }
}