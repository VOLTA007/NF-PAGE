import crypto from "crypto";

export function generateKashierOrderHash(order) {
    const { mid, amount, currency, merchantOrderId, secret } = order;
    const path = `/?payment=${mid}.${merchantOrderId}.${amount}.${currency}`;
    console.log(path);

    const hash = crypto.createHmac('sha256', secret)
        .update(path)
        .digest('hex');

    return hash;
}
