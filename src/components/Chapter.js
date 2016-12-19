import preact from 'preact';
import Component from '../component';
import FormControl from './FormControl';
import {Marker} from './peppercorn';
import {get} from '../utils.js';

export default class Chapter extends Component {
  render({
    title,
    onRemoveChapter, 
    errors: {
      errors=[],
      child_errors={}
    }
  }) {
    return <Marker type="mapping" class="chapter-section">
      {errors.map(err => <div class="flash error">{err}</div>)}
      <FormControl
        label="Chapter Title"
        name="title"
        value={title}
        onInput={this.handleInput.bind(this)}
        errors={get(child_errors, 'title.errors')}
      />
      <div class="text-right">
        <button
          type="button"
          onClick={onRemoveChapter}
          disabled={!onRemoveChapter}
          class="btn"
        >&minus; Remove Chapter</button>
      </div>
    </Marker>;
  }
}
