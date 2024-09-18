export function calculateConcentration(
    halfLife: number,
    tMax: number,
    doses: number[],
    times: number[],
  ): number[] {
    const timePoints = Array.from({ length: 720 }, (_, i) => i); // 12 hours * 60 minutes
    const concentration = new Array(timePoints.length).fill(0);
  
    const halfLifeMinutes = halfLife * 60;
    const tMaxMinutes = tMax * 60;
  
    doses.forEach((dose, index) => {
      const time = times[index];
      if (time !== undefined) {
        for (let t = time; t < timePoints.length; t++) {
          if (t <= time + tMaxMinutes) {
            // Calculation for absorption phase until T_MAX
            concentration[t] += (dose / tMaxMinutes) * (t - time);
          } else {
            // Calculation for elimination phase after T_MAX
            concentration[t] += dose * Math.exp((-Math.log(2) / halfLifeMinutes) * (t - time - tMaxMinutes));
          }
        }
      }
    });
  
    return concentration;
  }