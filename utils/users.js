const filterByUser = (items, user) =>
  items.filter(({ createdBy }) => createdBy === user);

exports.filterByUser = filterByUser;
