# PaginatedJS

[![Build Status](https://travis-ci.org/betaWeb/paginatejs.svg?branch=master)](https://travis-ci.org/betaWeb/paginatejs)

A simple JS class to paginate arrays.

<br><br>

## Getting started

### Installation

You just have to download the minify js file `paginate-js.min.js`, and import it into your HTML :
```HTML
<script src="/path/to/paginate-js.min.js"></script>
``` 
That's it ! :)

### Usage

```JS
let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
let perPage = 3

let page = []
const pagination = new Pagination(list, perPage)

// gives you [1,2,3]
pagination.firstPage()
page = pagination.getPaginated(true)

// gives you [13]
pagination.lastPage()
page = pagination.getPaginated(true)

// gives you [10,11,12]
pagination.prevPage()
page = pagination.getPaginated(true)

// gives you [13]
pagination.nextPage() // next page does not exists
page = pagination.getPaginated(true)

// gives you [4,5,6]
pagination.goToPage(2)
page = pagination.getPaginated(true)

// gives you [13]
pagination.goToPage(20) // page 20 does not exists
page = pagination.getPaginated(true)

// gives you [7,8,9]
pagination.firstPage().nextPage().nextPage()
page = pagination.getPaginated(true)

// gives you [1,2,3]
pagination.reset()
page = pagination.getPaginated(true)

// gives you [[1,2,3], [4,5,6], [7,8,9], [10,11,12], [13]]
let chunked_list = pagination.chunkList()

// gives you {1: [1,2,3], 2: [4,5,6], 3: [7,8,9], 4: [10,11,12], 5: [13]}
let chunked_list = pagination.chunkList(true)
```
<br><br>

---

## API

### Pagination class

#### Properties
Nomenclature : `{Return type} Class.property`

<br>

Get the current page number
```JS
{Number} Pagination.pageNumber
```

<br>

Get the number of pages
```JS
{Number} Pagination.nbPages
```

<br>

Get the list
```JS
{Array} Pagination.list
```

<br>

Get the number of entries per page
```JS
{Number} Pagination.perPage
```
<br><br>

#### Methods
Nomenclature : `{Return type} Class.method(<(optional) arg | type>, [<(optional) arg | type>])`

<br>

Get list length
```JS
{Number} Pagination.count()
```

<br>

Returns true if pagination not ended, false otherwise
```JS
{Boolean} Pagination.hasMore()
```

<br>

Set pagination to the previous page
```JS
{Pagination} Pagination.prevPage()
```

<br>

Set pagination to the next page
```JS
{Pagination} Pagination.nextPage()
```

<br>

Set pagination to the first page
```JS
{Pagination} Pagination.firstPage()
```

<br>

Set pagination to the last page
```JS
{Pagination} Pagination.lastPage()
```

<br>

Returns chunked list compared to pagination position
Returns Chunk class instance if to_array argument is false, array otherwise
```JS
{Chunk|Array} Pagination.getPaginated(<(optional) to_array | Boolean>)
```

<br>

Set pagination to the page number passed as argument
```JS
{Pagination} Pagination.goToPage(<page_number | Number>)
```

<br>

Reset pagination
```JS
{Pagination} Pagination.reset()
```

<br>

Returns a chunked array or page indexed object of the list
```JS
{Array|Object} Pagination.chunkList(
    <(optional) indexed_by_page | Boolean>, 
    <(optional) to_array | Boolean>
)
```

<br><br>

### Chunk class

#### Methods
Nomenclature : `{Return type} Class.method(<arg | type>, [<arg | type>])`

<br>

Get count length
```JS
{Number} Chunk.count()
```

<br>

```JS
{Boolean} Chunk.empty()
```

<br>

```JS
{Boolean} Chunk.notEmpty()
```

<br>

Get the first element
```JS
{Mixed} Chunk.first()
```

<br>

Get the last element
```JS
{Mixed} Chunk.last()
```

<br>

Get nth element (begins to 1)
```JS
{Mixed} Chunk.nth(<n | Number>)
```

<br>

Returns true if list contains value passed as argument, false otherwise
```JS
{Boolean} Chunk.contains(<value | mixed>)
```

<br>

Returns chunked list as an array
```JS
{Array} Chunk.toArray()
```

<br>

Paginate the chunked list
```JS
{Pagination} Chunk.paginate(<perPage | Number>)
```
