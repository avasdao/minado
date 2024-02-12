/* Import modules. */
import { GraphQLObjectType } from 'graphql'

/* Import mutations. */
import addAffiliate from './addAffiliate.js'
import createSession from './createSession.js'
import manageContract from './manageContract.js'

/* Set name. */
const name = 'Mutation'

/* Set (Mutation) fields. */
const fields = {
    addAffiliate,
    createSession,
    manageContract,
}

/* Set (Mutation) description. */
const description = `
Make authenticated requests to the entire suite of Nexa Exchange on-chain services.
`.trim()

/**
 * Mutation
 *
 * Make authenticated requests to Exchange services.
 */
export default new GraphQLObjectType({
    name,
    fields,
    description,
})
