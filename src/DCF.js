import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import SideMenu2 from './component/sideMenu2';
import './App.css'; // Import the CSS file
import {API_BASE_URL} from './config/apiConfig';


const fetchExcelFile = async () => {
    const response = await fetch('/Breakdown.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: 'array' });
    return workbook;
  };
const DCF = () => {
  const navigate = useNavigate();
  const [workbook, setWorkbook] = useState(null);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [protectSheet, setProtectSheet] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const fetchedWorkbook = await fetchExcelFile();
      setWorkbook(fetchedWorkbook);
      setSelectedSheet(fetchedWorkbook.SheetNames[0]);
      setSheetData(XLSX.utils.sheet_to_json(fetchedWorkbook.Sheets[fetchedWorkbook.SheetNames[0]], { header: 1 }));
      setLoading(false);
    };

    loadData();
  }, []);

  const handleSheetChange = (e) => {
    const sheetName = e.target.value;
    setSelectedSheet(sheetName);
    setSheetData(XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 }));
  };

  const handleCellChange = (e, rowIndex, colIndex) => {
    const newSheetData = [...sheetData];
    newSheetData[rowIndex][colIndex] = e.target.innerText;
    setSheetData(newSheetData);

    // Update the workbook with the new data
    const newSheet = XLSX.utils.aoa_to_sheet(newSheetData);
    workbook.Sheets[selectedSheet] = newSheet;
    setWorkbook(workbook);
  };

  const handleSave = async () => {
    try {
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        const formData = new FormData();
        formData.append('file', blob, 'Breakdown.xlsx');
  
        const response = await fetch('/api/files/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        console.log('File uploaded successfully');
      } catch (error) {
        console.error('Failed to save file:', error);
      }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='container2'>
        
        <div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '950px', height: '600px' }}>
              <select className="select-sheet" onChange={handleSheetChange} value={selectedSheet}>
                {workbook.SheetNames.map((sheetName) => (
                  <option key={sheetName} value={sheetName}>
                    {sheetName}
                  </option>
                ))}
              </select>
              <div className="excel-table-container">
                <table className="excel-table">
                  <tbody>
                    {sheetData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => handleCellChange(e, rowIndex, cellIndex)}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ width: '15%', padding: '20px', background: '#ddd' }}>
              <p>Open Excel Files (.xlsx)</p>
              <button onClick={handleSave}>Save Changes</button>
              <br />
              <br />
             
              <br />
              <br />
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DCF;
