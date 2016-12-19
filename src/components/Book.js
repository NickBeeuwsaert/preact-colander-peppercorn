import preact from 'preact';

import Component from '../component';
import Chapter from './Chapter';
import FormControl from './FormControl';
import {Marker} from './peppercorn';
import {get} from '../utils';
import defaults from '../defaultState';


export default class Book extends Component {
  removeChapter(idx) {
    let {chapters} = this.props;

    chapters.splice(idx, 1);
    this.props.onChange({chapters});
  }

  updateChapter(idx, newChapter) {
    let {chapters} = this.props,
        oldChapter = chapters[idx];

    chapters.splice(idx, 1, {
      ...oldChapter,
      ...newChapter
    });
    this.props.onChange({chapters});
  }

  addChapter() {
    let {chapters} = this.props;

    chapters.push(defaults.chapter);
    this.props.onChange({chapters});
  }

  render({
    chapters=[], author, date_published, title,
    onRemoveBook,
    errors
  }) {
    return <Marker type="mapping" class="book-section">
      {get(errors, 'errors', []).map(err => <div class="flash error">{err}</div>)}
      <FormControl
        label="Book Title"
        name="title"
        value={title}
        onInput={this.handleInput.bind(this)}
        errors={get(errors, 'child_errors.title.errors')}
      />
      <FormControl
        label="Author"
        name="author"
        value={author}
        onInput={this.handleInput.bind(this)}
        errors={get(errors, 'child_errors.author.errors')}
      />
      <FormControl
        label="Date Published"
        name="date_published"
        value={date_published}
        onInput={this.handleInput.bind(this)}
        errors={get(errors, 'child_errors.date_published.errors')}
      />
      <h3>Chapters</h3>
      {get(errors, 'child_errors.chapters.errors', []).map(err => <div class="flash error">{err}</div>)}
      <Marker type="sequence" name="chapters">
        {chapters.map(({title}, idx) => <Chapter
          title={title}
          onRemoveChapter={chapters.length > 1 ? this.removeChapter.bind(this, idx) : null}
          onChange={this.updateChapter.bind(this, idx)}
          errors={get(errors, ['child_errors', 'chapters', 'child_errors', idx, 'errors'], [])}
        />)}
      </Marker>
      <div class="text-right">
        <button
          type="button"
          class="btn"
          onClick={this.addChapter.bind(this)}
        >+ Add Chapter</button>
        <button
          type="button"
          class="btn"
          disabled={!onRemoveBook}
          onClick={onRemoveBook}
        >&minus; Remove Book</button>
      </div>
    </Marker>;
  }
}