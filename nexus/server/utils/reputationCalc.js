// Calculates new rep score based on review rating (1-5)
const calculateNewReputation = (currentRep, rating) => {
  let multiplier = 0;
  if (rating === 5) multiplier = 10;
  if (rating === 4) multiplier = 5;
  if (rating === 3) multiplier = 1;
  if (rating <= 2) multiplier = -5; // Penalty for poor work
  
  return currentRep + multiplier;
};

module.exports = { calculateNewReputation };