const APPLINKS = {
    catalog: '/catalog',
    item: (id) => (`/item/${id}`),
    addItem: '/shop/addItem',
}

const APPSTRING = {
    catalogItems: 'catalogItems',
    shops: 'shops',

    UPLOAD_CHANGED: 'state_changed',
    DOC_ADDED: 'added',
    DOC_MODIFIED: 'modified',
    DOC_REMOVED: 'removed',
    PREFIX_IMAGE: 'image/',
}


export default APPLINKS
export  {APPSTRING};
