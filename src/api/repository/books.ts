import type { CreateBookDto } from '../../types/dto';
import type { Book } from '../../types/general';

import { ApiGateway } from '../gateway';

class BooksRepository {
    private httpGateway: ApiGateway;

    constructor() {
        this.httpGateway = new ApiGateway();
    }

    async getBooks() {
        const booksDto = await this.httpGateway.get<Book[]>("/");

        return booksDto;
    };

    async getPrivateBooks() {
        const booksDto = await this.httpGateway.get<Book[]>("/private");

        return booksDto;
    }

    async addBook(values: CreateBookDto) {
        const bookAddDto = await this.httpGateway.post<CreateBookDto, { status: string }>("/", values);

        return bookAddDto?.status === "ok" ? true : false;
    };
}

export const booksRepository = new BooksRepository();
