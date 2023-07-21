import React from 'react';

import css from './DesktopTableList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTransactionThunk,
  patchTransactionThunk,
} from 'redux/transactions/transactionsOperations';
import { selectCategories } from 'redux/transactions/transactionsSelectors';

const DesktopTableList = ({
  id,

  transactionDate,
  type,
  comment,
  amount,
  categoryId,
}) => {
  const dispatch = useDispatch();
  const categoryName = useSelector(selectCategories);
  const category = categoryName.find(el => el.id === categoryId);

  const handleDelete = id => {
    console.log(id);
    dispatch(deleteTransactionThunk(id));
  };

  const handleEdit = id => {
    dispatch(patchTransactionThunk(id));
  };

  return (
    <tr className={css.bodyTable}>
      <td>{transactionDate}</td>
      <td>{type === 'EXPENSE' ? '-' : '+'}</td>
      <td>{category?.name}</td>
      <td>{comment}</td>
      <td
        className={`${Math.abs(amount)} ${
          type === 'EXPENSE' ? `${css.expense}` : `${css.income}`
        }`}
      >
        {Math.abs(amount)}
      </td>
      <td>
        <button className={css.buttonEdit} onClick={() => handleEdit(id)}>
          Edit
        </button>
      </td>
      <td>
        <button className={css.buttonDelete} onClick={() => handleDelete(id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default DesktopTableList;
