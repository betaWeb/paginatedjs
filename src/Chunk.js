class Chunk {

    constructor(chunk = []) {
        this._chunk = chunk
    }

    count() {
        return this._chunk.length
    }

    empty() {
        return this.count() === 0
    }

    notEmpty() {
        return !this.empty()
    }

    first() {
        return this._chunk[0]
    }

    last() {
        return this._chunk[this._chunk.length - 1]
    }

    nth(index) {
        return this._chunk[index] || null
    }

    contains(value) {
        return this._chunk.indexOf(value) >= 0
    }

    toArray() {
        return this._chunk
    }

    paginate(perPage) {
        const Pagination = require('./Pagination')
        return new Pagination(this._chunk, perPage)
    }

}

module.exports = Chunk