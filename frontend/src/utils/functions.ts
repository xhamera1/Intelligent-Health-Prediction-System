export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw await response.json();
  }
  return response.json();
};
export 	const safeNumber = (value: unknown): number => {
		const num = Number(value);
		return Number.isFinite(num) && num > 0 ? num : 1;
	};
