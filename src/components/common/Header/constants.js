
// main nav link config
export const MAIN_NAV_ITEMS = [
    {
        category: 'Men', path: '/products?cid=101000000',
        subcategories: [
            {
                category: 'T-Shirt', path: '/products?cid=101010000',
                subcategories: [
                    { category: 'Short sleeves', path: '/products?cid=101010101' },
                    { category: 'Long sleeves', path: '/products?cid=101010102' },
                    { category: 'Hooded top', path: '/products?cid=101010105' },
                ]
            },
            { category: 'Pants', path: '/products?cid=101020000' },
            {
                category: 'Coat', path: '/products?cid=101030000',
                subcategories: [
                    { category: 'Hoodieless', path: '/products?cid=101030301' },
                    { category: 'Hoodie', path: '/products?cid=101030302' },
                ]
            },
        ]
    },
    {
        category: 'Women', path: '/products?cid=102000000',
        subcategories: [
            {
                category: 'T-Shirt', path: '/products?cid=102010000',
                subcategories: [
                    { category: 'Short sleeves', path: '/products?cid=102010101' },
                    { category: 'Long sleeves', path: '/products?cid=102010102' },
                    { category: 'Vest', path: '/products?cid=102010103' },
                ]
            },
            { category: 'Pants', path: '/products?cid=102020000' },
            { category: 'Coat', path: '/products?cid=102030000' },
            { category: 'Skirt', path: '/products?cid=102040000' },
        ]
    },
    {
        category: 'Kid', path: '/products?cid=103000000',
        subcategories: [
            {
                category: 'T-Shirt', path: '/products?cid=103010000',
                subcategories: [
                    { category: 'Short sleeves', path: '/products?cid=103010101' },
                    { category: 'Long sleeves', path: '/products?cid=103010102' },
                ]
            },
            { category: 'Pants', path: '/products?cid=103020000' },
            { category: 'Coat', path: '/products?cid=103030000' },
        ]
    },
    {
        category: 'Other', path: '/products?cid=104000000',
        subcategories: [
            {
                category: 'Bag', path: '/products?cid=104050000',
                subcategories: [
                    { category: 'Side bag', path: '/products?cid=104050501' },
                    { category: 'Backpack', path: '/products?cid=104050502' },
                ]
            },
            {
                category: 'Hat', path: '/products?cid=104060000',
                subcategories: [
                    { category: 'Woolen hat', path: '/products?cid=104060601' },
                    { category: 'Baseball hat', path: '/products?cid=104060602' },
                    { category: 'Fisher hat', path: '/products?cid=104060603' },
                ]
            },
            {
                category: 'Wallet', path: '/products?cid=104070000',
                subcategories: [
                    { category: 'Coin wallet', path: '/products?cid=104070701' }
                ]
            }
        ]
    },
]

// manage nav link config
export const MANAGE_NAV_ITEMS = [
    { category: 'Create', path: '/manage/create' },
    { category: 'Users', path: '/manage/users' },
    { category: 'Products', path: '/manage/products' }]

