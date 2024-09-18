/**
 * Calculates the concentration of a drug over time based on multiple doses.
 *
 * This function implements a pharmacokinetic model that accounts for both the absorption
 * and elimination phases of drug metabolism. It uses a simplified linear absorption model
 * up to Tmax, followed by a first-order elimination model.
 *
 * @param halfLife - The half-life of the drug in hours
 * @param tMax - The time to reach maximum concentration after a dose in hours
 * @param doses - An array of dose amounts
 * @param times - An array of dosing times in minutes, corresponding to the doses array
 * @returns An array of concentration values for each minute over a 12-hour period
 */
export function calculateConcentration(
  halfLife: number,
  tMax: number,
  doses: number[],
  times: number[]
): number[] {
  // Constants and initial setup
  const timePoints = 720; // Total number of minutes in 12 hours
  const concentration = new Array(timePoints).fill(0);
  const halfLifeMinutes = halfLife * 60; // Convert half-life to minutes
  const tMaxMinutes = tMax * 60; // Convert Tmax to minutes

  // Pre-calculate the logarithmic term for the elimination phase
  // This optimization reduces repeated calculations in the loop
  const ln2OverHalfLife = Math.log(2) / halfLifeMinutes;

  // Process each dose
  doses.forEach((dose, index) => {
    const time = times[index];
    if (time !== undefined) {
      // Determine the end of the absorption phase
      // This is either Tmax after the dose time or the end of our time range, whichever comes first
      const absorptionEnd = Math.min(time + tMaxMinutes, timePoints);

      // Absorption phase: Linear increase up to Tmax
      for (let t = time; t < absorptionEnd; t++) {
        // The concentration increases linearly until Tmax
        concentration[t] += (dose / tMaxMinutes) * (t - time);
      }

      // Elimination phase: Exponential decay after Tmax
      for (let t = absorptionEnd; t < timePoints; t++) {
        // Apply the first-order elimination model
        concentration[t] +=
          dose * Math.exp(-ln2OverHalfLife * (t - time - tMaxMinutes));
      }
    }
  });

  return concentration;
}
