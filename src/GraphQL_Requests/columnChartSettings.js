export const columnOptions = {
    chart: {
      type: "bar",
      height: 400,
      width: "100%",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: Array.from({ length: 50 }, (_, i) => i + 1), 
    },
    yaxis: {
      title: {
        text: "People",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `Count: ${val} People`;
        },
      },
    },
  };
