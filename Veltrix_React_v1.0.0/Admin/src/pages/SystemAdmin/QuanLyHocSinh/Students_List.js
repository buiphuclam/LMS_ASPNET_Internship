import React,{useState, useEffect} from "react";

import TablePagination from '@material-ui/core/TablePagination';
import {
  Alert,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  UncontrolledAlert,
  Container,
} from "reactstrap"
import { Link } from "react-router-dom"

// import images
import user2 from "../../../assets/images/users/user-2.jpg";


//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"


const Students = () => {
  
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [id, setID] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [redirect, setRedirect] = useState(false);

  const loadUsers = async () => {
    const res = await fetch("https://lmsg03.azurewebsites.net/api/Admin/getuser/:role?roleName=STUDENT",{
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
  });

  const content = await res.json();
  if(content.message ==='Success!')
    setUsers(content.data)
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleDelete = async (id) => {
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

  // if(redirect)
  // return <Redirect to="ui-alerts"/>;


  return (
    <React.Fragment>
      <div className="page-content">

        <Container fluid={true}>

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                <h4 className="card-title mb-4">Danh sách người dùng</h4>
                  <div className="table-responsive">
                    <table className="table table-hover table-centered table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Username</th>
                          <th scope="col">Email</th>
                          <th scope="col">Phone Number</th>
                          <th scope="col">Chức năng</th>
                          <th scope="col" colSpan="2">
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.slice(page * rowsPerPage,page * rowsPerPage + rowsPerPage).map((user) => (
                        <tr hover role="checkbox" tabIndex={-1} key={user['id']}>
                          <td>
                            <div>
                              <img
                                src={user2}
                                alt=""
                                className="avatar-xs rounded-circle me-2"
                              />{" "}
                              {user['userName']}
                            </div>
                          </td>
                          <td>{user['email']}</td>
                          <td>{user['phoneNumber']}</td>
                          <td>
                            <span className="badge bg-success">
                              Delivered
                            </span>
                          </td>
                          <td>
                            <div>
                              <button className="btn btn-primary btn-sm" onClick={() =>handleDelete(user['id'])}>
                                Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
            </Row>
            <TablePagination
              rowsPerPageOptions={[3, 5, 10]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Students;
