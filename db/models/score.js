'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  score.init({
    name: DataTypes.TEXT,
    score: DataTypes.INTEGER,
    time: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'score',
  });
  return score;
};