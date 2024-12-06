import { createFileRoute } from '@tanstack/react-router';
import { ScenePage } from '../pages/ScenePage';

export const Route = createFileRoute('/')({
  component: ScenePage,
});
