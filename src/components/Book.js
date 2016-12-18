import preact from 'preact';

import Component from '../component';
import Chapters from './Chapters';
import FormControl from './FormControl';
import {Marker} from './peppercorn';
import {get} from '../utils';

export default class Book extends Component {
    render({
        chapters, author, date_published, title,
        onRemoveBook,
        errors
    }) {
        return (
            <Marker type="mapping" class="book-section">
                {get(errors, 'errors', []).map(err => (
                    <div class="flash error">{err}</div>
                ))}
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
                <Chapters
                    chapters={chapters}
                    onChange={this.props.onChange}
                    errors={get(errors, 'child_errors.chapters')}
                />
                <div class="text-right">
                    <button
                        type="button"
                        class="btn"
                        disabled={!onRemoveBook}
                        onClick={onRemoveBook}
                    >&minus; Remove Book</button>
                </div>
            </Marker>
        );
    }
}