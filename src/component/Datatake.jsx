import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

const MyBarChart = ({da}) => {

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: da.date.map(date => date.split("T")[0]),
  datasets: [
    {
      label: '',  // This label will still exist in the code but won't display due to legend settings
      data: da.values,
      backgroundColor: 'rgb(220 38 38)',
      borderColor:'rgb(220 38 38)',
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,  // Hide legend labels
    },
    tooltip: {
      enabled: false,  // Optional: Hide tooltips on hover
    },
  },
  scales: {
    x: {
      type: 'category',
    },
    y: {
      type: 'linear',
      beginAtZero: true,
    },
  },
};

return(
  <div>
    <div>{da.name}</div>
    <Bar data={data} options={options} />
  </div>
)}
export default MyBarChart;
