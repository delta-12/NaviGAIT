import { DataTable } from 'react-native-paper';
import { Button, View, Text } from 'react-native';
import React from 'react';
import {TableRow} from './TableRow'

export function Table(){
  return(
    <DataTable >
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title></DataTable.Title>
            <DataTable.Title></DataTable.Title>
          </DataTable.Header>

          <TableRow/>
          <TableRow/>
          <TableRow/>
          <TableRow/>
    </DataTable>
  );
}