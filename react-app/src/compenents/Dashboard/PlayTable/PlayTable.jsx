import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';

import BTable from 'react-bootstrap/Table';

import { useTable } from 'react-table'


function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  console.log('---->', data)

  // Render the UI for your table
  return (
    <BTable striped bordered hover size="sm" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </BTable>
  )
}

function App({data}) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'NickName',
        accessor: 'UserId',
        Cell: (i) => {
          const { cell } = i;
          const data = cell.row.original;
          console.log(data)
          return (
            <span>
              {data.userdata.username}
            </span>
          );
        }
      },
      {
        Header: 'd4',
        accessor: 'd4',
      },
      {
        Header: 'd6',
        accessor: 'd6',
      },
      {
        Header: 'd8',
        accessor: 'd8',
      },
      {
        Header: 'd10',
        accessor: 'd10',
      },
      {
        Header: 'd12',
        accessor: 'd12',
      },
      {
        Header: 'd20',
        accessor: 'd20',
      }
    ],
    []
  )

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  )
}

export default App;