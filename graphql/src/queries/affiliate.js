/* Import types. */
import AffiliateType from '../types/Affiliate.js'

/**
 * Affiliate
 */
export default {
    type: AffiliateType,
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
    description: `Request Affiliate program details, including: balances, bonuses and more...`,
}
