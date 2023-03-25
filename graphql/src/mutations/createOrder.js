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
    resolve: (parent, args, params) => {
        // Datastore logic lives in blockchainController
        // return blockchainController.broadcast(args)
        console.log('MUTATION PARAMS:', params)
        return 'Order created successfully!'
    },
    description: `Create a new Order for an asset exchange.`,
}
