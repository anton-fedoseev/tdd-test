import { observable, flow, action, computed } from 'mobx';

const OWNER_ID = import.meta.env.VITE_OWNER_ID;

import type { Book } from '@/types/general';
import type { CreateBookDto } from '@/types/dto';
import { booksRepository } from '@/api';

export class BooksStore {
    @observable
    accessor books: Book[] = [];

    @observable
    accessor initialLoading: boolean = true;

    @observable
    accessor isLoading: boolean = false;

    @observable
    accessor isSuccess: boolean = false;

    @computed
    get privateBooks() {
        return this.books.filter(book => book.ownerId === 'fedosieiev');
    }

    @action
    setBooks(books: Book[]) {
        this.books = books;
    }

    @action
    setInitialLoading(loading: boolean) {
        this.initialLoading = loading;
    }

    @action
    setIsLoading(loading: boolean) {
        this.isLoading = loading;
    }

    @action
    setIsSuccess(success: boolean) {
        this.isSuccess = success;
    }

    @flow.bound
    *getBooks(forceLoad?: boolean) {
        if (this.isLoading && !forceLoad) {
            return;
        }

        if ((!this.books.length || forceLoad)) {
            this.setIsLoading(true);

            const books: Book[] = yield booksRepository.getBooks();

            this.setBooks(books);
        }

        this.setInitialLoading(false);
        this.setIsLoading(false);
    }

    @flow.bound
    *addBook(value: Pick<CreateBookDto, 'author' | 'name'>) {
        this.setIsLoading(true);

        const result: boolean = yield booksRepository.addBook({ ...value, ownerId: OWNER_ID });

        if (result) {
            yield this.getBooks(true);

            this.setIsSuccess(true);

            setTimeout(() => {
                this.setIsSuccess(false);
            });
        }

        this.setIsLoading(false);
    }
}

export const booksStore = new BooksStore();
