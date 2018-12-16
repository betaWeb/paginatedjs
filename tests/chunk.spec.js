const Chunk = require('../src/Chunk')

beforeAll(() => this.chunk = new Chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]));

test('Test chunk count', () => {
    expect(this.chunk.count()).toEqual(13)
});

test('Test chunk is empty', () => {
    expect(this.chunk.empty()).toEqual(false)
});

test('Test chunk is not empty', () => {
    expect(this.chunk.notEmpty()).toEqual(true)
});

test('Test first element', () => {
    expect(this.chunk.first()).toEqual(1)
});

test('Test last element', () => {
    expect(this.chunk.last()).toEqual(13)
});

test('Test nth element', () => {
    expect(this.chunk.nth(10)).toEqual(10)
});

test('Test contains value', () => {
    expect(this.chunk.contains(9)).toEqual(true)
});

test('Test toArray method', () => {
    expect(this.chunk.toArray()).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]))
});

test('Test paginate method', () => {
    const Pagination = require('../src/Pagination')
    const pagination = this.chunk.paginate(2)
    expect(pagination.constructor).toEqual(Pagination)
    expect(pagination.nbPages).toEqual(7)
});

test('Test only method', () => {
    const chunk = new Chunk([{id: 1, name: 'a', age: 32}, {id: 2, name: 'b', age: 27}, {id: 3, name: 'c', age: 68}])
    expect(chunk.only(['id', 'name']).toArray()).toEqual(expect.arrayContaining([{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]))
});

afterAll(() => this.chunk = null);