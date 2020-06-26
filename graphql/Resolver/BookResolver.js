const { Types } = require('mongoose')
const Book = require('../db/Models/BookModel')

module.exports={
    getBookById: async(id)=>{
        console.log("Getting book by Id: ",id)
        try{
            const book = await Book.findById(id)
            if(book){
                return book
            }
            console.log("No book found")
        }
        catch(error){
            console.log("Error found")
            console.log(error.message)
        }
    },
    getAllBooks: async()=>{
        try{
            const books = await Book.find()
            if(books){
                console.log(books)
                return books
            }
        }
        catch(error){
            console.log("Error found")
            console.log(error.message)
        }
    },
    addBook: async(inputData)=>{
        console.log("Adding Book")
        try{
            const bookId = Types.ObjectId()
            const { title, genre, authorId } = inputData
            const book = new Book({
                _id: bookId,
                title,
                genre,
                authorId
            })

            const result = await book.save()
            if(result){
                return result
            }
            console.log("Failed to save")
        }
        catch(error){
            console.log("Error found")
            console.log(error.message)
        }
    }
}