import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  heading = '';
  book = {
    title: '',
    author: '',
    language: '',
    imageUrl: '',
    about: '',
  }

  constructor(
    private bookService: BooksService, 
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private formbuilder: FormBuilder
  ) { }

  addBookForm = this.formbuilder.group({
    bookTitleField: ['', Validators.required],
    bookAuthorField: ['', Validators.required],
    bookLanguageField: [''],
    bookImageUrlField: [''],
    aboutBookField: [''],
  });

  ngOnInit(): void {

    if(this.route.snapshot.data['edit']) {
      this.heading = 'Update';
      this.title.setTitle(`Edit Book - Pustakam App`);

      var bookId = sessionStorage.getItem('bookId');
      this.bookService.getBook(bookId)
        .subscribe({
          next: (data: any)=> {
            this.book = data.response
          },
          error: (error: any)=> {
            console.log(error);
          }
        });
    } else {
      this.heading = 'Add New';
      this.title.setTitle(`Add New Book - Pustakam App`);
    }

  }

  enterBook() {
    if(!this.route.snapshot.data['edit']) { // call edit operation if the edit is true
      this.addNewBook();
    } else {
      this.updateBook();
    }
  }

  addNewBook() {
    this.bookService.addBook(this.book)
      .subscribe({
        next: (response: any)=> {
          // console.log(response); 
          if(response.success) {
            alert(`New Book Added Successfully!`);
            this.router.navigate(['books']);
          } else {
            console.log(response.result);
          }         
        },
        error: (error: any)=> {
          if(error.error.error == `invalid token` || error.error.error == `jwt malformed`) {
            alert('You are not authorized. Please Sign Out & Sign In to add books.')
            this.router.navigate(['books']);
          } else {
            alert(`Unknown error during addition`);
            console.log(error);            
          }
        }
      });
  }

  updateBook() {
    this.bookService.updateBook(this.book)
      .subscribe({
        next: (data: any)=> {
          if(data.success) {
            alert(data.result);
            this.router.navigate(['books']);
          } 
        }, 
        error: (error: any)=> {
          if(error.error.error == `invalid token` || error.error.error == `jwt malformed`) {
            alert('You are not authorized. Please Sign Out & Sign In to update books.')
            this.router.navigate(['books']);
          } else {
            alert(`Unknown error during updation`);
            console.log(error);            
          }
        }
      });
  }

}
