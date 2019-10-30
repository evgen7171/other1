let add = (cart, req) => {
    cart.push(req.body);
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    let find = cart.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    return JSON.stringify(cart, null, 4);
};
let remove = (cart, req) => {
    let find = cart.find(el => el.id_product === +req.params.id);
    cart.splice(cart.indexOf(find), 1);
    return JSON.stringify(cart, null, 4);
};
let clear = (cart, req) => {
    cart = [];
    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change,
    remove,
    clear
};