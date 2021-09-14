// Calculates average product rating and rounded average
// product rating from all product reviews.
export default function calculateProductRating(reviews) {
  const ratingsTotal = reviews.reduce((currTotal, currentReview) => {
    currTotal += currentReview.rating;
    return currTotal;
  }, 0);
  const avgRating = (ratingsTotal / reviews.length).toFixed(1);
  const roundedAvgRating = Math.round(avgRating);

  return { avgRating, roundedAvgRating };
}
