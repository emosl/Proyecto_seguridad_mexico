import React, { useEffect, useState } from 'react';
import { useDataProvider } from 'react-admin';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const MyPieChart = () => {
    const [data, setData] = useState([]);
    const dataProvider = useDataProvider();

    const transformData = (tickets) => {
        const clasificacionCounts = tickets.reduce((acc, ticket) => {
            acc[ticket.clasificacion] = (acc[ticket.clasificacion] || 0) + 1;
            return acc;
        }, {});

        return Object.keys(clasificacionCounts).map(clasificacion => ({
            name: clasificacion,
            value: clasificacionCounts[clasificacion],
        }));
    };

    useEffect(() => {
        dataProvider
            .getList('tickets', {
                pagination: { page: 1, perPage: 10 },
                sort: { field: 'id', order: 'ASC' },
            })
            .then((response) => {
                const transformedData = transformData(response.data);
                setData(transformedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [dataProvider]);

    return (
        <PieChart width={400} height={400}>
            <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data}
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
                label
            >
                {
                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
};

export default MyPieChart;
