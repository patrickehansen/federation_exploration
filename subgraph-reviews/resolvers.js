const resolvers = {
  Query: {
    latestReviews: (_, __, {dataSources}) => {
      return dataSources.reviewsAPI.getLatestReviews();
    }
  },
  Mutation: {
    submitReview: (_, {locationReview}, {dataSources}) => {
      const newReview = dataSources.reviewsAPI.submitReviewForLocation(locationReview);
      return {code: 200, success: true, message: 'success', locationReview: newReview};
    }
  },
  Location: {
    __resolveReference: (location) => {
      return location;
    },
    overallRating: ({id}, _, {dataSources}) => {
      return dataSources.reviewsAPI.getOverallRatingForLocation(id);
    },
    reviewsForLocation: ({id}, _, {dataSources}) => {
      return dataSources.reviewsAPI.getReviewsForLocation(id);
    }
  },
  Review: {
    location: ({locationId}) => {
      return {id: locationId};
    },
    locationName: (parent) => {
      console.log('So heres what I have for parent', parent);
      return parent.location.name;
    }
  }
};

module.exports = resolvers;
