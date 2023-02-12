import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {

  state = {
    charList: [],
    loading: true,
    error: false,
    newCharLoading: false,
    offset: 600,
    charEnded: false
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }

  //Запрос когда пользователь кликает на кнопку подгрузки
  onRequest = (offset) => {
    this.onNewCharListLoading();
    this.marvelService.getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError)
  }

  onNewCharListLoading = () => {
    this.setState({
      newCharLoading: true
    })
  }

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if(newCharList.length < 9) {
      ended = true
    }

    this.setState(({charList, offset}) => ({
      charList: [...charList, ...newCharList], 
      loading: false,
      newCharLoading: false,
      offset: offset + 9,
      charEnded: ended
    }));
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true
    })
  }

  renderItems(arr) {
    const items = arr.map(item => {

      let imgStyle = {'objectFit' : 'cover'};
      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
      }

      return (
        <li 
          className="char__item"
          key={item.id}
          onClick={() => this.props.onCharSelected(item.id)}>
          <img className="char__item-img" src={item.thumbnail} alt={`Изображение ${item.name}`} style={imgStyle}/>
          <div className="char__item-name">{item.name}</div>
        </li>
      )
    });

    return (
      <ul className="char__grid">
        {items}
      </ul>
    )
  }


  render() {
    const {charList, loading, error, newCharLoading, offset, charEnded} = this.state;
    console.log(offset)
    const items = this.renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button 
          className="button button__main button__long"
          disabled={newCharLoading}
          style={{'display': charEnded ? 'none' : 'block'}}
          onClick={() => this.onRequest(offset)}>
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }

}

export default CharList;