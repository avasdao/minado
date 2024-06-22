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

export default new GraphQLObjectType({
    name: 'Asset',
    fields: () => ({
        assetid: { type: GraphQLString },
        ownerid: { type: GraphQLString },
        chainid: { type: GraphQLString },
        amount: { type: GraphQLInt },
        createdAt: { type: GraphQLInt },
    }),
    description: `An __Asset__ description goes here.`,
})
