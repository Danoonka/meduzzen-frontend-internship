import React from 'react';
import {Line} from "react-chartjs-2";
import {generateColors} from "../components/companyProfile/CompanyProfileAnalytics";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";
import {Rating} from "../types";

interface ChartProps {
    rating: Rating[];
    chartName: string
}

const Chart = ({rating, chartName}: ChartProps) => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: chartName,
            },
        },
    };

    const passAtValues = rating.map((entry) => {
        return entry.pass_at
    }).flat()


    const labels = passAtValues.map((passAt) => {
        const date = new Date(passAt);
        return date.toLocaleString('default', {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'});
    });

    const datasets = [{
        label: 'Average',
        data: rating.map((item) => item.average_rating),
        borderColor: generateColors(1),
        backgroundColor: generateColors(1),
    }]


    const data = {
        labels,
        datasets,
    };
    return (
        <div>
            <Line options={options} data={data}/>
        </div>
    );
};

export default Chart;