# PaginateJS
A simple JS class to paginate arrays
<br><br>
#### Basic example
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

// gives you [[1,2,3], [4,5,6], [7,8,9], [10,11,12], [13]]
let chunked_list = pagination.chunkList()
```
