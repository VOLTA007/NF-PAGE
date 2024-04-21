
export default async function handler(req, res) {
    try {
      // Parse query parameters from the request URL
      const { paymentStatus } = req.query;
  
      if (paymentStatus === 'SUCCESS') {
        // Payment successful
        // Perform actions for successful payment (e.g., update database, send confirmation email, etc.)
        console.log('Payment successful');
        res.status(200).json({ message: 'Payment successful' });
      } else if (paymentStatus === 'FAILED') {
        // Payment failed
        // Perform actions for failed payment (e.g., log error, display error message, etc.)
        console.log('Payment failed');
        res.status(200).json({ message: 'Payment failed' });
      } else {
        // Invalid payment status
        console.log('Invalid payment status');
        res.status(400).json({ error: 'Invalid payment status' });
      }
    } catch (error) {
      console.error('Error processing payment response:', error);
      res.status(500).json({ error: 'Error processing payment response' });
    }
  }
  