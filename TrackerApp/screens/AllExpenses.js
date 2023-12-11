import React, { useContext } from "react";
import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const AllExpence = () => {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" />
  );
};

export default AllExpence;
