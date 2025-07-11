export const calculateDynamicPrice = (product) => {
  if (
    !product.dynamicPricing ||
    product.timeToExpiry == null ||
    product.reductionPerDay == null ||
    product.initialPrice == null
  ) {
    // If dynamic pricing is off, always return initialPrice
    return {
      currentPrice: product.initialPrice,
      discountPercentage: 0,
    };
  }

  // Dynamic pricing ON: calculate based on expiry
  const daysPassed = product.timeToExpiry;
  const discount = product.initialPrice * product.reductionPerDay * daysPassed;
  const discountedPrice = product.initialPrice - discount;
  const minPrice = product.initialPrice * 0.4;

  const currentPrice = Math.max(discountedPrice, minPrice);
  const discountPercentage = Math.round(((product.initialPrice - currentPrice) / product.initialPrice) * 100);

  return {
    currentPrice: parseFloat(currentPrice.toFixed(2)),
    discountPercentage,
  };
};
