module.exports = {
    mode: 'test',
    live: {
        baseUrl: 'https://checkout.kashier.io',
        mode: 'live',
        PaymentApiKey: '24c3f924-6c24-4734-9189-003f5a302a05',
        mid: 'MID-21183-235',
    },
    test: {
        baseUrl: 'https://checkout.kashier.io',
        PaymentApiKey: '38e64ff1-f755-45ff-bf59-225d1e30d94a',
        mode: 'test',
        mid: 'MID-21183-235',
    },
}