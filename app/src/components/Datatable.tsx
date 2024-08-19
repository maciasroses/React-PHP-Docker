import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useResolvedTheme } from "@/hooks/useResolvedTheme";
import type {
  ConditionalStyles,
  ExpanderComponentProps,
} from "react-data-table-component";

const customStyles = (theme: string) => {
  return {
    headRow: {
      style: {
        backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
        color: theme === "dark" ? "#ffffff" : "#1f2937",
      },
    },
    // subHeader: {
    //   style: {
    //     backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
    //     color: theme === "dark" ? "#ffffff" : "#1f2937",
    //   },
    // },
    expanderButton: {
      style: {
        color: theme === "dark" ? "#fff" : "#000",
      },
    },
    pagination: {
      style: {
        backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
        color: theme === "dark" ? "#ffffff" : "#1f2937",
      },
      pageButtonsStyle: {
        fill: theme === "dark" ? "rgb(209 213 219)" : "rgb(31 41 55)",
        "&:hover:not(:disabled)": {
          fill: theme === "dark" ? "rgb(255 255 255)" : "rgb(0 0 0)",
        },
      },
    },
  };
};

const Datatable = <T extends object>({
  columns,
  data,
  onSelectedRowsChange,
  expandableRowsComponent,
  conditionalRowStyles,
}: {
  columns: object[];
  data: T[];
  // subHeaderComponen: ReactNode,
  onSelectedRowsChange: (selected: { selectedRows: T[] }) => void;
  expandableRowsComponent: React.FC<ExpanderComponentProps<T>>;
  conditionalRowStyles?: (theme: string) => ConditionalStyles<T>[];
}) => {
  const [scrollHeight, setScrollHeight] = useState("75vh");
  const theme = useResolvedTheme();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < 768) {
        if (window.innerWidth > 600) {
          setScrollHeight("48vh");
        } else {
          setScrollHeight("70vh");
        }
      } else {
        setScrollHeight("75vh");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      fixedHeader
      fixedHeaderScrollHeight={scrollHeight}
      // subHeader
      // subHeaderComponent={subHeaderComponen}
      selectableRows
      onSelectedRowsChange={onSelectedRowsChange}
      expandableRows
      expandableRowsComponent={expandableRowsComponent}
      conditionalRowStyles={conditionalRowStyles && conditionalRowStyles(theme)}
      customStyles={customStyles(theme)}
    />
  );
};

export default Datatable;
