import React from "react"
import { Text } from "react-native"
import { DataTable } from "react-native-paper"
import {TableRow} from "./TableRow"

export const Table = props => {
  if (props.videos === null || props.videos.length === 0)
  {
    return (
      <Text>No videos uploaded.</Text>
    ) 
  }
  return(
    <DataTable >
      <DataTable.Header>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Date Uploaded</DataTable.Title>
        <DataTable.Title>Status</DataTable.Title>
        <DataTable.Title></DataTable.Title>
        <DataTable.Title></DataTable.Title>
      </DataTable.Header>

      {props.videos.map((v) => <TableRow key={v._id} id={v._id} title={v.title} fullTitle={v.fullTitle} dateUploaded={(v.dateUploaded !== null ) ? v.dateUploaded : ""} description={v.description} processed={v.processed} patient={v.patient} />)}

    </DataTable>
  )
}