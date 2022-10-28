const resolvers = {
  Query: {
    locations: (_, __, { dataSources }) => {
      return dataSources.locationsAPI.getAllLocations();
    },
    location: (_, { id }, { dataSources }) => {
      return dataSources.locationsAPI.getLocation(id);
    },
  },
  Location: {
    __resolveReference: ({id}, {dataSources}) => {
      return dataSources.locationsAPI.getLocation(id);
    }
  },
  Review: {
    __resolveReference: (reference) => {
      return {
        ...reference,
        name: 'foo'
      }
    },
    seriouslyLocationName: () => {
      console.log('So heres what I have for parent', parent);
      return parent.name;
    }
  }
};

module.exports = resolvers;
