import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: any = [];

  constructor(
    private bookService: BooksService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bookService.getBooks()
      .subscribe((response: any)=> {
        this.books = JSON.parse(JSON.stringify(response)).result;
      });
  }

  deleteBook(bookId: any) {

    var x = prompt(`Type 'yes' to delete`)
    if(x == 'yes') {
      this.bookService.deleteBook(bookId)
        .subscribe({
          next: (response: any)=> {
            if(response.success) {
              alert(`Deleted Successfully!`);
              this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
                this.router.navigate(['books']); //Workaround to reload the component
              });     
            } else {
              alert(response.result);
            }         
          },
          error: (error: any)=> {
            if(error.error.error == `invalid token` || error.error.error == `jwt malformed`) {
              alert('You are not authorized. Please Sign Out & Sign In to delete books.')
            } else {
              alert(`Unknown error during deletion`);
              console.log(error);            
            }
          }
        });
    } else {
      alert(`type 'yes'`);
    }
  }

  updateBook(bookId: any) {
    sessionStorage.setItem(`bookId`, bookId);
    this.router.navigate(['/editbook']);
  }

}
