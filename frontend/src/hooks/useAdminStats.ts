import { useQuery } from '@tanstack/react-query';
import { useApplicationContext } from '../contexts/ApplicationContextProvider.tsx';
import { adminService } from '../services/adminService';

export const useAdminStats = () => {
    const { accessToken, isUserAuthenticated } = useApplicationContext();
    const token = accessToken?.value ?? null;

    return useQuery({
        queryKey: ['admin', 'stats'],
        queryFn: async () => {
            if (!token || !isUserAuthenticated) throw new Error('Not authenticated');
            const data = await adminService.getAllPredictionHistory(token, 0, 1);
            const totalCurrentDayPredictions = data.totalCurrentDayPredictions;
            const heart = data.heartAttacks?.totalElements ?? 0;
            const diabetes = data.diabetes?.totalElements ?? 0;
            const strokes = data.strokes?.totalElements ?? 0;
            const habits = data.habits?.totalElements ?? 0;
            return {
                totalPredictions: heart + diabetes + strokes + habits,
                predictions : {
                    volume: {
                        perDay: totalCurrentDayPredictions,
                        diabetes: diabetes,
                        heart: heart,
                        stroke: strokes,
                        habits: habits
                    },
                },
            };
        },
        enabled: !!token && isUserAuthenticated,
    });
};