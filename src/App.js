import { useState, useEffect, useRef } from 'react';
import List from './components/WishList';
import Alert from './components/Alert';

const getLocalStorage = () => {
  let localWishList = localStorage.getItem('wish_list');
  if (localWishList) {
    return JSON.parse(localWishList);
  } else {
    return [];
  }
};

function App() {
  const [wishName, setWishName] = useState('');
  const [wishList, setWishList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editingWishName, setEditingWishName] = useState('');
  const [eiditID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });

  const refInput = useRef(null);

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };
  const clearList = () => {
    showAlert(true, 'success', 'All wishes vanished! Gone with the wind...');
    setWishList([]);
  };
  const removeItem = (id) => {
    setWishList(wishList.filter((wish) => wish.id !== id));
    if (isEditing && eiditID === id) {
      setIsEditing(false);
      setWishName('');
      refInput.current.focus();
    }
    showAlert(
      true,
      'danger',
      'Wish removed. Yeah! You did asked for too much...'
    );
  };

  const editItem = (id) => {
    const specificWish = wishList.find((wish) => wish.id === id);
    setIsEditing(true);
    setEditingWishName(specificWish.title);
    setEditID(id);
    setWishName(specificWish.title);
    refInput.current.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!wishName) {
      showAlert(true, 'danger', 'Please enter something');
    } else if (wishName && isEditing) {
      setWishList(
        wishList.map((wish) => {
          if (wish.id === eiditID) {
            if (wish.title.toLowerCase() === wishName.toLowerCase()) {
              showAlert(
                true,
                'success',
                "Nothing changed. That's right! Don't give up!"
              );
              return wish;
            } else {
              showAlert(
                true,
                'success',
                'Wish has been changed. Better luck with this one.'
              );
              return { ...wish, title: wishName };
            }
          } else {
            return wish;
          }
        })
      );
      setWishName('');
      setEditID(null);
      setIsEditing(false);
    } else {
      if (
        wishList.find(
          (wish) => wish.title.toLowerCase() === wishName.toLowerCase()
        )
      ) {
        showAlert(true, 'success', 'Same wish, same disappointment...');
      } else {
        const newItem = {
          id: new Date().getTime().toString(),
          title: wishName,
        };
        setWishList([...wishList, newItem]);
        showAlert(true, 'success', 'Wish added to the list. Good luck!');
      }
      setWishName('');
    }
  };

  useEffect(() => {
    localStorage.setItem('wish_list', JSON.stringify(wishList));
    refInput.current.focus();
  }, [wishList]);

  return (
    <main className="section-center">
      <form className="wish-form" onSubmit={handleSubmit}>
        <h1>Wish list</h1>
        <h3>Let it do its magic</h3>
        <Alert {...alert} removeAlert={showAlert} list={wishList} />
        <div className="form-control">
          <input
            ref={refInput}
            type="text"
            className="wish"
            placeholder={isEditing ? editingWishName : 'I want a new car...'}
            value={wishName}
            onChange={(e) => setWishName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'Edit' : 'Add'}
          </button>
        </div>
      </form>
      {wishList.length > 0 && (
        <div className="wish-container">
          <List items={wishList} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            Clear all wishes
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
