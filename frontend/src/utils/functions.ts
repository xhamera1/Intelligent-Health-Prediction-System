export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw await response.json();
  }
  return response.json();
};
export const safeNumber = (value: unknown): number => {
		const num = Number(value);
		return Number.isFinite(num) && num > 0 ? num : 1;
	};

/**
 * Normalizes a probability value to percentage format (0-100).
 * If value is less than 1, assumes it's in decimal format and multiplies by 100.
 * Handles edge cases like negative values and values > 100.
 * @param value - Probability value (either 0.0-1.0 or 0-100)
 * @returns Percentage value (0-100)
 */
export const normalizeProbabilityToPercentage = (
    value: number | null | undefined
): number => {
    if (value == null || Number.isNaN(value)) {
        return 0;
    }

    // Handle negative values
    if (value < 0) {
        return 0;
    }

    // If value is less than 1, assume it's in decimal format (0.0-1.0) and convert to percentage
    // Otherwise, assume it's already in percentage format (0-100)
    const percentage = value < 1.0 ? value * 100 : value;

    // Clamp to valid range [0, 100]
    return Math.max(0, Math.min(100, percentage));
};