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

export default {
    type: GraphQLString,
    // args: ...,
    resolve: (_root, args, ctx) => {
        // Datastore logic lives in blockchainController
        // return blockchainController.broadcast(args)
        console.log('SUBMISSION PARAMS:', params)
        return 'Candidate submitted successfully!'
    },
    description: `Manage a Candidate Submission for a miner.`,
}
