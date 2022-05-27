import React, { useRef, useMemo, useState } from 'react';
import { Box, Button, Heading, Stack } from '@chakra-ui/react';
import { CSVReader } from 'react-papaparse';
import RTable from './RTable';
import BarChart from './components/BarChart';
import './App.css';


const App = () => {
  const buttonRef = useRef(null);
  const [columnData, setColumnData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const columns = useMemo(() => columnData, [columnData]);
  const data = useMemo(() => rowData, [rowData]);

  const handleOnFileLoad = (data) => {

    const columns = data[5].data.map((col, index) => {
      return {
        Header: col,
        accessor: col.split(" ").join("_"),
      };
    });
    
    const rows = data.slice(6).map((row) => {
      return row.data.reduce((acc, curr, index) => {
        acc[columns[index].accessor] = curr;
        return acc;
      }, {});
    });

    setRowData(rows);
    setColumnData(columns);    
  };

  const onErrorHandler = (err, file, inputElem, reason) => {
    console.log(err);
  }

  const handleFileRemove = (data) => {
    console.log(data);
  }

  const handleOpenCSVReader = (e) => {
    if(buttonRef.current) {
      buttonRef.current.open(e);
    }
  }

  const handleRemoveFile = (e) => {
    if(buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  }

  return (
    <div className='wrapper'>
      <Heading color="teal" textAlign="center">EasyCoach Project</Heading>
      <CSVReader
      ref={buttonRef}
      onFileLoad={handleOnFileLoad}
      onError={onErrorHandler}
      onClick
      noDrag
      onRemoveFile={handleFileRemove}
      >
        {({file}) =>(
          <Stack margin="10">
          <Box>
            {" "}
            <Button onClick={handleOpenCSVReader}>CSV Upload</Button>
          </Box>
          {file && (
            <div className='csv-wrapper'>
              <Box width="fit-content" padding={5} border="2px solid black" borderRadius={15} marginBottom={10}>
                {file.name}
              </Box>
              <Box>
                <Button onClick={handleRemoveFile} size="xs" variant="ghost" marginBottom={10}>Remove</Button>
              </Box>
              <BarChart rows={rowData} columns={columns} />
            </div>
          )}            
          </Stack>
        )}
      </CSVReader>
      <RTable columns={columns} data={data} />
      
      
    </div>
    
  );
}

export default App;
