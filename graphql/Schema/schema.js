const graphql=require('graphql')
const AuthorResolvers=require('../Resolver/AuthorResolver');
const BookResolvers = require('../Resolver/BookResolver');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType
} = graphql;


const PublishType = new GraphQLObjectType({
    name:"Publish",
    fields:()=>({
        book_publish_id:{type: new GraphQLNonNull(GraphQLID)},
        date: {type: new GraphQLNonNull(GraphQLString)},
    })
})

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields:()=>({
        id:{type: new GraphQLNonNull(GraphQLID)},
        name:{type: new GraphQLNonNull(GraphQLString)},
        books:{
            type: new GraphQLList(BookType),
            resolve:(parent,args)=>{
                return AuthorResolvers.getBooksByAuthorId(parent.id)
            }
        }
    })
})

const BookType=new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id:{type: new GraphQLNonNull(GraphQLID)},
        title:{type: new GraphQLNonNull(GraphQLString)},
        genre:{type: new GraphQLNonNull(GraphQLString)},
        author:{
            type: AuthorType,
            resolve:(parent,args)=>{
                return AuthorResolvers.getAuthorById(parent.authorId)
            }
        },
        // publish:{
        //     type: PublishType,
        //     resolve:(parent,args)=>{
        //         return resolvers.getPublishById(parent.id)
        //     }
        // }
    })
})

const RootQuery=new GraphQLObjectType({
    name:"RootQueryType",
    fields:()=>({
        book:{
            type:BookType,
            args:{ id: { type:GraphQLID} },
            resolve:(parent,args)=>BookResolvers.getBookById(args.id)
        },
        books:{
            type: new GraphQLList(BookType),
            resolve:(parent,args)=>BookResolvers.getAllBooks()
        },
        author:{
            type: AuthorType,
            args: { id: { type: GraphQLID}},
            resolve:(parent,args)=> AuthorResolvers.getAuthorById(args.id)
        },
        authors:{
            type: GraphQLList(AuthorType),
            resolve:(parent,args)=>AuthorResolvers.getAllAuthors()
        }
    })
})

const inputPublishType= new GraphQLInputObjectType({
    name:"PublishInput",
    fields:()=>({
        date:{type: new GraphQLNonNull(GraphQLString)},
    })
})

const inputAuthorType= new GraphQLInputObjectType({
    name:"AuthorInput",
    fields:()=>({
        name:{type: new GraphQLNonNull(GraphQLString)},
    })
})

const inputBookType=new GraphQLInputObjectType({
    name:"BookInput",
    fields:()=>({
        title:{type: new GraphQLNonNull(GraphQLString)},
        genre:{type: new GraphQLNonNull(GraphQLString)},
        authorId:{type: new GraphQLNonNull(GraphQLID)},
        // publish:{
        //     type: new GraphQLNonNull(inputPublishType),
        // }
    })
})

const Mutation=new GraphQLObjectType({
    name:"Mutuation",
    fields:()=>({
        addAuthor:{
            type:AuthorType,
            args:{
                input: {type: new GraphQLNonNull(inputAuthorType)}
            },
            resolve:(parent,args)=>AuthorResolvers.addAuthor(args.input)
        },
        addBook:{
            type:BookType,
            args:{
                input:{type: new GraphQLNonNull(inputBookType)}
            },
            resolve:(parent,args)=>BookResolvers.addBook(args.input)
        },
        deleteBook:{
            type:new GraphQLList(BookType),
            args:{
                id:{type: GraphQLID}
            },
            resolve:(parent,args)=>resolvers.deleteBook(args.id)
        }
    })
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});