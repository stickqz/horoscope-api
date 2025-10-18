import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { ZodiacSign } from '../types';


class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare birthdate: Date;
  declare zodiacSign: ZodiacSign;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}


User.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true, validate: { isEmail: true } },
  password: { type: DataTypes.STRING(255), allowNull: false },
  birthdate: { type: DataTypes.DATEONLY, allowNull: false },
  zodiacSign: { type: DataTypes.ENUM('Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'), allowNull: false }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true
});


export default User;
