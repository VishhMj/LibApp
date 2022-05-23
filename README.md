## Starting the server
    npm start

## List of APIs

1. Get All : Returns sorted list of all the books and magazines from csv file
    GET -> /all 

2. Get Books : Returns the list of books from csv file
    GET -> /books

3. Add Book : Creates books and return the book object
    POST -> /books
    Request Body -> Object with following keys:
        title, isbn, authors, description
    Note : All the keys are required!

4. Export Books : Returns csv file of books uploaded by user
    GET -> /export-books

5. Get Magazines : Returns list of magazins from csv file
    GET -> /magazines

6. Add Magazine : Creates magazine and return magazine object
    POST -> /magazines
    Request Body -> Object with the following keys :
        title, isbn, authors, publishedAt
    Note : All the keys are required!

7. Export Magazines : Returns csv file of magazines uploaded by user
    GET -> /export-magazines

8. Get Authors : return list of authors from csv file
    GET -> /authors

9. Search : Returns book and magazines based on the search parameter
    GET -> /search
    Query param -> isbn or authors(author email)
