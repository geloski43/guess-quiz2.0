import axios from 'axios';

const proxy = 'https://thingproxy.freeboard.io/fetch/';

export const getImage = async query =>
  await axios.get(
    `${proxy}https://serpapi.com/search.json?q=${query}&tbm=isch&ijn=0&api_key=88b7718e4f1f0d5a1832dd6e56e37d84a8a4a8c44f61d3bc8707c26b0ceac9cd`
  );

export const getImage2 = async query =>
  await axios.get(
    `${proxy}https://serpapi.com/search.json?q=${query}&tbm=isch&ijn=1&api_key=8aebc49b1f04cb690fd66aeb1f0bf3e420f03b0823404a1accb00aa9995a9024`
  );

export const getImage3 = async query =>
  await axios.request({
    method: 'GET',
    url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
    params: {
      q: query,
      pageNumber: '1',
      pageSize: '10',
      autoCorrect: 'false',
      safeSearch: 'false',
    },
    headers: {
      'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'b267774d42msh75f4c7308751f8cp13debfjsn781f605c78e6',
    },
  });

// getImage(query)
//   .then(res => {
//     // console.log('image', res.data.images_results);
//     setImageHint(
//       res.data.images_results[Math.floor((Math.random() * 2) | 0)]
//         .thumbnail
//     );
//     localStorage.setItem(
//       query,
//       JSON.stringify(
//         res.data.images_results[Math.floor((Math.random() * 2) | 0)]
//           .thumbnail
//       )
//     );
//   })
//   // fallback when 100 searches has been exhausted
//   .catch(err => {
//     getImage2(query)
//       .then(res => {
//         // console.log('image', res.data.images_results);
//         setImageHint(
//           res.data.images_results[Math.floor((Math.random() * 2) | 0)]
//             .thumbnail
//         );
//         localStorage.setItem(
//           query,
//           JSON.stringify(
//             res.data.images_results[Math.floor((Math.random() * 2) | 0)]
//               .thumbnail
//           )
//         );
//       })
//       .catch(err => {
//         getImage3(query)
//           .then(res => {
//             console.log(res.data.value);
//             setImageHint(
//               res.data.value[Math.floor((Math.random() * 2) | 0)]
//                 .thumbnail
//             );
//             localStorage.setItem(
//               query,
//               JSON.stringify(
//                 res.data.value[Math.floor((Math.random() * 2) | 0)]
//                   .thumbnail
//               )
//             );
//           })
//           .catch(err => {
//             setImageHint(
//               'https://via.placeholder.com/200x150/bbc2cc/FF0000/?text=No_Image'
//             );
//           });
//         // console.log(err);
//       });
//     // console.log(err);
//   });
