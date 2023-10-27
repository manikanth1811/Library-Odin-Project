formSubmitBtn = document.querySelector('#formSubmit');

addBookForm = document.querySelector('.add-book-form');

addBookForm1 = document.querySelector('.add-book-form > form')

addBookBtn = document.querySelector('.add-book').addEventListener('click',()=>{
  addBookForm.style.display = 'flex';
});



const myLibrary = [{bookName:'Deep Work',bookAuthor:'Cal Newport',bookPages:'124',bookRead:true,bookId:1}];

let bookId = 1;

function Book(bookName,bookAuthor,bookPages,bookRead) {
  bookId++;
  this.bookName = bookName;
  this.bookAuthor = bookAuthor;
  this.bookPages = bookPages;
  this.bookRead = bookRead;
  this.bookId = bookId;
}

function addBookToLibrary(dataObject) {
  let read_or_not = true;
  if(dataObject['book-read-status']=='no'){
    read_or_not = false;
  }
  let new_book = new Book(dataObject['book-name'],dataObject['book-author'],dataObject['book-pages'],read_or_not);
  myLibrary.push(new_book);
  displayLib();
}

function deleteBook(classList){
  let index_remove = classList[1];
  for(let i = 0;i<myLibrary.length;i++){
    if(myLibrary[i].bookId==index_remove){
      myLibrary.splice(i,1);
    }
  }
  displayLib();
}

function  displayLib(){
  let booksContainer = document.querySelector('.books-container')
  booksContainer.innerHTML = '';
  for(let i = 0;i<myLibrary.length;i++){
    let article = document.createElement('article');
    article.classList.add('book',myLibrary[i].bookId);
    let pBookName = document.createElement('p');
    pBookName.innerText = myLibrary[i].bookName;
    pBookName.classList.add('name');
    let pAuthorName = document.createElement('p');
    pAuthorName.innerText = myLibrary[i].bookAuthor;
    pAuthorName.classList.add('author');
    let pPages = document.createElement('p');
    pPages.innerText = myLibrary[i].bookPages+' pages'; 
    pPages.classList.add('pages');
    let button1 = document.createElement('button');
    let bookRead = "Not Read";
    let className = "read";
    button1.classList.add('read-status');
    article.classList.add('read-book');
    if(!myLibrary[i].bookRead){
      bookRead = "Read";
      className = "not-read";
      article.classList.add('unread-book');
    }
    button1.classList.add(className);
    button1.classList.add(myLibrary[i].bookId);
    button1.innerHTML = bookRead;
    let button2 = document.createElement('button');
    button2.innerText = 'Remove';
    button2.classList.add('remove');
    button2.classList.add(myLibrary[i].bookId);
    article.appendChild(pBookName,pAuthorName,pPages,button1,button2);
    article.appendChild(pAuthorName);
    article.appendChild(pPages);
    article.appendChild(button1);
    article.appendChild(button2);
    booksContainer.appendChild(article);
  }
  let remove_buttons = document.querySelectorAll('.remove');
  remove_buttons.forEach(remove_button=>{
    remove_button.addEventListener('click',(event) => {
      deleteBook(event.target.classList);
    });
  })

  let read_status_buttons = document.querySelectorAll('.read-status');
  read_status_buttons.forEach(read_status_button => {
    read_status_button.addEventListener('click',(event)=>{
      let idx = event.target.classList[2];
      let read_status_change;
      let buttontext;
      if(event.target.classList[1]=='read'){
        read_status_change = "not-read";
        buttontext = "Read";
      }
      if(event.target.classList[1]=='not-read'){
        read_status_change = "read";
        buttontext = "Not Read";
      }
      console.log(read_status_button.parentElement.classList);
      // console.log(event.target.classList);
      for(let i = 0;i<myLibrary.length;i++){
        if(idx == myLibrary[i].bookId){
          if(read_status_change=='read'){
            myLibrary[i].bookRead = true;
          }
          else{
            myLibrary[i].bookRead = false;
          }
        }
      }

      let new_class_list = [event.target.classList[0],read_status_change,event.target.classList[2]];

      event.target.classList = [];

      for(let i = 0;i<3;i++){
        event.target.classList.add(new_class_list[i]);
      }

      event.target.innerText = buttontext;

      if(read_status_change == 'read'){
        read_status_button.parentElement.classList.remove('unread-book');
        read_status_button.parentElement.classList.add('read-book');
      }
      if(read_status_change == 'not-read'){
        read_status_button.parentElement.classList.remove('read-book');
        read_status_button.parentElement.classList.add('unread-book');
      }

    })
  })
}

function init(){
  displayLib();
}


addBookForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  const data = new FormData(event.target);
	const dataObject = Object.fromEntries(data.entries());
	addBookToLibrary(dataObject)
  addBookForm.style.display = 'none';
  addBookForm1.reset();
})


init();