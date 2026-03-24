/**
 * Calculates priority based on deadline proximity, estimated effort, and importance.
 *
 * @param {Date} deadline - Task deadline
 * @param {number} time - Estimated time in minutes
 * @param {number} importance - Importance level (1: low, 2: medium, 3: high)
 * @returns {number} priority score (higher is more critical)
 */
function calculatePriority(deadline, time, importance) {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  
  // Hours remaining until deadline
  const timeDifferenceMs = deadlineDate - now;
  const hoursRemaining = timeDifferenceMs > 0 ? timeDifferenceMs / (1000 * 60 * 60) : 0;
  
  // Urgency factor: scales inversely with hours remaining
  // If overdue or due very soon (< 1h), urgency is very high.
  // We use max(1, hoursRemaining) to prevent division by zero or extreme outliers if it's slightly overdue
  const urgencyObj = Math.max(0.5, hoursRemaining);
  const urgencyWeight = 100 / urgencyObj;

  // Effort weight: slightly prefers tasks that take less time for quick wins,
  // or you could prefer larger tasks if you want. Let's keep a neutral weight 
  // where we just normalize effort vs available time.
  // For simplicity, let's say higher time means we need to start earlier, so it increases priority.
  const effortWeight = time / 60; // hours of effort

  // Importance weight: Scales significantly based on chosen level
  const importanceWeight = importance * 20;

  // Compute final priority score
  // High urgency, high effort, and high importance will result in higher score.
  let priority = urgencyWeight + (effortWeight * 10) + importanceWeight;
  
  // Cap priority or floor it if necessary to keep it clean.
  priority = Math.max(0, priority);

  return Number(priority.toFixed(2));
}

module.exports = { calculatePriority };
