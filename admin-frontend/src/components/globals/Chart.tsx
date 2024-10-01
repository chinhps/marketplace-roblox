import ChartJS from "chart.js/auto";
import { useRef, useEffect } from "react";

export default function Chart({
  lables,
  data,
  name,
}: {
  lables: Array<string>;
  data: Array<number>;
  name: string;
}) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      chartInstanceRef.current =
        ctx &&
        new ChartJS(ctx, {
          type: "bar",
          data: {
            labels: lables,
            datasets: [
              {
                label: name,
                data: data,
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
}
