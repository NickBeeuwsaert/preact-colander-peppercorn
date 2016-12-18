import preact from 'preact';
import Component from '../component';
import ErrorList from './ErrorList';
import {Marker} from './peppercorn';
import {get} from '../utils';

export default class Chapter extends Component {
    render({
        title,
        onRemoveChapter, 
        errors
    }) {
        return <Marker type="mapping" class="chapter-section">
            {get(errors, 'errors', []).map(err => (
                <div class="flash error">{err}</div>
            ))}
            <div class="form-group">
                <label>Chapter Title</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    class="form-control"
                    onInput={this.handleInput.bind(this)}
                />
                <ErrorList
                    {...get(errors, 'child_errors.title')}
                />
            </div>
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
