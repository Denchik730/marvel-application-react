

class MarvelService {
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  getAllCharacters = () => {
    return this.getResource('https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=900&apikey=8eba837de29e2ca3122d673d4dd7e5a2')
  }
}

export default MarvelService;