import axios from 'axios';

export async function submitReservation(payload, apiUrl, apiKey, setMessage, onSuccess) {
  try {
    await axios.post(`${apiUrl}/api/reservations`, payload, {
      headers: { 'x-api-key': apiKey }
    });
    setMessage('✅ Reservation created successfully.');
    setTimeout(onSuccess, 500);
  } catch (error) {
    const backendMessage = error.response?.data?.msg;
    if (backendMessage === 'Weekly limit exceeded') {
      setMessage('⚠️ You cannot make more than 3 reservations per week.');
    } else if (backendMessage) {
      setMessage(`❌  Business error: ${backendMessage}`);
    } else {
      setMessage('❌ Technical error while creating the reservation. Please try again.');
    }
  }
}
