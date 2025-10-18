import { HoroscopeContent, ZodiacSign } from '../types';


export const HOROSCOPE_DATA: HoroscopeContent = {
  Aries: "Today brings a burst of energy and new opportunities. Your natural leadership qualities will shine, and others will look to you for guidance. Trust your instincts and don't be afraid to take calculated risks. The stars align in your favor for both personal and professional growth.",
  
  Taurus: "A day of stability and comfort awaits you. Your practical approach to problems will serve you well, and your patience will be rewarded. Focus on building lasting relationships and consider making long-term investments. Your determination will help you overcome any obstacles.",
  
  Gemini: "Communication is your superpower today. Your wit and charm will open doors, and your adaptability will help you navigate any situation. Be open to new ideas and connections. Your curiosity will lead you to exciting discoveries and meaningful conversations.",
  
  Cancer: "Your emotional intelligence is heightened today. Trust your intuition and don't be afraid to show your caring nature. Family and close relationships take priority. Your nurturing instincts will be appreciated by those around you, and you'll find comfort in familiar surroundings.",
  
  Leo: "The spotlight is on you today, and you're ready to shine! Your confidence and creativity will attract positive attention. Don't be shy about expressing your unique talents. Your generous spirit will inspire others, and you'll find joy in bringing happiness to those around you.",
  
  Virgo: "Attention to detail will be your greatest asset today. Your analytical mind will help you solve complex problems and improve existing systems. Focus on organization and efficiency. Your helpful nature will be appreciated, and you'll find satisfaction in completing tasks thoroughly.",
  
  Libra: "Balance and harmony are your themes for today. Your diplomatic skills will help resolve conflicts and bring people together. Focus on partnerships and collaboration. Your sense of beauty and justice will guide you toward making fair and beneficial decisions.",
  
  Scorpio: "Your intensity and passion will drive you forward today. Trust your instincts and don't be afraid to dig deep into matters that interest you. Your transformative energy will help you and others grow. Focus on meaningful connections and authentic experiences.",
  
  Sagittarius: "Adventure and learning await you today. Your optimistic outlook will attract new opportunities and experiences. Be open to different perspectives and cultures. Your philosophical nature will help you find meaning in your experiences and share wisdom with others.",
  
  Capricorn: "Your ambition and determination will lead to tangible results today. Focus on your long-term goals and don't be afraid to take on responsibilities. Your practical wisdom will be valued by others. Patience and persistence will pay off in significant ways.",
  
  Aquarius: "Innovation and humanitarianism are your focus today. Your unique perspective will help solve problems in creative ways. Connect with like-minded individuals and consider how you can contribute to the greater good. Your independence and originality will be your strengths.",
  
  Pisces: "Your intuition and empathy are heightened today. Trust your inner voice and don't be afraid to show your compassionate nature. Creative pursuits will bring you joy and fulfillment. Your sensitivity to others' needs will make you a valuable friend and confidant."
};


export function getHoroscopeForSign(sign: ZodiacSign): string {
  return HOROSCOPE_DATA[sign] || HOROSCOPE_DATA.Aries;
}


export function getAllHoroscopes(): HoroscopeContent {
  return { ...HOROSCOPE_DATA };
}
