import { vi, describe, beforeEach, it, expect, afterEach } from 'vitest';

import { booksRepository } from '@/api';

import { BooksStore } from './store';

vi.mock('@/api', () => ({
  booksRepository: {
    getBooks: vi.fn(),
    addBook: vi.fn(),
  },
}));

describe('BooksStore', () => {
  let store: BooksStore;

  beforeEach(() => {
    vi.useFakeTimers();
    store = new BooksStore();

    (booksRepository.getBooks as ReturnType<typeof vi.fn>).mockReset();
    (booksRepository.addBook as ReturnType<typeof vi.fn>).mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with default values', () => {
    expect(store.books).toEqual([]);
    expect(store.initialLoading).toBe(true);
    expect(store.isLoading).toBe(false);
    expect(store.isSuccess).toBe(false);
  });

  it('loads books with getBooks()', async () => {
    const mockedBooks = [
      { id: '1', name: 'Test', author: 'Author', ownerId: 'someone' },
      { id: '2', name: 'Test2', author: 'Author2', ownerId: 'fedosieiev' },
    ];
    (booksRepository.getBooks as ReturnType<typeof vi.fn>).mockResolvedValue(mockedBooks);

    await store.getBooks();

    expect(booksRepository.getBooks).toHaveBeenCalled();
    expect(store.books).toEqual(mockedBooks);
    expect(store.initialLoading).toBe(false);
    expect(store.isLoading).toBe(false);
  });

  it('does not load books if already present', async () => {
    const mockedBooks = [
      { id: 1, name: 'Test', author: 'Author', ownerId: 'someone' },
      { id: 2, name: 'Test2', author: 'Author2', ownerId: 'fedosieiev' },
    ];
    store.setBooks(mockedBooks);

    await store.getBooks();

    expect(booksRepository.getBooks).not.toHaveBeenCalled();
  });

  it('does not call getBooks() when isLoading === true', async () => {
    store.setIsLoading(true);

    await store.getBooks();

    expect(booksRepository.getBooks).not.toHaveBeenCalled();
  });

  it('calls getBooks with forceLoad even when isLoading === true', async () => {
    store.setIsLoading(true);

    (booksRepository.getBooks as ReturnType<typeof vi.fn>).mockResolvedValue([]);

    await store.getBooks(true);

    expect(booksRepository.getBooks).toHaveBeenCalled();
  });

  it('computes privateBooks correctly', () => {
    store.setBooks([
      { id: 1, name: 'A', author: 'X', ownerId: 'abc' },
      { id: 2, name: 'B', author: 'Y', ownerId: 'fedosieiev' },
    ]);

    expect(store.privateBooks).toEqual([
      { id: 2, name: 'B', author: 'Y', ownerId: 'fedosieiev' },
    ]);
  });

  it('adds a book successfully', async () => {
    const newBook = { name: 'New Book', author: 'John' };

    (booksRepository.addBook as ReturnType<typeof vi.fn>).mockResolvedValue(true);
    (booksRepository.getBooks as ReturnType<typeof vi.fn>).mockResolvedValue([
      { id: 123, name: newBook.name, author: newBook.author, ownerId: 'fedosieiev' },
    ]);

    await store.addBook(newBook);

    expect(booksRepository.addBook).toHaveBeenCalledWith({
      ...newBook,
      ownerId: 'fedosieiev',
    });

    expect(store.books.length).toBe(1);
    expect(store.isSuccess).toBe(true);

    vi.runAllTimers();
    expect(store.isSuccess).toBe(false);
  });

  it('does not call getBooks if addBook fails', async () => {
    (booksRepository.addBook as ReturnType<typeof vi.fn>).mockResolvedValue(false);

    await store.addBook({ name: 'Fail Book', author: 'Nobody' });

    expect(store.isSuccess).toBe(false);
    expect(booksRepository.getBooks).not.toHaveBeenCalled();
  });
});
