import React from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { AddCartButton, Skeleton, GoBackButton } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../../redux/cart/selectors';
import { CartItem } from '../../redux/cart/types';
import { addItem } from '../../redux/cart/slice';

const typeNames: string[] = ['тонкое', 'традиционное'];

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    id: string;
    imageUrl: string;
    title: string;
    price: number;
    types: number[];
    sizes: number[];
    count: number;
  }>();

  const [itemCount, setItemCount] = React.useState(0);
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const dispatch = useDispatch();

  const { items } = useSelector(selectCart);

  const { id } = useParams();

  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://628fbdd9dc4785236545fb25.mockapi.io/products/' + id,
        );

        const itemFind = items.find((item) => item.id === data.id);
        const itemFindCount = itemFind?.count;

        setPizza(data);

        if (itemFindCount) {
          setItemCount(itemFindCount);
        }
      } catch (error) {
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return (
      <div className="container">
        <Skeleton />
      </div>
    );
  }

  const onClickAddFullPizza = () => {
    const item: CartItem = {
      id: pizza.id,
      title: pizza.title,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      type: typeNames[activeType],
      size: pizza.sizes[activeSize],
      count: itemCount,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="container">
      <div className="full-pizza-block">
        <div className="full-pizza-block__left">
          <Link to="/">
            <GoBackButton />
          </Link>
          <img src={pizza.imageUrl} />
        </div>
        <div className="full-pizza-block__text">
          <h2 className="full-pizza-block__title">{pizza.title}</h2>
          <p>
            Ветчина, сервелат, шампиньоны, томаты, моцарелла, карамелизированный лук, сырный соус
          </p>
          <h3 className="full-pizza-block__title-size">Выбери свой размер:</h3>
          <div className="pizza-block__selector w340">
            <ul>
              {pizza.types.map((type) => (
                <li
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={activeType === type ? 'active' : ''}>
                  {typeNames[type]}
                </li>
              ))}
            </ul>
            <ul>
              {pizza.sizes.map((size, index) => (
                <li
                  key={size}
                  onClick={() => setActiveSize(index)}
                  className={activeSize === index ? 'active' : ''}>
                  {size} см.
                </li>
              ))}
            </ul>
          </div>
          <h4 className="full-pizza-block__price">{pizza.price} ₽</h4>
          <AddCartButton onClickAdd={onClickAddFullPizza} id={pizza.id} />
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
