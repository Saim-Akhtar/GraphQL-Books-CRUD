const data=require('../db/data')
let {books, authors, publishList}=data

module.exports={
    getAllBooks: ()=>{
        console.log("Returning books")
        return books
    },
    getById: id =>{
        console.log("return by id:",id)
        return books.find(b=>b.id == id)
    },
    addBook:input=>{
        books.push(input)
        return input
    },
    deleteBook:id=>{
        console.log("delete book with id:",id)
        books=books.filter(b=>b.id != id)
        return books
    },
    getAuthorById:id=>{
        console.log("Author Id: ",id)
        return authors.find(a=>a.id == id)
    },
    getPublishById:id=>{
        console.log("Publish Id: ",id)
        publish=publishList.find(p=> p.book_publish_id == id)
        console.log(publish)
        return publish
    }
}