/* Import types. */
import MinerType from '../types/Miner.js'

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

export default (_pubsub) => ({
    type: MinerType,
    subscribe: () => _pubsub.asyncIterator(['NEW_ACTIVITY']),
    description: `A Miner subscription will report every new acivity that occurs by a miner.`,
})
