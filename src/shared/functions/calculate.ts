export const calculateTotalSales = (sales: number[]) => {
  return sales.reduce((acc, sale) => acc + sale, 0);
};

export const calculateAverageConversionRate = (rates: number[]) => {
  if (rates.length === 0) return 0;
  const sum = rates.reduce((acc, rate) => acc + rate, 0);
  return sum / rates.length;
};

export const calculateAverageRating = (ratings: number[]) => {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return sum / ratings.length;
};
