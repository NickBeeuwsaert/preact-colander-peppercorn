import preact from 'preact';
import ChapterForm from './ChapterForm';
import {Marker} from './peppercorn';

export default class Book extends preact.Component {

    get handleChange() {
        return this.props.onChange;
    }

    changeTitle({target: {value: title}}) {
        this.handleChange({...this.props, title});
    }

    updateChapters({chapters}) {
        this.handleChange({...this.props, chapters});
    }

    render({onRemoveBook, chapters, title}) {
        return (
            <Marker type="mapping" class="book-section">
                <button type="button" onClick={onRemoveBook}>Remove Book</button>
                <div class="form-group">
                    <label>Book Title</label>
                    <input
                        type="text"
                        name="title"
                        class="form-control"
                        value={title}
                        onInput={this.changeTitle.bind(this)}
                    />
                </div>
                <ChapterForm chapters={chapters} onChange={this.updateChapters.bind(this)}/>
            </Marker>
        );
    }
}