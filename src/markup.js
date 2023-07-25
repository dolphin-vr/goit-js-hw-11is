function createMarkup(images) {
  const res = images
    .map(img => {
      return `<li class="photo-card">
          <a class="card_link" href="${img.largeImageURL}"><img class="card_image" src="${img.webformatURL}" alt="${img.tags}" loading="lazy"></a>
          <div class="info">
          <p class="info-item"><b>Likes: </b>${img.likes}</p>
          <p class="info-item"><b>Views: </b>${img.views}</p>
          <p class="info-item"><b>Comments: </b>${img.comments}</p>
          <p class="info-item"><b>Downloads: </b>${img.downloads}</p>
          </div>
       </li>`;
    })
    .join('');
  return res;
}

export { createMarkup };
