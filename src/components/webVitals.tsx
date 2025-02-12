'use client'
 
import { useReportWebVitals } from 'next/web-vitals'
 
export function WebVitals() {
  useReportWebVitals((metric) => {
    if(process.env.NODE_ENV === 'development' && metric.rating === 'good') {
        console.info(metric);
    }
  })

  return <></>
}