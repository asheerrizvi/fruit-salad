// Calculates average product rating from all product reviews.
export default function calculateProductRating(reviews) {
  const ratingsTotal = reviews.reduce((currTotal, currentReview) => {
    currTotal += currentReview.rating;
    return currTotal;
  }, 0);
  const avgRating =
    ratingsTotal !== 0 ? (ratingsTotal / reviews.length).toFixed(1) : 0;

  return { avgRating };
}
