import preact from 'preact';

import Component from '../component';
import Chapters from './Chapters';
import ErrorList from './ErrorList';
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
                <div class="form-group">
                    <label>Book Title</label>
                    <input
                        type="text"
                        name="title"
                        class="form-control"
                        value={title}
                        onInput={this.handleInput.bind(this)}
                    />
                    <ErrorList
                        {...get(errors, 'child_errors.title')}
                    />
                </div>
                <div class="form-group">
                    <label>Author</label>
                    <input
                        type="text"
                        name="author"
                        class="form-control"
                        value={author}
                        onInput={this.handleInput.bind(this)}
                    />
                    <ErrorList
                        {...get(errors, 'child_errors.author')}
                    />
                </div>
                <div class="form-group">
                    <label>Date Published</label>
                    <input
                        type="text"
                        name="date_published"
                        class="form-control"
                        value={date_published}
                        onInput={this.handleInput.bind(this)}
                    />
                    <ErrorList
                        {...get(errors, 'child_errors.date_published')}
                    />
                </div>
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