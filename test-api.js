const axios = require('axios');


const BASE_URL = 'http://localhost:3000/api';


// Generate random 3-character string
const generateRandomString = () => Math.random().toString(36).substring(2, 5);


// Test data with random suffix
const randomSuffix = generateRandomString();
const testUser = {
  name: `Alice Johnson ${randomSuffix}`,
  email: `alice.johnson.${randomSuffix}@example.com`,
  password: `password123${randomSuffix}`,
  birthdate: '1990-05-15' // Gemini
};


let authToken = '';


async function testAPI() {
  console.log('🧪 Starting API Tests...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await axios.get('http://localhost:3000/health');
    console.log('✅ Health Check:', healthResponse.data);
    console.log('');

    // Test 2: User Signup
    console.log('2. Testing User Signup...');
    const signupResponse = await axios.post(`${BASE_URL}/auth/signup`, testUser);
    console.log('✅ Signup Success:', {
      message: signupResponse.data.message,
      user: signupResponse.data.user,
      hasToken: !!signupResponse.data.token
    });
    authToken = signupResponse.data.token;
    console.log('');

    // Test 3: User Login
    console.log('3. Testing User Login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Login Success:', {
      message: loginResponse.data.message,
      user: loginResponse.data.user,
      hasToken: !!loginResponse.data.token
    });
    console.log('');

    // Test 4: Get Today's Horoscope
    console.log('4. Testing Today\'s Horoscope...');
    const horoscopeResponse = await axios.get(`${BASE_URL}/horoscope/today`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Today\'s Horoscope:', horoscopeResponse.data);
    console.log('');

    // Test 5: Get Horoscope History
    console.log('5. Testing Horoscope History...');
    const historyResponse = await axios.get(`${BASE_URL}/horoscope/history`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Horoscope History:', historyResponse.data);
    console.log('');

    // Test 6: Test Rate Limiting
    console.log('6. Testing Rate Limiting...');
    for (let i = 0; i < 7; i++) {
      try {
        await axios.get(`${BASE_URL}/horoscope/today`, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        console.log(`Request ${i + 1}: Success`);
      } catch (error) {
        console.log(`Request ${i + 1}: Rate Limited -`, error.response?.data);
        break;
      }
    }
    console.log('');

    console.log('🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}


testAPI();
