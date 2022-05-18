import { Component } from 'react';
import { DataTable } from 'react-native-paper';
import { Button, View, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';



export const TableRow = props => {
    const navigation = useNavigation();
    const date = new Date(props.dateUploaded).toLocaleDateString().replace(":00 ", " ")

    return(
        <DataTable.Row>
            <DataTable.Cell>FirstName LastName</DataTable.Cell>
            <DataTable.Cell>{date}</DataTable.Cell>
            <DataTable.Cell>{(props.processed) ? "Processed" : "Processing..."}</DataTable.Cell>
            <DataTable.Cell>
                <Button title="Analyze" onPress={() => navigation.navigate('Analyze')} />
            </DataTable.Cell>
            <DataTable.Cell>
                <Button title='Delete' />
            </DataTable.Cell>
        </DataTable.Row>
    )
    
}