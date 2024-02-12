/* Import types. */
import AssetType from '../types/Asset.js'

import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLString,
 } from 'graphql'

const SAMPLE_ASSET = {
    assetid: '4ab47638-ba1b-4121-af48-39b2ca2c52f8',
    ownerid: '773decc0-8f56-49af-a2fc-28ea1ebdf553',
    chainid: 'NEXA',
    amount: 1337,
    createdAt: 1679699865,
}

/**
 * Asset
 */
export default {
    type: new GraphQLList(AssetType),
    args: {
        assetid: {
            type: GraphQLString,
            description: `Provide one or more Asset IDs for data retrieval.`,
        },
        ownerid: {
            type: GraphQLString,
            description: `Provide one or more Owner IDs for data retrieval.`,
        },
    },
    resolve: (_root, args, ctx) => {
        console.log('Asset (args):', args)

        return [SAMPLE_ASSET]
    },
    description: `Discover all the __Assets__ supported by Nexa Exchange and our partners.`,
}
