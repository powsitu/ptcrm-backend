const { ApolloError } = require("apollo-server-express");
const { argsToArgsConfig } = require("graphql/type/definition");

module.exports = {
  Query: {
    users: async ( parent, _args, { db }, info) => {
      const result = await db.user.findAll();
      return result;
    },
    checkins: async ( parent, _args, { db }, info) => {
      const result = await db.checkin.findAll({ include: {model: db.user} });
      console.log(result);
      return result;
    },
    checkinForUser: async ( parent, _args, { db }, info) => {
      const result = await db.checkin.findByPk(_args.id, {include: {model: db.user}});
      return result;
    },
    trainingTypes: async ( parent, _args, { db }, info) => {
      const result = await db.trainingType.findAll();
      return result;
    },
    places: async ( parent, _args, { db }, info) => {
      const result = await db.place.findAll();
      return result;
    },
    reservations: async ( parent, _args, { db }, info) => {
      const result = await db.reservation.findAll(
        {
          include: [
            { model: db.user },
            { model: db.training }
          ]
        });
      return result;
    },
    reservationsForUser: async ( parent, _args, { db }, info) => {
      const result = await db.reservation.findAll(
        {
          where: { userId: _args.id},
          include: [
            { model: db.user },
            { model: db.training,
              include: [
                { model: db.trainingType },
                { model: db.place }
              ]
            }
          ]
        });
      return result;
    },

    trainings: async ( parent, _args, { db }, info) => {
      const result = await db.training.findAll({include: [db.trainingType, db.place]});
      return result;
    },
    trainingThisDay: async ( parent, _args, { db }, info) => {
      const result = await db.training.findAll({
        where: {
          date: _args.date
        },
        include: {
          model: db.trainingType
        }
      });
      return result;
    }

  }
}