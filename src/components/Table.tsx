import React, { useEffect, useMemo, useState } from "react";
import { EditableCell } from "./EditableCell";
import { ApiResponse } from "../utils/types/ApiResponse";
import { SearchLink } from "./SearchLink";
import { useSearchParams } from "react-router-dom";

enum SortType {
  NAME = 'name',
  EMAIL = 'email',
  BIRTDAY = 'birthday',
  NUMBER = 'number',
  ADDRESS = 'address',
}


export const Table = () => {
  const [users, setUsers] = useState<ApiResponse | null>(null);
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';


  const getParams = (call: SortType) => {
    if (call === sort && !order) {
      return { sort, order: 'desc' };
    }

    if (call === sort && order) {
      return { sort: null, order: null };
    }

    return {
      sort: call,
      order: null,
    };
  };

  const visibleUsers = useMemo(() => {
    if (!users) {
      return [];
    }
    let sorted = [...users.results]; const isReversed = order === 'desc';

    switch (sort) {
      case SortType.NAME:
        sorted = sorted.sort((user1, user2) => user1.name
          .localeCompare(user2.name));
        break;

      case SortType.EMAIL:
        sorted = sorted.sort((user1, user2) => user1.email
          .localeCompare(user2.email));
        break;

      case SortType.BIRTDAY:
        sorted = sorted.sort((user1, user2) => user1.birthday_date
          .localeCompare(user2.birthday_date));
        break;

      case SortType.NUMBER:
        sorted = sorted.sort((user1, user2) => user1.phone_number
          .localeCompare(user2.phone_number));
        break;

      case SortType.ADDRESS:
        sorted = sorted.sort((user1, user2) => user1.address
          .localeCompare(user2.address));
        break;

      default:
    }

    if (isReversed) {
      sorted = sorted.reverse();
    }

    return sorted;
  }, [sort, users, order]);



  useEffect(() => {
    fetch('https://technical-task-api.icapgroupgmbh.com/api/table/')
      .then(response => {
        if (!response) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then((data: ApiResponse) => {
        setUsers(data);
      }).catch(error => {
        console.log('error is occured', error);
      })

  }, []);

  const handleSave = async (userId: number, field: string, newValue: string) => {
    try {
      const updatedData = {
        [field]: newValue,
      };

      await fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/${userId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      setUsers((prevUsers) => {
        if (prevUsers) {
          return {
            ...prevUsers,
            results: prevUsers.results.map((user) => {
              if (user.id === userId) {
                return { ...user, [field]: newValue };
              }
              return user;
            }),
          };
        }
        return prevUsers;
      });
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <><table className="table">
      <thead className="table__head">
        <tr className="table__row">
          <th className="table__cell table__cell--head">
            <span className="table__cell-container">
              Name
              <SearchLink
                params={getParams(SortType.NAME)}
              >

                <img
                  className="icon"
                  src={
                    !sort
                      ? '/images/icon.png'
                      : sort === SortType.NAME && !order
                        ? '/images/icon-up.png'
                        : sort === SortType.NAME && order === 'desc'
                          ? '/images/icon-down.png'
                          : '/images/icon.png'
                  }
                  alt="Sort Icon"
                />
              </SearchLink>
            </span>
          </th>
          <td className="table__cell table__cell--head">
            <span className="table__cell-container">
              Email
              <SearchLink
                params={getParams(SortType.EMAIL)}
              >

                <img
                  className="icon"
                  src={
                    !sort
                      ? '/images/icon.png'
                      : sort === SortType.EMAIL && !order
                        ? '/images/icon-up.png'
                        : sort === SortType.EMAIL && order === 'desc'
                          ? '/images/icon-down.png'
                          : '/images/icon.png'
                  }
                  alt="Sort Icon"
                />
              </SearchLink>
            </span>

          </td>
          <td className="table__cell table__cell--head">
            <span className="table__cell-container">
              Date of birth
              <SearchLink
                params={getParams(SortType.BIRTDAY)}
              >

                <img
                  className="icon"
                  src={
                    !sort
                      ? '/images/icon.png'
                      : sort === SortType.BIRTDAY && !order
                        ? '/images/icon-up.png'
                        : sort === SortType.BIRTDAY && order === 'desc'
                          ? '/images/icon-down.png'
                          : '/images/icon.png'
                  }
                  alt="Sort Icon"
                />
              </SearchLink>
            </span>

          </td>
          <td className="table__cell table__cell--head">
            <span className="table__cell-container">
              Number
              <SearchLink
                params={getParams(SortType.NUMBER)}
              >

                <img
                  className="icon"
                  src={
                    !sort
                      ? '/images/icon.png'
                      : sort === SortType.NUMBER && !order
                        ? '/images/icon-up.png'
                        : sort === SortType.NUMBER && order === 'desc'
                          ? '/images/icon-down.png'
                          : '/images/icon.png'
                  }
                  alt="Sort Icon"
                />
              </SearchLink>
            </span>

          </td>
          <td className="table__cell table__cell--head">
            <span className="table__cell-container">
              address
              <SearchLink
                params={getParams(SortType.ADDRESS)}
              >

                <img
                  className="icon"
                  src={
                    !sort
                      ? '/images/icon.png'
                      : sort === SortType.ADDRESS && !order
                        ? '/images/icon-up.png'
                        : sort === SortType.ADDRESS && order === 'desc'
                          ? '/images/icon-down.png'
                          : '/images/icon.png'
                  }
                  alt="Sort Icon"
                />
              </SearchLink>
            </span>

          </td>
        </tr>
      </thead>
      <tbody>
        {users && visibleUsers.map((user) => {
          return (
            <tr>
              <td className="table__cell">
                <EditableCell
                  value={user.name}
                  onSave={(newValue) => handleSave(user.id, "name", newValue)} />
              </td>
              <td className="table__cell">
                <EditableCell
                  value={user.email}
                  onSave={(newValue) => handleSave(user.id, "email", newValue)} />
              </td>
              <td className="table__cell">
                <EditableCell
                  value={user.birthday_date}
                  onSave={(newValue) => handleSave(user.id, "birthday_date", newValue)} />
              </td>
              <td className="table__cell">
                <EditableCell
                  value={user.phone_number}
                  onSave={(newValue) => handleSave(user.id, "phone_number", newValue)} />
              </td>
              <td className="table__cell">
                <EditableCell
                  value={user.address}
                  onSave={(newValue) => handleSave(user.id, "address", newValue)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
      </>
  );
}