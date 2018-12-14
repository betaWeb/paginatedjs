# PaginateJS
A simple JS class to paginate arrays

<br><br>

### Getting started

---

```JS
let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
let perPage = 3

let page = []
const pagination = new Pagination(list, perPage)

// gives you [1,2,3]
pagination.firstPage()
page = pagination.getPaginated()

// gives you [13]
pagination.lastPage()
page = pagination.getPaginated()

// gives you [10,11,12]
pagination.prevPage()
page = pagination.getPaginated()

// gives you [13]
pagination.nextPage() // next page does not exists
page = pagination.getPaginated()

// gives you [4,5,6]
pagination.goToPage(2)
page = pagination.getPaginated()

// gives you [13]
pagination.goToPage(20) // page 20 does not exists
page = pagination.getPaginated()

// gives you [7,8,9]
pagination.firstPage().nextPage().nextPage()
page = pagination.getPaginated()

// gives you [1,2,3]
pagination.reset()
page = pagination.getPaginated()

// gives you [[1,2,3], [4,5,6], [7,8,9], [10,11,12], [13]]
let chunked_list = pagination.chunkList()

// gives you {1: [1,2,3], 2: [4,5,6], 3: [7,8,9], 4: [10,11,12], 5: [13]}
let chunked_list = pagination.chunkList(true)
```
<br><br>

### Usage

---

#### Properties

Get the current page number
```JS
{Number} pagination.pageNumber
```

<br>

Get the number of pages
```JS
{Number} pagination.nbPages
```

<br>

Get the list
```JS
{Array} pagination.list
```

<br>

Get the number of entries per page
```JS
{Number} pagination.perPage
```
<br><br>

#### Methods

Get list length
```JS
{Number} pagination.count()
```

<br>

Returns true if pagination not ended, false otherwise
```JS
{Boolean} pagination.hasMore()
```

<br>

Set pagination to the previous page
```JS
{Pagination} pagination.prevPage()
```

<br>

Set pagination to the next page
```JS
{Pagination} pagination.nextPage()
```

<br>

Set pagination to the first page
```JS
{Pagination} pagination.firstPage()
```

<br>

Set pagination to the last page
```JS
{Pagination} pagination.lastPage()
```

<br>

Returns list chunk compared to pagination position
```JS
{Array} pagination.getPaginated()
```

<br>

Set pagination to the page number passed as argument
```JS
{Pagination} pagination.goToPage(<page_number | Number>)
```

<br>

Reset pagination
```JS
{Pagination} pagination.reset()
```

<br>

Returns a chunked array or page indexed object of the list
```JS
{Array|Object} pagination.chunkList(<indexed_by_page | Boolean>)
```
