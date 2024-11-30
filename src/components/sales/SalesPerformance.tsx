import React, { useState } from 'react';
import { DateRangeSelector } from './DateRangeSelector';
import { SalesOverview } from './SalesOverview';
import { SalesMetrics } from './SalesMetrics';
import { SalesChart } from './SalesChart';
import { TopPerformers } from './TopPerformers';
import { SalesByCategory } from './SalesByCategory';
import { useSalesData } from '../../hooks/useSalesData';

export const SalesPerformance: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState('this_quarter');
  const { data, loading, error } = useSalesData(selectedRange);

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold text-cyan-400">Sales Performance</h2>
          <p className="text-gray-400">Real-time sales analytics and insights</p>
        </div>

        <DateRangeSelector
          selectedRange={selectedRange}
          onRangeChange={setSelectedRange}
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Sales Data */}
      {data && (
        <div className="space-y-6">
          {/* Overview Cards */}
          <SalesOverview totals={data.totals} />

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <SalesChart data={data.related_sales_opportunities} />
              <SalesByCategory data={data.related_sales_opportunities} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <SalesMetrics data={data.related_sales_opportunities} />
              <TopPerformers data={data.related_sales_opportunities} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};