import type { NextApiRequest, NextApiResponse } from 'next';
import { calculateConcentration } from '../../utils/calculateConcentration';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { halfLife, tMax, doses, times, startingTime } = req.body;

    // Validation
    if (!halfLife || halfLife <= 0) {
      res.status(400).json({ message: 'Invalid half-life value' });
      return;
    }
    if (!tMax || tMax <= 0) {
      res.status(400).json({ message: 'Invalid t_max value' });
      return;
    }
    if (!doses || !Array.isArray(doses) || doses.length === 0) {
      res.status(400).json({ message: 'Invalid doses array' });
      return;
    }
    if (!times || !Array.isArray(times) || times.length !== doses.length) {
      res.status(400).json({ message: 'Invalid times array' });
      return;
    }
    if (!startingTime || startingTime < 0) {
      res.status(400).json({ message: 'Invalid starting time' });
      return;
    }

    try {
      const concentration = calculateConcentration(halfLife, tMax, doses, times);
      res.status(200).json({ concentration });
    } catch (error) {
      console.error('Error calculating concentration:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}