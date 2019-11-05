let Chunk = require('./Chunk')

class Pagination {

    /**
     * @param {Array} list
     * @param {Number} perPage
     */
    constructor(list = [], perPage = 10) {
        this.list = list
        this.perPage = perPage

        this._offset = 0
        this._page_number = 1
    }

    /**
     * @returns {Number}
     */
    count() {
        return this._list.length
    }

    countLastPage() {
        return this.count() - (this._perPage * (this.nbPages - 1))
    }

    /**
     * @returns {boolean}
     */
    hasMore() {
        return this._page_number < this.nbPages
    }

    /**
     * @returns {Pagination}
     */
    prevPage() {
        return this.goToPage(this._page_number -= 1)
    }

    /**
     * @returns {Pagination}
     */
    nextPage() {
        return this.goToPage(this._page_number += 1)
    }

    /**
     * @returns {Pagination}
     */
    firstPage() {
        return this.goToPage(1)
    }

    /**
     * @returns {Pagination}
     */
    lastPage() {
        return this.goToPage(this.nbPages)
    }

    /**
     * Get paginated chunk of the list
     *
     * @param {Boolean} to_array
     * @returns {Chunk|Array}
     */
    getPaginated(to_array = false) {
        let list = this._perPage >= this.count()
            ? this._list
            : this._list.slice(this._offset, this._offset + this._perPage)

        return to_array ? list : new Chunk(list)
    }

    /**
     * @param {Number|String} page_number
     * @returns {Pagination}
     */
    goToPage(page_number) {
        if (!page_number)
            throw new Error('[Err] Pagination.goToPage - page_number argument must be defined')

        if (page_number.constructor !== Number && page_number.constructor !== String)
            throw new Error('[Err] Pagination.goToPage - page_number argument must be a number')

        if (page_number.constructor === String)
            page_number = parseInt(page_number, 10)

        if (page_number <= 0)
            page_number = 1

        if (page_number > this.nbPages)
            page_number = this.nbPages

        this._page_number = page_number
        this._offset = this._perPage * (this._page_number - 1)

        return this
    }

    /**
     * Reset pagination
     *
     * @returns {Pagination}
     */
    reset() {
        this._offset = 0
        this._page_number = 1

        return this
    }

    /**
     * Returns a chunked array or page indexed object of the list
     *
     * @param {Boolean} indexed_by_page
     * @param {Boolean} to_array
     * @returns {Object|Chunk|Array}
     */
    chunkList(indexed_by_page = false, to_array = false) {
        let chunk_list = {}

        this.firstPage()
        chunk_list[this.pageNumber] = this.getPaginated(to_array)

        while (this.hasMore()) {
            this.nextPage()
            chunk_list[this.pageNumber] = this.getPaginated(to_array)
        }

        if (!indexed_by_page) {
            chunk_list = Object.values(chunk_list)
            return to_array ? chunk_list : new Chunk(chunk_list)
        }

        return chunk_list
    }

    /**
     * @returns {Number}
     */
    get pageNumber() {
        return this._page_number
    }

    /**
     * @returns {Number}
     */
    get nbPages() {
        return Math.ceil(this.count() / this._perPage)
    }

    /**
     * @returns {Array}
     */
    get list() {
        return this._list
    }

    /**
     * @returns {Number}
     */
    get perPage() {
        return this._perPage
    }

    /**
     * @param {Array} list
     * @returns {Pagination}
     */
    set list(list) {
        if (!Array.isArray(list))
            throw new Error('[Err] Pagination.constructor - list argument must be a valid JavaScript Array')

        this._list = list
        return this
    }

    /**
     * @param {Number} perPage
     * @returns {Pagination}
     */
    set perPage(perPage) {
        if (perPage.constructor !== Number && perPage.constructor !== String && isNaN(perPage))
            throw new Error('[Err] Pagination.perPage property setter - perPage argument must be a number')

        if (perPage.constructor === String)
            perPage = parseInt(perPage, 10)

        this._perPage = Math.abs(perPage)
        return this
    }

}

module.exports = Pagination
