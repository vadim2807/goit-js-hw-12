import axios from 'axios';

export async function getImagesByQuery(query, page, perPage) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '51391148-cca0cd30758df7ebb9b563956', 
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    return [];
  }
}