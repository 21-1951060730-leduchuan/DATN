import { Button, Grid } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { getData, postData } from "../Services/FetchNodeServices";

function CommentList() {
  const [getCommentList, setGetCommentList] = useState([]);

  const fetchData = async () => {
    const response = await getData("blog/get-comment");
    setGetCommentList(response.flat());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (commentId) => {
    await postData(`blog/handle-comment`, { commentId }, "delete");
    fetchData();
  };
  const resolve = async (commentId) => {
    await postData(`blog/handle-comment`, { commentId }, "resolve");
    fetchData();
  };

  const columns = [
    { field: "fullName", headerName: "Họ và tên", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "comment", headerName: "Bình luận", width: 450 },
    { field: "title", headerName: "Tiêu đề bài báo", width: 450 },
    {
      field: "edit",
      headerName: "Duyệt",
      width: 100,
      renderCell: (params) =>
        params.row.status === 0 ? (
          <Button
            startIcon={<CheckCircleIcon style={{ color: "#004cef" }} />}
            onClick={() => resolve(params.row._id)}
          />
        ) : (
          "Đã duyệt"
        ),
    },
    {
      field: "delete",
      headerName: "Xóa",
      width: 100,
      renderCell: (params) => (
        <Button
          startIcon={<DeleteIcon style={{ color: "red" }} />}
          onClick={() => handleDelete(params.row._id)}
        />
      ),
    },
  ];

  const CommentTable = () => {
    return (
      <div style={{ height: "auto", width: "100%", marginTop: "3%" }}>
        <DataGrid
          style={{ padding: "1%", border: "none" }}
          rows={getCommentList}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 15]}
        />
      </div>
    );
  };

  return (
    <div className="root">
      <div className="box" style={{ width: "90%", marginTop: "3%" }}>
        <Grid container spacing={0}>
          <Grid item md={12}>
            {CommentTable()}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default CommentList;
