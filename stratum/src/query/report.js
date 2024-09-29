/* Import modules. */
import PouchDB from 'pouchdb'

/* Import types. */
import ReportType from '../types/Report.js'

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
    type: new GraphQLList(ReportType),
    args: {
        height: {
            type: new GraphQLNonNull(GraphQLInt),
            description: `Retrieves all mining submissions at the specified block height.`,
        },
    },
    resolve: async (_root, _args, _ctx) => {
        /* Initialize locals. */
        let blockHeight
        let response
        let results

        /* Set height. */
        blockHeight = _args.height

        /* Validate block height. */
        if (!blockHeight) {
            return []
        }

        /* Initialize databases. */
        const sharesDb = new PouchDB(`https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/shares_${blockHeight}`)

        /* Request ALL block entries. */
        response = await sharesDb
            .allDocs({
                include_docs: true,
            })
            .catch(err => console.error(err))
        console.log('RESPONSE', response)

        /* Validate response. */
        if (!response) {
            return []
        }

        /* Parse results. */
        results = response.rows.map(_entry => {
            const doc = _entry.doc

            /* Sanitize document. */
            delete doc._id
            delete doc._rev

            /* Return document. */
            return doc
        })
        console.log('RESULTS', results)

        /* Return results. */
        return results
    },
    description: `Report on ALL shares collected for a given __Block__.`,
}
