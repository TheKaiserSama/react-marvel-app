export function normalizeCharacters(data = {}) {
  const { total, limit, offset, results } = data;

  return {
    total,
    limit,
    offset,
    results: results.map(normalizeCharacter)
  };
}

export function normalizeCharacter(comic) {
  const {
    comics,
    description,
    events,
    id,
    modified,
    name,
    series,
    stories,
    thumbnail
  } = comic;

  return {
    comics: comics.available,
    description,
    events: events.available,
    id,
    modified,
    name,
    series: series.available,
    stories: stories.available,
    thumbnail: getThumbnailUrl(thumbnail)
  };
}

function getThumbnailUrl({ extension, path }) {
  return `${path}.${extension}`;
}
