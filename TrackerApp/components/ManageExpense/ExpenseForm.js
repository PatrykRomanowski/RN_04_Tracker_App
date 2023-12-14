import React, { useState } from "react";
import { Text, StyleSheet, View, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constans/styles";

const ExpenseForm = ({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) => {
  const [input, setInput] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: { value: defaultValues ? defaultValues.description : "" },
    isValid: true,
  });

  const submitHandler = () => {
    const expenseData = {
      amount: +input.amount.value,
      date: new Date(input.date.value),
      description: input.description.value,
    };

    const amuntIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amuntIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalidinput", "Plese check your input");
      setInput((currentInputs) => {
        return {
          amount: {
            value: currentInputs.amount.value,
            isValid: amuntIsValid,
          },
          date: {
            value: currentInputs.date.value,
            isValid: dateIsValid,
          },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });

      return;
    }
    onSubmit(expenseData);
  };

  const formIsInvalid =
    !input.amount.isValid || !input.date.isValid || !input.description.isValid;

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInput((currentInputValue) => {
      return {
        ...currentInputValue,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!input.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: input.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!input.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: input.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!input.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: input.description.value,
          // autoCapitalize: "none",
          // autoCorrect: false,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered date
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {/* {isEditing ? "Update" : "Add"} */}
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 6,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
