class Pagination {

    constructor(list = [], perPage = 10, offset = 0) {
        this.list = list
        this.perPage = perPage
        this.offset = offset

        this._page_number = 1
    }

    count() {
        return this._list.length
    }

    hasMore() {
        return this._page_number < this.nbPages
    }

    prevPage() {
        return this.goToPage(this._page_number -= 1)
    }

    nextPage() {
        return this.goToPage(this._page_number += 1)
    }

    firstPage() {
        return this.goToPage(1)
    }

    lastPage() {
        return this.goToPage(this.nbPages)
    }

    getPaginated() {
        if (this._offset >= this.count())
            return this._list

        return this._list.slice(this._offset, this._offset + this._perPage)
    }

    goToPage(page_number) {
        if (!page_number)
            throw new Error('[Err] Pagination.goToPage - page_number argument must be defined')

        if (page_number.constructor !== Number && page_number.constructor !== String)
            throw new Error('[Err] Pagination.goToPage - page_number argument must be a number')

        if (page_number.constructor === String)
            page_number = parseInt(page_number, 10)

        if (page_number <= 0)
            page_number = 1;

        if (page_number > this.nbPages)
            page_number = this.nbPages;

        this._page_number = page_number
        this._offset = this._perPage * (this._page_number - 1)

        return this
    }

    chunkList(indexed_by_page = false) {
        let chunk_list = null;

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

    get pageNumber() {
        return this._page_number
    }

    get nbPages() {
        return Math.ceil(this.count() / this._perPage)
    }

    get list() {
        return this._list
    }

    get perPage() {
        return this._perPage
    }

    get offset() {
        return this._offset
    }

    set list(list) {
        if (!Array.isArray(list))
            throw new Error('[Err] Pagination.constructor - list argument must be a valid JavaScript Array')

        this._list = list
        return this
    }

    set perPage(perPage) {
        if (perPage.constructor !== Number && perPage.constructor !== String && isNaN(perPage))
            throw new Error('[Err] Pagination.perPage property setter - perPage argument must be a number')

        if (perPage.constructor === String)
            perPage = parseInt(perPage, 10)

        this._perPage = Math.abs(perPage)
        return this
    }

    set offset(offset) {
        if (offset.constructor !== Number && offset.constructor !== String && isNaN(offset))
            throw new Error('[Err] Pagination.offset property setter - offset argument must be a number')

        if (offset.constructor === String)
            offset = parseInt(offset, 10)

        this._offset = Math.abs(offset)
        return this
    }

}

module.exports = Pagination
