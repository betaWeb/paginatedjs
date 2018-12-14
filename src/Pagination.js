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
     * Get paginated part of array
     *
     * @returns {Array}
     */
    getPaginated() {
        if (this._perPage >= this.count())
            return this._list

        return this._list.slice(this._offset, this._offset + this._perPage)
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
     * @param indexed_by_page
     * @returns {Object|Array}
     */
    chunkList(indexed_by_page = false) {
        let chunk_list = null

        if (indexed_by_page) {
            chunk_list = {}

            this.firstPage()
            chunk_list[this.pageNumber] = this.getPaginated()

            while(this.hasMore()) {
                this.nextPage()
                chunk_list[this.pageNumber] = this.getPaginated()
            }
        } else {
            chunk_list = []

            chunk_list.push(this.firstPage().getPaginated())

            while(this.hasMore())
                chunk_list.push(this.nextPage().getPaginated())
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
