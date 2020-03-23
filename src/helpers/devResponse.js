// grabArticle: async () => {
//     let data, jsonData;
//     try {
//       data = await fetch(`${url}${tagParam}${topParam}`).then(checkStatus);
//       jsonData = await data.json();
//     } catch (error) {
//       console.log(JSON.stringify(error));
//     }

//     return jsonData;
//   },
//   convertArticle: (prom) => {
//     let articleInfo = [];
//     prom.then(result => {
//       articleInfo.push(result[0].url);
//       articleInfo.push(result[0].title);

//       (result[0].cover_image == undefined) ? articleInfo.push('../images/no-img.jpg') : articleInfo.push(result[0].cover_image.toString());

//       articleInfo.push(result[0].positive_reactions_count);
//     }).catch((error) => {
//       console.log(JSON.stringify(error));
//     });
//     return articleInfo;
//   }

// };
