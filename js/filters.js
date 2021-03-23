const propertyType = document.querySelector('#housing-type');

const propertyTypeFilter = (adds) => {
  if (propertyType.value === 'any') {
    return adds;
  } else {
    const filtered = adds.filter((add) => {
      const { offer } = add;
      return offer.type === propertyType.value;
    });
    return filtered;
  }
};

export { propertyType, propertyTypeFilter };
