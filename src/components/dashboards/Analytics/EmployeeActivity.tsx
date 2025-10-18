import React from "react";
import BarChart from "./BarChart";
import { employeeActivityData } from "@/utils/mockData";

const EmployeeActivity = () => {
  return (
    <div>
      <BarChart
        data={employeeActivityData}
        title="Employee Activity by Role"
        color="#8b5cf6"
      />
    </div>
  );
};

export default EmployeeActivity;
