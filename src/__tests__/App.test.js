import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App, {
  parseVariablesInput,
  parseGraphInput,
  findDUPaths,
  calculateDUPairs,
  extendPath,
  extendingDUPathStartToEnd,
  calculateAllDefCoverage,
  calculateAllUsageCoverage
} from '../App';

describe('App', () => {
  describe('Unit Tests', () => {
      test('parseVariablesInput function', () => {
        const input = '';
        const result = parseVariablesInput(input);
        expect(result).toEqual({});
      });
  
      test('returns an empty object with invalid input', () => {
        const input = 'invalid input';
        const result = parseVariablesInput(input);
        expect(result).toEqual({});
      });
  
      test('parses multiple variables from input', () => {
        const input = 'a 1 2\nb 3 4';
        const result = parseVariablesInput(input);
        expect(result).toEqual({ a: [1, 2], b: [3, 4] });
      });
  
      test('parses variable names and values from input', () => {
        const input = 'a 1 2\nb 3 4';
        const result = parseVariablesInput(input);
        expect(result).toEqual({ a: [1, 2], b: [3, 4] });
      });

    test('parseGraphInput function', () => {
      // Test case 1: Verify that the function correctly parses a valid input string into a graph object
      const validInput = '1 2\n2 3\n3 4';
      const expectedOutput = { 1: [2], 2: [3], 3: [4] };
      const result = parseGraphInput(validInput);
      expect(result).toEqual(expectedOutput);

      // Test case 2: Verify that the function handles an empty input string
      const emptyInput = '';
      const emptyResult = parseGraphInput(emptyInput);
      expect(emptyResult).toEqual({});

      // Test case 3: Verify that the function handles an input string with invalid format
      const invalidInput = '1 2 3\n4';
      const invalidResult = parseGraphInput(invalidInput);
      expect(invalidResult).toEqual({});
    });

    test('findDUPaths function', () => {
      // Test case 1: Verify that the function correctly finds all DU paths for a given graph, definition variables, and usage variables
      const graph = { 1: [2], 2: [3], 3: [4] };
      const defVariables = { a: [1, 2], b: [2, 3] };
      const usageVariables = { a: [2, 3], b: [3, 4] };
      const startNode = 1;
      const endNodes = [4];
      const expectedOutput = {
        a: [[1, 2], [1, 2, 3]],
        b: [[2, 3], [2, 3, 4]]
      };
      const result = findDUPaths(graph, defVariables, usageVariables, startNode, endNodes);
      expect(result).toEqual(expectedOutput);

      // Test case 2: Verify that the function handles the case when any of the required inputs are missing or invalid
      const missingInputResult = findDUPaths({}, {}, {}, null, []);
      expect(missingInputResult).toBeUndefined();
    });

    test('calculateDUPairs function', () => {
      // Test case 1: Verify that the function correctly calculates all DU pairs for a given graph, definition variables, and usage variables
      const graph = { 1: [2], 2: [3], 3: [4] };
      const defVariables = { a: [1, 2], b: [2, 3] };
      const usageVariables = { a: [2, 3], b: [3, 4] };
      const expectedOutput = {
        a: [[1, 2], [1, 3], [2, 2], [2, 3]],
        b: [[2, 3], [2, 4], [3, 3], [3, 4]]
      };
      const result = calculateDUPairs(graph, defVariables, usageVariables);
      expect(result).toEqual(expectedOutput);

      // Test case 2: Verify that the function handles the case when any of the required inputs are missing or invalid
      const missingInputResult = calculateDUPairs({}, {}, {});
      expect(missingInputResult).toEqual({});
    });

    test('extendPath function', () => {
      // Test case 1: Verify that the function correctly extends a given path from the start node to the end node, if possible
      const graph = { 1: [2], 2: [3], 3: [4] };
      const startNode = 1;
      const endNode = 4;
      const path = [2, 3];
      const expectedOutput = [[2, 3, 4]];
      const result = extendPath(graph, startNode, endNode, path);
      expect(result).toEqual(expectedOutput);

      // Test case 2: Verify that the function handles the case when the path cannot be extended
      const invalidPath = [4, 3, 2];
      const invalidResult = extendPath(graph, startNode, endNode, invalidPath);
      expect(invalidResult).toEqual([]);
    });

    test('extendingDUPathStartToEnd function', () => {
      // Test case 1: Verify that the function correctly extends all DU paths from the start node to the end node
      const graph = { 1: [2], 2: [3], 3: [4] };
      const startNode = 1;
      const endNode = 4;
      const duPaths = {
        a: [[1, 2], [2, 3]],
        b: [[2, 3], [3, 4]]
      };
      const expectedOutput = {
        a: [[1, 2, 3, 4]],
        b: [[2, 3, 4]]
      };
      const result = extendingDUPathStartToEnd(graph, startNode, endNode, duPaths);
      expect(result).toEqual(expectedOutput);

      // Test case 2: Verify that the function handles the case when any of the required inputs are missing or invalid
      const missingInputResult = extendingDUPathStartToEnd({}, null, [], {});
      expect(missingInputResult).toEqual({});
    });

    test('calculateAllDefCoverage function', () => {
      // Test case 1: Verify that the function correctly calculates the all-def coverage for a given set of DU paths and definition variables
      const duPaths = {
        a: [[1, 2], [2, 3]],
        b: [[2, 3], [3, 4]]
      };
      const defVariables = { a: [1, 2], b: [2, 3] };
      const expectedOutput = [
        ['a', [1, 2]],
        ['b', [2, 3]]
      ];
      const result = calculateAllDefCoverage(duPaths, defVariables);
      expect(result).toEqual(expectedOutput);

      // Test case 2: Verify that the function handles the case when any of the required inputs are missing or invalid
      const missingInputResult = calculateAllDefCoverage({}, {});
      expect(missingInputResult).toEqual([]);
    });

    test('calculateAllUsageCoverage function', () => {
      // Test case 1: Verify that the function correctly calculates the all-usage coverage for a given set of DU paths, definition variables, and usage variables
      const duPaths = {
        a: [[1, 2], [2, 3]],
        b: [[2, 3], [3, 4]]
      };
      const defVariables = { a: [1, 2], b: [2, 3] };
      const usageVariables = { a: [2, 3], b: [3, 4] };
      const expectedOutput = [
        ['a', [2, 3]],
        ['b', [3, 4]]
      ];
      const result = calculateAllUsageCoverage(duPaths, defVariables, usageVariables);
      expect(result).toEqual(expectedOutput);

      // Test case 2: Verify that the function handles the case when any of the required inputs are missing or invalid
      const missingInputResult = calculateAllUsageCoverage({}, {}, {});
      expect(missingInputResult).toEqual([]);
    });
  });

  describe('Integration Tests', () => {
    test('overall functionality of the application', async () => {
      // Test case 1: Verify that the application correctly calculates the DU pairs, DU paths, extended DU paths coverage, all-def coverage, and all-usage coverage for a given input
      const { getByPlaceholderText, getByText, findByText } = render(<App />);

      // Fill in the input fields
      fireEvent.change(getByPlaceholderText('Enter graph edges (e.g., 1 2)'), { target: { value: '1 2\n2 3\n3 4' } });
      fireEvent.change(getByPlaceholderText('Enter start node'), { target: { value: '1' } });
      fireEvent.change(getByPlaceholderText('Enter end nodes separated by spaces'), { target: { value: '4' } });
      fireEvent.change(getByPlaceholderText('Enter definition variables and nodes (e.g., a 1 2)'), { target: { value: 'a 1 2\nb 2 3' } });
      fireEvent.change(getByPlaceholderText('Enter usage variables and nodes (e.g., b 1 3)'), { target: { value: 'a 2\nb 3' } });

      // Click the buttons
      fireEvent.click(getByText('Calculate DU Pairs'));
      fireEvent.click(getByText('Find DU Paths'));
      fireEvent.click(getByText('DU path coverage'));
      fireEvent.click(getByText('All Def Coverage'));
      fireEvent.click(getByText('All Usage Coverage'));

      // Verify the output
      await waitFor(() => expect(findByText('DU Pairs')).toBeTruthy());
      await waitFor(() => expect(findByText('DU Paths')).toBeTruthy());
      await waitFor(() => expect(findByText('Extended DU Paths Coverage')).toBeTruthy());
      await waitFor(() => expect(findByText('Def Coverage')).toBeTruthy());
      await waitFor(() => expect(findByText('Use Coverage')).toBeTruthy());
    });

    test('interaction between the input form and the output display', async () => {
      // Test case 1: Verify that the output is correctly displayed after each button click
      const { getByPlaceholderText, getByText, findByText } = render(<App />);

      // Fill in the input fields
      fireEvent.change(getByPlaceholderText('Enter graph edges (e.g., 1 2)'), { target: { value: '1 2\n2 3\n3 4' } });
      fireEvent.change(getByPlaceholderText('Enter start node'), { target: { value: '1' } });
      fireEvent.change(getByPlaceholderText('Enter end nodes separated by spaces'), { target: { value: '4' } });
      fireEvent.change(getByPlaceholderText('Enter definition variables and nodes (e.g., a 1 2)'), { target: { value: 'a 1 2\nb 2 3' } });
      fireEvent.change(getByPlaceholderText('Enter usage variables and nodes (e.g., b 1 3)'), { target: { value: 'a 2\nb 3' } });

      // Click the buttons
      fireEvent.click(getByText('Calculate DU Pairs'));
      await waitFor(() => expect(findByText('DU Pairs')).toBeTruthy());

      fireEvent.click(getByText('Find DU Paths'));
      await waitFor(() => expect(findByText('DU Paths')).toBeTruthy());

      fireEvent.click(getByText('DU path coverage'));
      await waitFor(() => expect(findByText('Extended DU Paths Coverage')).toBeTruthy());

      fireEvent.click(getByText('All Def Coverage'));
      await waitFor(() => expect(findByText('Def Coverage')).toBeTruthy());

      fireEvent.click(getByText('All Usage Coverage'));
      await waitFor(() => expect(findByText('Use Coverage')).toBeTruthy());

      // Test case 2: Verify that the output is cleared when the input values are changed
      fireEvent.change(getByPlaceholderText('Enter graph edges (e.g., 1 2)'), { target: { value: '' } });
      expect(findByText('DU Pairs')).toBeFalsy();
      expect(findByText('DU Paths')).toBeFalsy();
      expect(findByText('Extended DU Paths Coverage')).toBeFalsy();
      expect(findByText('Def Coverage')).toBeFalsy();
      expect(findByText('Use Coverage')).toBeFalsy();
    });
  });
});