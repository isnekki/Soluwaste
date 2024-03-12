import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

export interface RegressionPlotProps {
    x: number[],
    y: number[],
    regressionLineX: number[],
    regressionLineY: number[],
    xTitle?: string,
    yTitle?: string,
    title: string,
    showLegend?: boolean
    pointTitle?: string
}

export default function RegressionPlot({ x, y, regressionLineX, regressionLineY, xTitle, yTitle, title, showLegend, pointTitle }: RegressionPlotProps) { 
    return (
        <Plot 
            config={{
                displayModeBar: false
            }}
            style={{
                margin: "10px",
                height: "100%",
                width: "100%",
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0,
            }}
            data={[
                {
                    x: x,
                    y: y,
                    type: 'scatter',
                    mode: 'markers',
                    marker: { color: 'blue' },
                    name: pointTitle,
                    showlegend: showLegend ?? true
                },
                {
                    x: regressionLineX,
                    y: regressionLineY,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'red' },
                    name: "Forecast",
                    showlegend: showLegend ?? true
                }
            ]}
            layout={{
                paper_bgcolor: 'transparent',
                plot_bgcolor: 'transparent',
                autosize: true,
                xaxis: { title: xTitle },
                yaxis: { title: yTitle },
                title,              
            }}
        />
    )
}