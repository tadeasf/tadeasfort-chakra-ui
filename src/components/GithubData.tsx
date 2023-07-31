/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { Heading, Box, useColorMode } from "@chakra-ui/react"; // Import Chakra UI components and CSSReset

import DataTable from "react-data-table-component";

type Repo = {
  name: string;
  dateUpdated: string;
  numberOfCommits: number;
  numberOfDocuments: number;
  totalLinesOfCode: number;
  totalLinesAdded: number;
  totalLinesDeleted: number;
  commits: Array<{
    sha: string;
    date: string;
    linesAdded: number;
    linesDeleted: number;
  }>;
};

type Column = {
  name: string;
  selector: (row: TableData) => string | number;
};

type TableData = {
  name: string;
  dateUpdated: string;
  numberOfCommits: number;
  numberOfDocuments: number;
  totalLinesOfCode: number;
  totalLinesAdded: number;
  totalLinesDeleted: number;
};

const columns: Column[] = [
  {
    name: "Repository",
    selector: (row: TableData) => row.name,
  },
  {
    name: "Last Updated",
    selector: (row: TableData) => row.dateUpdated,
  },
  {
    name: "Number of Commits",
    selector: (row: TableData) => row.numberOfCommits.toString(),
  },
  {
    name: "Total Lines of Code",
    selector: (row: TableData) => row.totalLinesOfCode.toString(),
  },
  {
    name: "Total Lines Added",
    selector: (row: TableData) => row.totalLinesAdded.toString(),
  },
  {
    name: "Total Lines Deleted",
    selector: (row: TableData) => row.totalLinesDeleted.toString(),
  },
];

const GithubData = () => {
  const [data, setData] = useState<Repo[] | null>(null);
  const { colorMode } = useColorMode(); // Get the current color mode (light/dark)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box
          bg={colorMode === "light" ? "white" : "gray.700"}
          color={colorMode === "light" ? "black" : "white"}
          p={2}
          boxShadow="md"
        >
          <p>Date: {data.date}</p>
          <p>Lines Added: {data.linesAdded}</p>
          <p>Lines Deleted: {data.linesDeleted}</p>
        </Box>
      );
    }

    return null;
  };

  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box
          bg={colorMode === "light" ? "white" : "gray.700"}
          color={colorMode === "light" ? "black" : "white"}
          p={2}
          boxShadow="md"
        >
          <p>{data.name}</p>
          <p>Value: {data.totalLinesOfCode}</p>
        </Box>
      );
    }

    return null;
  };

  const CustomBarTooltip2 = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box
          bg={colorMode === "light" ? "white" : "gray.700"}
          color={colorMode === "light" ? "black" : "white"}
          p={2}
          boxShadow="md"
        >
          <p>{data.name}</p>
          <p>Value: {data.numberOfCommits}</p>
        </Box>
      );
    }

    return null;
  };

  useEffect(() => {
    axios
      .get("https://tadeasfort.eu/node-express-mern/api/github-data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const lineChartData = data[0].commits.map((commit) => ({
    date: format(parseISO(commit.date), "yyyy-MM-dd"),
    linesAdded: commit.linesAdded,
    linesDeleted: commit.linesDeleted,
  }));

  const barChartData = data.map((repo) => ({
    name: repo.name,
    totalLinesOfCode: repo.totalLinesOfCode,
  }));

  // Sort data for the second bar chart
  const sortedBarChartData = [...barChartData]
    .sort((a, b) => b.totalLinesOfCode - a.totalLinesOfCode)
    .slice(0, 10); // Take top 10

  // Create data for the third bar chart
  const commitsBarChartData = data
    .map((repo) => ({
      name: repo.name,
      numberOfCommits: repo.numberOfCommits,
    }))
    .sort((a, b) => b.numberOfCommits - a.numberOfCommits)
    .slice(0, 10); // Take top 10

  const tableData: TableData[] = data
    ? data.map((repo) => ({
        name: repo.name,
        dateUpdated: format(parseISO(repo.dateUpdated), "yyyy-MM-dd"),
        numberOfCommits: repo.numberOfCommits,
        numberOfDocuments: repo.numberOfDocuments,
        totalLinesOfCode: repo.totalLinesOfCode,
        totalLinesAdded: repo.totalLinesAdded,
        totalLinesDeleted: repo.totalLinesDeleted,
      }))
    : [];

  return (
    <Box
      bg={colorMode === "light" ? "white" : "gray.800"}
      color={colorMode === "light" ? "black" : "white"}
    >
      {/* Use Chakra UI's colorMode to set the background and text color based on the current color mode */}
      <Heading as="h1" size="xl" textAlign="center" my={5}>
        GitHub Data
      </Heading>
      <Heading as="h1" size="l" textAlign="center" my={5}>
        Lines Added/Deleted
      </Heading>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={lineChartData}>
          <Line type="monotone" dataKey="linesAdded" stroke="#8884d8" />
          <Line type="monotone" dataKey="linesDeleted" stroke="#82ca9d" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          {/* Use the CustomTooltip component */}
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
      <Heading as="h1" size="l" textAlign="center" my={5}>
        Repositories by lines of code
      </Heading>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={sortedBarChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          {/* Use the CustomTooltip component */}
          <Tooltip content={<CustomBarTooltip />} />
          <Bar dataKey="totalLinesOfCode" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <Heading as="h1" size="l" textAlign="center" my={5}>
        Repositories by number of commits
      </Heading>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={commitsBarChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          {/* Use the CustomTooltip component */}
          <Tooltip content={<CustomBarTooltip2 />} />
          <Bar dataKey="numberOfCommits" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <DataTable
        title="Repository Data"
        columns={columns}
        data={tableData}
        theme={colorMode === "light" ? "default" : "dark"}
      />
    </Box>
  );
};

export default GithubData;
