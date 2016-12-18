export default {
    get chapter() {
        return {
            title: ''
        };
    },
    get book() {
        return {
            title: '',
            author: '',
            chapters: [this.chapter]
        };
    },
    get bookList() {
        return {
            name: '',
            books: [this.book]
        };
    }
};
