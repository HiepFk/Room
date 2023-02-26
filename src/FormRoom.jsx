import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Input from "./Input";
import { createRoom, updateRoom, getListRoom } from "./api";
function FormRoom({ show, setShow, room, setData }) {
  const handleClose = () => setShow(false);

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (room) {
      setName(room?.name);
      setCapacity(room?.capacity);
      setColor(room?.color);
    }
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: room?.id,
      name,
      capacity,
      color,
    };
    if (room) {
      await updateRoom(data);
      await getListRoom();
    } else {
      await createRoom(data);
      setData((prev) => prev.push(data));
      console.log("Create");
    }
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{room ? "Update" : "Add"} Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Input data={name} setData={setName} label="Name" type="text" />
          <Input
            data={capacity}
            setData={setCapacity}
            label="Capacity"
            type="number"
          />
          <Input data={color} setData={setColor} label="Color" type="color" />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          {room ? "Update" : "Add"}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormRoom;
