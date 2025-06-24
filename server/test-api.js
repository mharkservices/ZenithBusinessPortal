import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5002/api';

async function testAPI() {
  console.log('Testing API endpoints...\n');

  try {
    // Test 1: Get all services
    console.log('1. Testing GET /services');
    const servicesResponse = await fetch(`${BASE_URL}/services`);
    const services = await servicesResponse.json();
    console.log('Services:', services);
    console.log('Status:', servicesResponse.status);
    console.log('');

    if (services.length > 0) {
      const firstServiceId = services[0].id;
      
      // Test 2: Get service by ID
      console.log('2. Testing GET /services/:id');
      const serviceResponse = await fetch(`${BASE_URL}/services/${firstServiceId}`);
      const service = await serviceResponse.json();
      console.log('Service:', service);
      console.log('Status:', serviceResponse.status);
      console.log('');

      // Test 3: Get filings for service
      console.log('3. Testing GET /services/:id/filings');
      const filingsResponse = await fetch(`${BASE_URL}/services/${firstServiceId}/filings`);
      const filings = await filingsResponse.json();
      console.log('Filings:', filings);
      console.log('Status:', filingsResponse.status);
      console.log('');
    }

    // Test 4: Create a test service
    console.log('4. Testing POST /services');
    const createServiceResponse = await fetch(`${BASE_URL}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test Service ' + Date.now(),
        description: 'Test service description'
      })
    });
    const newService = await createServiceResponse.json();
    console.log('New Service:', newService);
    console.log('Status:', createServiceResponse.status);
    console.log('');

  } catch (error) {
    console.error('API Test Error:', error.message);
  }
}

testAPI(); 