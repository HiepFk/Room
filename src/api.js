import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

export const getRoom = async (id) => {
  return instance.get(`document/${id}`);
};

export const getListRoom = async () => {
  return instance.get(``);
};
export const createRoom = async (data) => {
  return instance.post("", data);
};
export const deleteRoom = async (id) => {
  return instance.delete(`/${id}`);
};

export const updateRoom = async (data) => {
  return instance.patch(`/${data.id}`, data);
};
