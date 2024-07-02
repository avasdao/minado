/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const stratumDb = new PouchDB('./data')

/* Import types. */
// import Type from '../types/Type.js'

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
    // type: new GraphQLList(AffiliateType),
    type: new GraphQLList(GraphQLString),
    // type: GraphQLString,
    args: {
        height: {
            type: GraphQLInt,
            description: `Retrieves all mining submissions at the specified block height.`,
        },
    },
    resolve: async (_root, args, ctx) => {
        console.log('REPORT ARGS:', args)

        /* Initialize locals. */
        let results

        results = await stratumDb.allDocs()
            .catch(err => console.error)
        console.log('STRATUM DB RESULTS', results)

        // TODO Validate results.

        // results = results.rows
        results = results.rows.map(_entry => {
            return JSON.stringify(_entry, null, 2)
        })

        return results
    },
    description: `Blank description goes here.`,
}
