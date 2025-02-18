'use client'
 
import { useReportWebVitals } from 'next/web-vitals'
 
enum Rating { GOOD = 'good', NEEDS_IMPROVEMENT = 'needs-improvement', POOR = 'poor' }
type RatingType = Rating.GOOD | Rating.NEEDS_IMPROVEMENT | Rating.POOR
type Metric = { 
    id: string; 
    name: string; 
    startTime: number; 
    value: number; 
    label: string; 
    rating: RatingType;
}

export function WebVitals() {
  useReportWebVitals((metric: Metric) => {
    if(process.env.NODE_ENV === 'development' && metric.rating === Rating.POOR) {
        console.info('METRIC : ', metric);
    }
  })

  return <></>
}