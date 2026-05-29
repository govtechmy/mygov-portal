'use client';

import { useContext } from 'react';
import { DateRange, DateRangePicker } from '@govtechmy/myds-react/daterange-picker';
import { SearchContext } from './searchProvider';

export default function DatePickerClient() {
  const context = useContext(SearchContext);
  if (!context) throw new Error('SearchContext must be used within a SearchProvider');

  const { dateRange, setDateRange } = context;

  const handleChange = (value: DateRange) => {
    setDateRange({ from: value.from, to: value.to });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <DateRangePicker value={dateRange} onValueChange={handleChange} />
    </div>
  );
}
