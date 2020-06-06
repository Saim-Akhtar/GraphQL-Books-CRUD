const data=require('../db/data')
let {books}=data

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
    }
}