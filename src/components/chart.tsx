import { useState } from "react";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

interface IChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  options: ChartOptions<"line">;
  title: string;
}

/**
 * A component that renders a line chart with a dynamic time frame.
 */
const Chart: React.FC<IChartProps> = ({ data, options, title }) => {
  const [timeFrame, setTimeFrame] = useState(12);

  const handleTimeFrameChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setTimeFrame(parseInt(event.target.value, 10));
  };

   /**
   * Slices the chart data based on the selected time frame.
   */
  const slicedData = {
    labels: data.labels.slice(0, timeFrame),
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      data: dataset.data.slice(0, timeFrame),
    })),
  };

  return (
    <div>
      <h2 className="text-xl">{title}</h2>

      <Line options={options} data={slicedData} />
      <div className="flex items-center space-x-3">
        <p>Time frame: </p>
        <select
          value={timeFrame}
          onChange={handleTimeFrameChange}
          className="m-2 p-1 border rounded"
        >
          <option value={12}>12 Months</option>
          <option value={6}>6 Months</option>
          <option value={3}>3 Months</option>
          <option value={1}>1 Month</option>
        </select>
      </div>
    </div>
  );
};

export default Chart;
