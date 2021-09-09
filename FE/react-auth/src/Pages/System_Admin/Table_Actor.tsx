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
import { Redirect } from "react-router-dom";


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


function Table_Actor() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [id, setID] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [redirect, setRedirect] = useState(false);

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

  const handleDelete = async (id: string) => {
    setID(id);
    // console.log(id);
      const link = 'https://lmsg03.azurewebsites.net/api/Admin/deleteuser?Id='+id;
      const res = await fetch(link,{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });

    const content = await res.json();
    if(content.message ==='Success!')
      alert("Xóa thành công !");
      setRedirect(true);
    
  };

  if(redirect)
  return <Redirect to="/admin/student"/>;

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
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage,page * rowsPerPage + rowsPerPage).map((user) => (
              <StyledTableRow hover role="checkbox" tabIndex={-1} key={user['id']}>
                <TableCell>{user['userName']}</TableCell>
                <TableCell>{user['email']}</TableCell>
                <TableCell>{user['phoneNumber']}</TableCell>
                {/* <TableCell>{user['company']}</TableCell> */}
                <TableCell><button className="w-100 btn btn-lg btn-primary" onClick={() =>handleDelete(user['id'])}>Xóa</button></TableCell>
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

export default Table_Actor;