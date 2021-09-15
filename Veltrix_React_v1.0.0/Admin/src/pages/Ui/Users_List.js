import React,{useState, useEffect} from "react";
import MetaTags from 'react-meta-tags';
import queryString from 'query-string';
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
import user2 from "../../assets/images/users/user-2.jpg";


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"


const Users = () => {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState([]);
  const [pagenext, setPageNextPage] = useState('');
  const [pageprevious, setPagePreviousPage] = useState('');
  const [id, setID] = useState('');

  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    pageNumber: 1,
    pageSize: 10,
  });
  const [redirect, setRedirect] = useState(false);
  const [linkpage, setLinkPage] = useState('https://lmsg03.azurewebsites.net/api/Admin/getuser?pageNumber=1&pageSize=10');

  // const page = useRef(
  //   <ul className="pagination justify-content-center">
  //     <li><Link to={{ pathname: '/mycourse/' + currentPage}} className="active">{currentPage}</Link></li>
  //   </ul>);

  const loadUsers = async () => {
    const paramsString = queryString.stringify(filters);
    const requestUrl = `https://lmsg03.azurewebsites.net/api/Admin/getuser?${paramsString}`;
    const res = await fetch(requestUrl,{
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
  },[filters]);

  const content = await res.json();
  if(content.message ==='Success')
    {
      setUsers(content.data);
      setPage(content);
      //setPageNextPage(content.nextPage);
      //setPagePreviousPage(content.previousPage);
    }
  }

  useEffect(() => {
    loadUsers();
  });


  // async function handleNextPage () {
  //   if(page.nextPage != null)
  //   {
  //     console.log("Trang");
  //     setLinkPage(page.nextPage);
  //   }
  //   else console.log("Trang cuoi");
  // };
  
  // async function handlePreviousPage (){
  //   if(page.previousPage != null)
  //   { 
  //     setLinkPage(page.previousPage);
  //   }
  //   else console.log("Trang dau");
  // };

  function handleChangePage (newPage) {
    setFilters({
      ... filters,
      pageNumber: newPage,
    });
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
      <div className="page-content" id="table_student">
        <MetaTags>
          <title>System Admin | Danh sách người dùng</title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs maintitle="System Admin" title="Quản lý hệ thống" breadcrumbItem="Danh sách người dùng" />
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
                        {users.slice().map((user) => (
                        <tr key={user['id']}>
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
            <button className="btn btn-primary btn-sm" disabled={page.pageNumber < 2} 
            onClick={() =>handleChangePage(page.pageNumber-1)}
            >
              Previous
            </button>
            <button className="btn btn-primary btn-sm" disabled={page.pageNumber > (page.totalPages - 1)} 
            onClick={() =>handleChangePage(page.pageNumber+1)}
            >
              Next
            </button>
        </Container>
      </div>
    </React.Fragment>
  )
}



export default Users;
