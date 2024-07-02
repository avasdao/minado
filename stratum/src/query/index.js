/* Import modules. */
import { GraphQLObjectType } from 'graphql'

/* Import mutations. */
// import affiliate from './affiliate.js'
import asset from './asset.js'
// import hello from './hello.js'
import report from './report.js'

/* Set name. */
const name = 'Query'

/* Set (Mutation) fields. */
const fields = {
    // affiliate,
    asset,
    // hello,
    report,
}

/* Set (Mutation) description. */
const description = `
Make requests for Exchange data directly from the Nexa blockchain and our high-speed storage.
`.trim()

/**
 * Query
 *
 * Make requests for Exchagne data.
 */
export default new GraphQLObjectType({
    name,
    fields,
    description,
})
