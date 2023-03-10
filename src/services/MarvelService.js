

class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=8eba837de29e2ca3122d673d4dd7e5a2';
  _baseOffsetChar = 600;

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  getAllCharacters = async (offset = this._baseOffsetChar) => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);

    return res.data.results.map(this._transformCharacter);
  }

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  }

  _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description ?  `${char.description.slice(0, 210)}...` : 'No description',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.url,
      wiki: char.url,
      id: char.id,
      comics: char.comics.items.slice(0, 10)
    }
  }
}

export default MarvelService;