import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const School = sequelize.define("School", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: "schools",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
});

export default School;
