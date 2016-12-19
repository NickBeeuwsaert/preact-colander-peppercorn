import preact from 'preact';

import Component from '../component';
import FormControl from './FormControl';
import Flash from './Flash';
import {Marker} from './peppercorn';
import {get} from '../utils.js';

export default class Chapter extends Component {
  render({
    title,
    onRemoveChapter, 
    errors: {
      errors=[],
      children: child_errors={}
    }
  }) {
    return <Marker type="mapping" class="chapter-section">
      {errors.map(err => <Flash type="error">{err}</Flash>)}
      <FormControl
        label="Chapter Title" name="title" value={title}
        onInput={this.handleInput.bind(this)}
        errors={get(child_errors, 'title.errors')}
      />
      <div class="text-right">
        <button
          type="button" disabled={!onRemoveChapter} class="btn"
          onClick={onRemoveChapter}
        >&minus; Remove Chapter</button>
      </div>
    </Marker>;
  }
}
