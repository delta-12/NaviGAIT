import { Component } from 'react';
import { DataTable } from 'react-native-paper';
import { Button, View, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';



export function TableRow (){
  const navigation = useNavigation(); 
        return(
          
            <DataTable.Row>
                        <DataTable.Cell>FirstName LastName</DataTable.Cell>
                        <DataTable.Cell>5/11/2022</DataTable.Cell>
                        <DataTable.Cell>
                            <Button
                            
                            title="Analyze"
                            onPress={() => navigation.navigate('Analyze')}
                            />
                        </DataTable.Cell>
                        <DataTable.Cell>
                        <Button title='Delete'
                        />
                        </DataTable.Cell>
            </DataTable.Row>
        );
    
}