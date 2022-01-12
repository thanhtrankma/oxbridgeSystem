import _ from 'lodash';
import interceptor from './interceptor';

const gatewayUrl = interceptor.getGateway();

export const getImageSrc = iod => {
  const url = `${gatewayUrl}media-service/api/v1/images/${iod}`;
  return url;
};

async function upload(res) {
  try {
    const url = 'media-service/api/v1/images/upload/multiple';
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const formData = new FormData();
    res.forEach(element => {
      formData.append('file', {
        name: 'photo.jpg',
        filename: 'photo.jpg',
        uri: element.path,
        type: element.mime,
      });
    });

    const response = await interceptor.post(url, formData, headers);
    const newResponse = response?.data.map(item => {
      const {iod} = item;
      return {...item, uri: getImageSrc(iod)};
    });
    return Promise.resolve(newResponse);
  } catch (error) {
    return Promise.resolve('');
  }
}

export default {
  upload,
  getImageSrc,
};
