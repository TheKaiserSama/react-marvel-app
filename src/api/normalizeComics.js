export function normalizeComics(data = {}) {
  const { total, limit, offset, results } = data;

  return {
    total,
    limit,
    offset,
    results: results.map(normalizeComic)
  };
}

export function normalizeComic(comic) {
  const {
    characters,
    creators,
    dates,
    events,
    description,
    format,
    id,
    images,
    pageCount,
    prices,
    stories,
    thumbnail, 
    title
  } = comic;

  return {
    characters: characters,
    creators: creators,
    events: events,
    dates, 
    description,
    format, 
    id, 
    images,
    pageCount,
    prices,
    stories: stories,
    thumbnail: getThumbnailUrl(thumbnail),
    title
  };
}

function getThumbnailUrl({ extension, path }) {
  return `${path}.${extension}`;
}