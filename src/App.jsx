import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { BsTrashFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { BiCheckCircle } from "react-icons/bi";
import Loading from "./Loading";
import FormRoom from "./FormRoom";
import { getListRoom, deleteRoom } from "./api";
function App() {
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handeEdit = (item) => {
    setItem(item);
    setShow(true);
  };

  const handleGetData = async () => {
    try {
      setLoading(true);
      const res = await getListRoom();
      console.log(res.data?.data);
      setData(res.data?.data);
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    await deleteRoom(id);
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (data?.length === 0) {
    return <>None</>;
  }
  return (
    <>
      <FormRoom show={show} setShow={setShow} room={item} setData={setData} />
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Size</th>
            <th>Color</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            return (
              <tr key={item?.id}>
                <td>{index + 1}</td>
                <td>{item?.name}</td>
                <td>{item?.size}</td>
                <td style={{ position: "relative" }}>
                  <p
                    style={{
                      width: "1rem",
                      height: "1rem",
                      backgroundColor: `${item?.color}`,
                      position: "absolute",
                      top: "50%",
                      left: " 50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  ></p>
                </td>
                <td>
                  {item?.hasDevice ? (
                    <FaTimes style={{ opacity: "0.8" }} />
                  ) : (
                    <BiCheckCircle
                      style={{ color: "green", fontSize: "1.25rem" }}
                    />
                  )}
                </td>
                <td>
                  <MdEdit
                    style={{ marginRight: "1rem" }}
                    className="icon"
                    onClick={() => handeEdit(item)}
                  />
                  <BsTrashFill
                    className="icon"
                    onClick={() => handleDelete(item.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default App;
