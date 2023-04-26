let books = [];

function addBook(book){
    let table = $('#bookTable tbody');
    table.append(`<tr id="${book.id}">
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td> 
        <td>${book.year}</td>
        <td>${book.quantity}</td>
        <td>
        <button class="mb-2 btn btn-sm btn-warning editBtn" data-id="${book.id}">Edit</button>
        <button class="mb-2 btn btn-sm btn-danger deleteBtn" data-id="${book.id}">Delete</button>
        </td>
    </tr>`)
}

function clearForm(){
    $("#bookTitle").val("");
    $("#author").val("");
    $("#genre").val("");
    $("#year").val("");
    $("#quantity").val("");
}

$(document).on("click", "#clearBtn", function(){
    clearForm();
});

function generateId(){
    return Math.floor(Math.random * 1000000);
}

$("#bookForm").submit(function(e){
    e.preventDefault();
    let book={
        id: generateId(),
        title: $("#bookTitle").val(),
        author: $("#author").val(),
        genre: $("#genre").val(),
        year: $("#year").val(),
        quantity: $("#quantity").val()
    };

    books.push(book);
    addBook(book);
    clearForm();
})




$("#editForm").submit(function(e){
    e.preventDefault();
    let bookId = $("#editBookId").val();
    let bookIndexId = books.find((book)=>book.id == bookId);
    let book = books[bookIndexId];
    book.title = $("#editBookTitle").val();
    book.author = $("#editAuthor").val();
    book.genre = $("#editGenre").val();
    book.year = $("#editYear").val();
    book.quantity = $("#editQuantity").val();

    let row = $(`#${book.id}`);
    row.find("td:eq(0)").text("book.title");
    row.find("td:eq(1)").text("book.author");
    row.find("td:eq(2)").text("book.genre");
    row.find("td:eq(3)").text("book.year");
    row.find("td:eq(4)").text("book.quantity");
    $("#editModal").modal("hide");
});


$(document).on("click",".editBtn",function(){
    let bookId = $(this).dara("id");
    let bookIndex= books.findIndex((book)=>book.id==bookId);
    let book = books[bookIndex];
    
    $("#editBookTitle").val(book.title);
    $("#editBookAuthor").val(book.author);
    $("#editBookGenre").val(book.genre);
    $("#editBookYear").val(book.year);
    $("#editBookQuantity").val(book.quantity);
    $("#editBookId").val(book.id);
    $("#eidtModal").modal("show");
});

$(document).on("click","#clsBtn",function(){
    $("#editModal").modal("hide");
});


$(document).on("click",".deleteBtn",function(){
    let bookId = $(this).data("id");
    let bookIndex​​ = books.findIndex((book)=>book.id==bookId);
    let book = books[bookIndex];
    if(confirm(`Are you sure you to delete ${book.title}`)){
        books.splice(bookIndex,1);
        $(`#${book.id}`).remove();
    }
});
