import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLSchema,
    GraphQLString,
} from 'graphql'

export default {
    type: GraphQLString,
    resolve: (_root, args, ctx) => {
        console.log('BLANK PARAMS:', params)
        return 'Blank created successfully!'
    },
    description: `Blank description goes here.`,
}
