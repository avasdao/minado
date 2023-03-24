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
    type: GraphQLString,
    resolve: (parent, args, params) => {
        console.log('BLANK PARAMS:', params)
        return {
            affiliateid: '4ab47638-ba1b-4121-af48-39b2ca2c52f8',
            shortid: 'abc123',
            rewards: {
                rewardid: 'fb73571c-b4c8-4489-a199-454e719b78bf',
                affiliateid: '4ab47638-ba1b-4121-af48-39b2ca2c52f8',
                amount: 1337,
                createdAt: 1679699865,
            },
            createdAt: 1679699791,
        }
    },
    description: `Blank description goes here.`,
}
