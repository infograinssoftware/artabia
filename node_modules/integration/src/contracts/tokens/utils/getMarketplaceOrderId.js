function getMarketplaceOrderId(tx) {
    return tx.events.MarketplaceOrderCreated.returnValues.id
        // return tx
}

module.exports = getMarketplaceOrderId