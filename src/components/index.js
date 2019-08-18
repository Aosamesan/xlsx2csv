import React, { createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase'
import { makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import OpenIcon from '@material-ui/icons/OpenInBrowser';
import { readFile } from '../state';
import XLSX from 'xlsx';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    spacer: {
        flex: '1 1 100%'
    },
    hidden: {
        display: 'none'
    },
    title: {
        flex: '0 0 auto'
    },
    margin: {
        padding: theme.spacing(2)
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    }
}));

function AppComponent ({}) {
    const inputRef = createRef();
    const dispatch = useDispatch();
    const file = useSelector(state => state.file);
    const sheetsInfo = getSheetsInfo(file);
    const classes = useStyles();

    function handleOpenButton() {
        inputRef.current.click();
    }

    function handleOpenFile(e) {
        dispatch(readFile(e.target.files[0]));
    }

    function getSheetsInfo(file) {
        if (file) {
            let workbook = file.Workbook;
            if (workbook) {
                return workbook.Sheets.map(function (sheet) {
                    return {
                        id: Number.parseInt(sheet.sheetId),
                        name: sheet.name
                    };
                });
            }
        }
        return [];
    }

    function downloadCSV(file, sheetName) {
        if (file) {
            let sheets = file.Sheets;
            if (sheets) {
                let contents = XLSX.utils.sheet_to_csv(sheets[sheetName], {
                    blankrows: false,
                    FS: ','
                });
                let a = document.createElement('a');
                let data = new TextEncoder('UTF-8').encode(contents);
                let blob = new Blob([data], {
                    type: 'octet/stream'
                });
                let url = URL.createObjectURL(blob);
                a.href = url;
                a.download = `${sheetName}.csv`;
                a.click();
            }
        }
    }

    return (
        <Paper className={classes.root}>
            <CssBaseline />
            <Toolbar>
                <div className={classes.title}>
                    <Typography color="inherit" variant="subtitle1">XLSX to CSV UTF-8</Typography>
                </div>
                <InputBase className={classes.hidden} inputRef={inputRef} onChange={handleOpenFile} inputProps={{
                    accept: '.xlsx',
                    type: 'file'
                    }} />
                <div className={classes.spacer} />
                <Fab size="medium" className={classes.margin} color="primary" variant="extended" onClick={handleOpenButton}>
                    <OpenIcon className={classes.extendedIcon} />
                    Open
                </Fab>
            </Toolbar>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>시트 이름</TableCell>
                        <TableCell>다운로드 버튼</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        sheetsInfo.map(sheetInfo => (
                            <TableRow key={sheetInfo.id}>
                                <TableCell>{sheetInfo.name}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => downloadCSV(file, sheetInfo.name)}>
                                        Download
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Paper>
    );
}

export function App() {
    return <AppComponent />
}