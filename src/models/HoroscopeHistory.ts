import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { ZodiacSign } from '../types';


class HoroscopeHistory extends Model {
  declare id: number;
  declare userId: number;
  declare zodiacSign: ZodiacSign;
  declare content: string;
  declare date: Date;
  declare readonly createdAt: Date;
}


HoroscopeHistory.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
  zodiacSign: { type: DataTypes.ENUM('Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'), allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false }
}, {
  sequelize,
  modelName: 'HoroscopeHistory',
  tableName: 'horoscope_history',
  timestamps: true,
  updatedAt: false
});


export default HoroscopeHistory;
