import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="wish-list">
      {items.map(({ id, title }) => {
        return (
          <article className="wish-item" key={id}>
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => {
                  editItem(id);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  removeItem(id);
                }}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
