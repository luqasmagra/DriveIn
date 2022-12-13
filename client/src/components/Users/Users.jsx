import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";

const Users = () => {
  const [UsersListLocal, setUsersListLocal] = useState([]);

  const fun = async () => {
    let list = await axios.get("/user");
    list = list.data.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
    console.log(list);
    const UsersList = list.map((user) => (
      <div className="Users_Unit" key={user.id}>
        <img src={user.photo} alt="User" className="Users_photo"></img>
        <p style={{ width: "20px" }}>{user.id}</p>
        <div>
          {user.role === 1 && <p className="Users_Text4">Usuario</p>}
          {user.role === 2 && <p className="Users_Text4">Moderador</p>}
          {user.role === 3 && <p className="Users_Text4">Administrador</p>}
          {user.role === 4 && <p className="Users_Text4">Dueño</p>}
        </div>
        <p className="Users_Text3">{`${user.name} ${user.lastName}`}</p>
        <p style={{ width: "180px" }}>{user.email}</p>
        <p style={{ margin: "0px 0px 0px 50px" }}>{user.phone}</p>
        {user.active ? (
          <p style={{ color: "green" }} className="Users_Text2">
            Activa
          </p>
        ) : (
          <p style={{ color: "red" }} className="Users_Text2">
            No activa
          </p>
        )}
        {user.active ? (
          <button
            className="Users_Button"
            onClick={statusChangeHandler}
            value={[user.active, user.id]}
          >
            Desabilitar
          </button>
        ) : (
          <button
            className="Users_Button"
            onClick={statusChangeHandler}
            value={[user.active, user.id]}
          >
            Habilitar
          </button>
        )}
      </div>
    ));
    setUsersListLocal(UsersList);
  };

  useEffect(() => {
    fun();
  }, [fun]);

  const statusChangeHandler = async (event) => {
    const state = event.target.value.split(",");
    console.log(state);
    await axios.put(`/user/${state[1]}`, {
      active: state[0] === "true" ? false : true,
    });
    fun();
  };

  return (
    <div className="Users_Main">
      <div className="Users_Second">
        <p>Lista de Usuarios:</p>
        <div className="Users_Sections_Titles">
          <p style={{ margin: "0px 0px 0px 120px" }}>Id</p>
          <p style={{ margin: "0px 0px 0px 50px" }}>Role</p>
          <p style={{ margin: "0px 0px 0px 145px" }}>Name</p>
          <p style={{ margin: "0px 0px 0px 160px" }}>Email</p>
          <p style={{ margin: "0px 0px 0px 120px" }}>Telefono</p>
          <p style={{ margin: "0px 0px 0px 20px" }}>Activo</p>
        </div>
        <div className="Users_Unit_Box">{UsersListLocal}</div>
      </div>
    </div>
  );
};

export default Users;
