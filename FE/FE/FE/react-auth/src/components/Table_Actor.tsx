import React,{useState, useEffect} from "react";
import { 
  Container,
  Paper, 
  Box, 
  Typography, 
  TableContainer, 
  Table, 
  TableBody, 
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  ThemeProvider, 
  Theme,
  createStyles} from "@material-ui/core";
import { makeStyles, withStyles} from "@material-ui/core";
import { deflate } from "zlib";


const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 12,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles((them) =>({
  root: {
    width: "80vw",
    height: "80vh",
    backgroundColor: them.palette.grey[300],
    paddingTop: them.spacing(5),
  },
  container: {
    maxHeight: 440,
  },
}));


function Student_table() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const loadUsers = async () => {
      const res = await fetch("https://lmsg03.azurewebsites.net/api/Admin/getuser",{
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });

    const content = await res.json();
    if(content.message ==='Success')
      setUsers(content.data)
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              {/* <TableCell>Company</TableCell> */}
              <StyledTableCell>ID</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage,page * rowsPerPage + rowsPerPage).map((user) => (
              <StyledTableRow hover role="checkbox" tabIndex={-1} key={user['userName']}>
                <TableCell>{user['userName']}</TableCell>
                <TableCell>{user['email']}</TableCell>
                <TableCell>{user['phoneNumber']}</TableCell>
                {/* <TableCell>{user['company']}</TableCell> */}
                <TableCell>{user['id']}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}

export default Student_table;