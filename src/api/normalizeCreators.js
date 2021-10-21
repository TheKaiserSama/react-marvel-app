export function normalizeCreators(data = {}) {
  const { total, limit, offset, results } = data;

  return {
    total,
    limit,
    offset,
    results: results.map(normalizeCreator)
  };
}

export function normalizeCreator(comic) {
  const {
    comics,
    events,
    firstName,
    fullName,
    id,
    lastName,
    middleName,
    series,
    stories,
    thumbnail
  } = comic;

  return {
    comics: comics.available,
    events: events.available,
    firstName,
    fullName,
    id,
    lastName,
    middleName,
    series: series.available,
    stories: stories.available,
    thumbnail: getThumbnailUrl(thumbnail)
  };
}

function getThumbnailUrl({ extension, path }) {
  return `${path}.${extension}`;
}
