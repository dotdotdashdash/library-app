import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiServerURL } from './globals';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getBook(bookId: any) {
    return this.http.get(`${apiServerURL}/books/${bookId}`);
  }

  getBooks() {
    return this.http.get(`${apiServerURL}/books`);
  }

  addBook(book: any) {
    return this.http.post(`${apiServerURL}/books/add`, book);
  }

  deleteBook(bookId: any) {
    return this.http.delete(`${apiServerURL}/books/delete/${bookId}`);
  }

  updateBook(book: any) {
    return this.http.put(`${apiServerURL}/books/update`, book);
  }

}
