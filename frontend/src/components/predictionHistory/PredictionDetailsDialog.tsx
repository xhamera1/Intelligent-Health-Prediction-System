// src/components/prediction-history/PredictionDetailsDialog.tsx
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import StrokePredictionDetails from './StrokePredictionDetails';
import DiabetesPredictionDetails from './DiabetesPredictionDetails';
import HeartAttackPredictionDetails from './HeartAttackPredictionDetails';
import HabitsPredictionDetails from './HabitsPredictionDetails';
import {
  formatDateTime,
  formatProbability,
  formatWellnessScore
} from '../../utils/formatters.ts';
import type {
  PredictionType,
  SelectedPrediction
} from '../../utils/types.ts';

const predictionTypeLabel: Record<PredictionType, string> = {
  stroke: 'Stroke prediction',
  diabetes: 'Diabetes prediction',
  heartAttack: 'Heart attack prediction',
  habits: 'Lifestyle habits check'
};

type Props = {
  open: boolean;
  prediction: SelectedPrediction;
  onClose: () => void;
};

const PredictionDetailsDialog = ({ open, prediction, onClose }: Props) => {
  if (!prediction) {
    return null;
  }

  const { type, record } = prediction;
  const hasProbability =
    'predictionProbability' in record &&
    typeof record.predictionProbability === 'number';
  const hasWellnessScore =
    'wellnessScore' in record && typeof record.wellnessScore === 'number';

  // Helper to determine what value to show prominently
  const displayValue = hasProbability
    ? formatProbability(record.predictionProbability)
    : hasWellnessScore
      ? formatWellnessScore(record.wellnessScore)
      : null;

  const displayLabel = hasProbability ? 'Probability' : 'Wellness Score';

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle variant={"h3"} sx={{ fontWeight: 500 }}>
        Prediction details
      </DialogTitle>

      <DialogContent dividers>
        {/* Header Section with Split Layout */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={3}
          mt={1}
        >
          {/* Left Side: Type and Date */}
          <Box>
            <Typography variant="body1" color="text.secondary" sx={{ letterSpacing: 1 }}>
              Analysis Type
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5 }} gutterBottom>
              {predictionTypeLabel[type]}
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ mt: 0, fontWeight: 500 }}>
              Created on: {formatDateTime(record.createdAt)}
            </Typography>
          </Box>

          {/* Right Side: Big Probability/Score */}
          {displayValue && (
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body1" color="text.secondary" sx={{ letterSpacing: 1 }}>
                {displayLabel}
              </Typography>
              <Typography
                variant="h1"
                color="black"
                sx={{
                  fontWeight: 600,
                  lineHeight: 1,
                  mt: 0.5
                }}
              >
                {displayValue}
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box mb={3}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Input data
          </Typography>
          <PredictionInputData prediction={prediction} />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Recommendations
          </Typography>
          <Typography component="div" variant="body1" color="text.secondary">
            <ReactMarkdown>{record.recommendations}</ReactMarkdown>
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained" size="large">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

type InputDataProps = {
  prediction: SelectedPrediction;
};

const PredictionInputData = ({ prediction }: InputDataProps) => {
  if (!prediction) return null;

  const { type, record } = prediction;

  switch (type) {
    case 'stroke':
      return <StrokePredictionDetails record={record} />;
    case 'diabetes':
      return <DiabetesPredictionDetails record={record} />;
    case 'heartAttack':
      return <HeartAttackPredictionDetails record={record} />;
    case 'habits':
      return <HabitsPredictionDetails record={record} />;
  }
};

export default PredictionDetailsDialog;
