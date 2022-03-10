import data from './meta.href.txt';

// 메타정보의 위치를 파일에서 읽어서 IPFS에 요청하여 가져온다.
// 시간 지연이 발생할 수 있다.
const getMetadata = (index) => {
  return new Promise((resolve, reject) => {
    fetch(data)
      .then((r) => r.text())
      .then((text) => {
        const regexp = new RegExp('(\r?\n)?' + index + '=(.*)/metadata.json', 'g');
        const result = text.toString().match(regexp);

        if (result != null) {
          fetch(result[0].slice(result[0].indexOf('=') + 1))
            .then((res) => res.json())
            .then((data) => {
              resolve({ image: data.image.toString().replaceAll('ipfs://', 'https://dweb.link/ipfs/'), attributes: data.attributes });
            });
        } else {
          reject('Failed to fetch metadata from uri');
        }
      });
  });
};
export { getMetadata };
