import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLSchema,
    GraphQLString,
} from 'graphql'

const GeoPoint = new GraphQLInputObjectType({
    name: 'GeoPoint',
    fields: {
        affiliateid: { type: GraphQLString },
    }
})

export default {
    type: GraphQLString,
    // args: ...,
    resolve: (_root, args, ctx) => {
        // Datastore logic lives in blockchainController
        // return blockchainController.broadcast(args)
        console.log('MUTATION PARAMS:', params)
        return 'Contract managed successfully!'
    },
    description: `Manage a Contract for a miner.`,
}
