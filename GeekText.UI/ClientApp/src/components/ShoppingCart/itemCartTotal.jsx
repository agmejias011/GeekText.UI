export default {
  itemTotal: function () {
    const cartItemsTotal = JSON.parse(localStorage.getItem("cartItemsTotal"));
    if (cartItemsTotal) {
      return cartItemsTotal;
    }

    return 0;
  },
};
