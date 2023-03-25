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
    // args: {
    //     affiliateid: {
    //         type: GraphQLString,
    //         defaultValue: '4ab47638-ba1b-4121-af48-39b2ca2c52f8',
    //         description: `Provide one or more Affiliate IDs to retrieve.`,
    //     },
    // },
    resolve: (parent, args, params) => {
        console.log('BLANK PARAMS:', params)
        return 'Blank created successfully!'
    },
    description: `Blank description goes here.`,
}
