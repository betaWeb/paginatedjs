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

    /**
     * Get nth element (begins to 1)
     *
     * @param {Number} n
     * @returns {*|null}
     */
    nth(n) {
        return this._chunk[n - 1] || null
    }

    /**
     * Returns true if list contains value passed as argument, false otherwise
     *
     * @param {*} value
     * @returns {boolean}
     */
    contains(value) {
        return this._chunk.includes(value)
    }

    /**
     * Get chunked list only with keys passed as arguments
     * Works only with array of objects
     *
     * @returns {Chunk}
     */
    only(args = []) {
        if (!Array.isArray(args) && args.constructor !== String)
            throw new Error('[Err] Chunk.only - args argument must be a valid JavaScript Array or string')

        if (args.constructor === String)
            args = [args]

        let list = []

        if (args.length) {
            this._chunk.forEach(item => {
                let o = {}
                args.forEach(v => {
                    if (item[v])
                        o[v] = item[v]
                })
                list.push(o)
            })
        }

        return new Chunk(list)
    }

    /**
     * Returns chunked list as an array
     *
     * @returns {Array}
     */
    toArray() {
        return this._chunk
    }

    /**
     * Paginate the chunked list
     *
     * @param {Number} perPage
     * @returns {Pagination}
     */
    paginate(perPage) {
        const Pagination = require('./Pagination')
        return new Pagination(this._chunk, perPage)
    }

}

module.exports = Chunk