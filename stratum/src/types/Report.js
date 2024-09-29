import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
} from 'graphql'

export default new GraphQLObjectType({
    name: 'Report',
    fields: () => ({
        minerid: { type: GraphQLString },
        candidate: { type: GraphQLString },
        nonce: { type: GraphQLString },
        nbits: { type: GraphQLString },
        createdAt: { type: GraphQLInt },
    }),
    description: `A __Report__ of ALL the shares (from a specific block) made by a miner.`,
})
