import { Grid } from '@mui/material';
import type { HabitsAssessmentRecord } from '../../utils/types.ts';
import PredictionDetailField from "./PredictionDetailsField.tsx";

type Props = {
  record: HabitsAssessmentRecord;
};

const HabitsPredictionDetails = ({ record }: Props) => {
  return (
    <Grid container spacing={1}>
      <PredictionDetailField
        label="Daily water intake"
        value={`${record.waterIntakeGlasses} glasses`}
      />
      <PredictionDetailField
        label="Average sleep"
        value={`${record.sleepHours.toFixed(1)} h`}
      />
      <PredictionDetailField
        label="Daily steps"
        value={record.stepsPerDay.toLocaleString()}
      />
      <PredictionDetailField
        label="Daily exercise"
        value={`${record.exerciseMinutes} min`}
      />
      <PredictionDetailField
        label="Daily screen time"
        value={`${record.screenTimeHours.toFixed(1)} h`}
      />
      <PredictionDetailField label="Stress level" value={record.stressLevel} />
      <PredictionDetailField
        label="Daily fruit and veggie servings"
        value={`${record.fruitsVeggiesServings}`}
      />
    </Grid>
  );
};

export default HabitsPredictionDetails;

