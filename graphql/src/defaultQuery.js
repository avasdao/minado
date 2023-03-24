export default `######################################################################
#
#  Welcome to the Nexa Rocks! GraphiQL
#
#  The Nexa Miners Community should make great use of this tool for:
#    ✔ Submitting PoW shares & solutions
#    ✔ Receiving affiliate credits
#    ✔ Managing ROCKS activities
#
#  Sample queries from each (of 4) data categories shown below:
#
#    Affiliate:    View a complete history of ALL affliate and payout
#                  activities on the Nexa Rocks! platform.
#
#        Asset:    View a complete list (w/ details) of ALL assets
#                  supported on Nexa Rocks!, featuring:
#                    ✔ NEXA (nexa.org)
#                    ✔ ROCKS (rocks.cash)
#                    ✔ AVAS (avas.cash)
#
#       Report:    Request real-time activity reports on mining
#                  and minint details.
#
#      Stratum:    Primary connection point for ALL mining nodes,
#                  offering full support for v1 & v2 protocols:
#                    ✔ Submit shares & solutions
#                    ✔ Global edge network
#                    ✔ 100% uptime SLA
#
######################################################################

{
  # Sample address query
  address(base58: "nexa:...") {
    base58
    script
    type
  }

  # Sample block query
  block(height: [227570, 227571, 227572]) {
    height
    hash
    size
    txcount
    time
    mediantime
    nonce
    bits
    difficulty
    utxoCommitment
    minerData
  }

  # Sample meta query
  meta(id: "txidem-for-some-nft-pfp") {
    id
  }

  # Sample owner query
  owner(id: "nexa:someone-with-too-many-nfts") {
    id
  }

  # Request specific data match based on OP_RETURN
  # data stored on-chain.
  # NOTE: 'FUZ' is the datacode for a CashFusion transaction.
  script(id: "FUZ") {
    id
    txidem
    owner {
      id
    }
  }

  # Sample token query
  token(id: "a-very-cool-tokenid") {
    id
  }

  # Sample transaction query
  transaction(txid: "my-super-expensive-txid") {
    txid
    txidem
    amount
  }
}
`
