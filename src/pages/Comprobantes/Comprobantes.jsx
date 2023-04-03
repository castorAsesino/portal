import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import React, { useEffect, useState, useContext, Fragment } from "react";
import { UserInfoContext } from "../../service/UserInfoContext";
import { getListaComprobantes } from "../../service/service";
import { makeStyles } from '@mui/styles';

import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale'
import { useLocation } from "react-router-dom";


/* estilos que se aplican a la tabla */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

/* columnas de la tabla */
const columns = [
  { id: 'numeroComprobante', label: 'Nro. Comprobante', minWidth: 170 },
  { id: 'tipoComprobante', label: 'Tipo Comprobante', minWidth: 170, align: 'center', },
  {
    id: 'fecha',
    label: 'Fecha',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'total',
    label: 'Total',
    minWidth: 170,
    align: 'center',
  },
];


const useStyles = makeStyles((theme) => ({
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    textAlign: 'center',
  }
}));

export default function Facturacion({ match, location }) {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsBackup, setRowsBackup] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles();
  const { state } = useContext(UserInfoContext);
  const [value, setValue] = useState(null);
  let query = useQuery();


  /* se utiliza para dar formato a la fecha a dd/mm/aaaa y proceder a realizar la busqueda */
  const handleChange = (newValue) => {
    setValue(newValue);
    let fechaparse = new Date(newValue).toISOString().substring(0, 10).split('-');
    fechaparse = `${fechaparse[2]}/${fechaparse[1]}/${fechaparse[0]}`;
    search('fecha', fechaparse);
  };

  /* paginado */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /* se obtiene la lista de comprobantes, una vez que se encuentren los datos de idEmpresa y ruc */
  useEffect(() => {
    let ruc = query.get("ruc");
    if (state?.idEmpresa !== undefined && state?.ruc !== undefined) {
      if (ruc !== null) {
        obtenerListado(state.idEmpresa, ruc);
      } else {
        obtenerListado(state.idEmpresa, state.ruc);
      }

    }
  }, []);

  const obtenerListado = (idEmpresa, ruc) => {
    setLoading(true);
    getListaComprobantes(idEmpresa, ruc).then(response => {
      setLoading(false);
      setRows(response.data);
      setRowsBackup(response.data);
    }).catch(error => {
      setLoading(false);
      console.error(error);
    })
  }
  const download = (data) => {
    setLoading(true);
    fetch(data.pdfLink).then(response => {
      response.blob().then(blob => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = data.numeroComprobante;
        alink.click();
        setLoading(false);
      })
    })
  }

  /* filtrar los datos de la tabla */
  const search = (key, value) => {
    if (value !== '' && value !== null) {
      let result = rows.filter(obj => obj[key].toString().trim().toLowerCase() === value.toString().trim().toLowerCase());
      setRows(result);
    } else {
      setRows(rowsBackup);
      setValue(null);
    }

  }

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  return (
    <>

      <Container style={{ marginTop: '5em' }}>
        <div className='container'>
          {loading &&
            <div className={classes.loading}>
              <CircularProgress size={60} />
            </div>
          }
          <Typography variant="title"><span style={{ fontWeight: 100 }}></span> {state?.nombreCompleto}</Typography>
          <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
            Estás son tus facturas
          </Typography>

          <Paper elevation={24} sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 900 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <StyledTableCell
                        key={column.id}
                        align={`center`}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </StyledTableCell>
                    ))}
                    <StyledTableCell
                      key={`action`}
                      align={`center`}
                      style={{ minWidth: 170 }}
                    >
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    {columns.map((column, index) => (
                      <TableCell TableCell align="center" >
                        {column.id === 'fecha' && (
                          <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                            <DatePicker
                              label="Buscar Fecha"
                              inputFormat="dd/MM/yyyy"
                              value={value}
                              onChange={handleChange}
                              renderInput={(params) => (
                                <div style={{ position: "relative", display: "inline-block" }} >
                                  <TextField onKeyDown={onKeyDown} variant="standard" {...params} />
                                  <IconButton style={{ position: "absolute", top: "0.9rem", margin: "auto", right: "2rem" }} onClick={() => search('fecha', null)}>
                                    <ClearIcon />
                                  </IconButton>

                                </div>
                              )
                              }
                            />
                          </LocalizationProvider>)}
                        {column.id !== 'fecha' && (
                          <TextField id={`standard-basic${index}`} label={`Buscar ${column.label}`} variant="standard" onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                              ev.preventDefault();
                              search(column.id, ev.target.value);
                            }
                          }} />)}


                      </TableCell>

                    ))}
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length > 0 ? rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {

                      return (
                        <TableRow hover tabIndex={-1} key={row.numeroComprobante}>
                          <TableCell align="center" style={{ fontWeight: 300 }}>
                            {row.numeroComprobante}
                          </TableCell>
                          <TableCell align="center" style={{ fontWeight: 300 }}>
                            {row.tipoComprobante}
                          </TableCell>
                          <TableCell align="center" style={{ fontWeight: 300 }}>
                            {row.fecha}
                          </TableCell>
                          <TableCell align="center" style={{ fontWeight: 300 }}>
                            {row.total}
                          </TableCell>
                          <TableCell align="center" style={{ fontWeight: 300 }}>
                            <Button variant="contained" color="secondary" endIcon={<LocalPrintshopIcon />} onClick={() => download(row)} key={row.cdc}>
                              Descargar
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    }) :
                    (<TableCell colSpan={5} align="center" key={'notfound'}>
                      No se encontraron registros.
                    </TableCell>)}

                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={"Registros por página"}
              labelDisplayedRows={
                ({ from, to, count }) => {
                  return '' + from + '-' + to + ' de ' + count
                }
              }
            />
          </Paper>
        </div>
      </Container>
    </>
  )
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}