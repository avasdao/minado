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
    name: 'Miner',
    fields: () => ({
        field1: { type: GraphQLString },
        field2: { type: GraphQLInt },
        field3: { type: GraphQLInt },
    }),
    description: `A __Miner__ is device performing proof-of-work (PoW) operations to solve a mathematical puzzle.`,
})
