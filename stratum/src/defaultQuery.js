export default `######################################################################
#
#  Welcome to the Minado GraphiQL
#
#  The Nexa Mining Community should make great use of this tool for:
#    ✔ Submitting PoW shares & solutions
#    ✔ Receiving affiliate credits
#    ✔ Managing $TOKEN activities
#
#  Sample queries from each (of 4) data categories shown below:
#
#    Affiliate:    View a complete history of ALL affliate and payout
#                  activities on the Minado platform.
#
#        Asset:    View a complete list (w/ details) of ALL assets
#                  supported on Minado, featuring:
#                    ✔ NEXA (nexa.org)
#                    ✔ NXY (nxy.cash)
#                    ✔ AVAS (avas.cash)
#
#       Report:    Request real-time activity reports on mining
#                  and minting details.
#
#      Stratum:    Primary connection point for ALL mining nodes,
#                  offering full support for v1 & v2 protocols:
#                    ✔ Submit shares & solutions
#                    ✔ Global edge network
#                    ✔ 100% uptime SLA
#
######################################################################

{
  # Sample affiliate query
  affiliate(base58: "nexa:...") {
    base58
    script
    type
  }

  # Sample asset query
  asset(id: "a-very-cool-assetid") {
    id
  }

  # Sample block query
  asset(height: [227570, 227571, 227572]) {
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

  # Sample report query
  report(id: "txidem-for-some-nft-pfp") {
    id
  }

  # Sample stratum query
  stratum(id: "nexa:someone-with-too-many-nfts") {
    id
  }

}
`
