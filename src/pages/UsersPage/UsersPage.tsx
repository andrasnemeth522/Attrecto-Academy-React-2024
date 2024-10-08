import React, { useCallback, useEffect, useState } from "react";

import { Page } from "../../components/page/Page";
import { UserModel } from "../../models/user.model";
import { userService } from "../../services/user.service";
import { Button } from "../../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import classes from "./UsersPage.module.scss";

const UsersPage = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "card">("card");
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    setUsers(await userService.getUsers());
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const goToUserPage = () => {
    navigate("/user");
  };

  const changeToArray = () => {
    setViewMode("table");
  };

  const changeToCard = () => {
    setViewMode("card");
  };

  const handleDeleteUser = async (id: string | number) => {
    await userService.deleteUser(id);

    fetchUsers();
  };

  return (
    <Page title="Users">
      <div className="row">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Button color="primary" className="w-100 mb-3" onClick={goToUserPage}>
            Create User
          </Button>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Button
            color="secondary"
            className="w-100 mb-3"
            onClick={changeToArray}
          >
            Table
          </Button>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Button
            color="secondary"
            className="w-100 mb-3"
            onClick={changeToCard}
          >
            Card
          </Button>
        </div>
      </div>

      {viewMode === "table" ? (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ id, name, image }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>
                  <img
                    src={image}
                    alt={`user #${id}`}
                    className={classNames(classes.UserImage)}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>
                  <Button onClick={() => handleDeleteUser(id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="row">
          {users.map(({ id, name, image }) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-1" key={id}>
              <Link
                to={`/user/${id}`}
                className={classNames("card", classes.UserCard)}
              >
                <img
                  src={image}
                  alt={`user #${id}`}
                  className={classNames("card-img-top", classes.UserImage)}
                />
                <div className="card-body">
                  <h5>{name}</h5>
                </div>
                <Button
                  className={classes.DeleteIcon}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteUser(id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </Page>
  );
};

export default UsersPage;
