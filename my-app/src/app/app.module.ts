import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';  // This is the root component
import { TodoListComponent } from './todo-list/todo-list.component';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes'; 
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent   // Register TodoComponent here
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)  // Add routing configuration here
  ],
  providers: [],
  bootstrap: [AppComponent]  // Bootstraps the root component
})
export class AppModule { }
