import * as React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

interface DataTableProps {
    columns: GridColDef[]; // Define the type for columns
    data: GridRowsProp;    // Define the type for data
}

const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
    return (
        <div style={{ height: '80%', width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ overflow: 'clip' }}
            />
        </div>
    );
}

export default DataTable;

