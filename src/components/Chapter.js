import preact from 'preact';
import {Marker} from './peppercorn';

export default class Chapter extends preact.Component {
    get handleChange() {
        return this.props.onChange;
    }

    changeTitle(e) {
        this.handleChange({
            title: e.target.value
        });
    }


    render({onRemoveChapter, title}) {
        return <Marker type="mapping" class="chapter-section">
            <button type="button" onClick={onRemoveChapter}>
                Remove Chapter
            </button>
            <div class="form-group">
                <label>Chapter Title</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    class="form-control"
                    onInput={this.changeTitle.bind(this)}
                />
            </div>
        </Marker>;
    }
}