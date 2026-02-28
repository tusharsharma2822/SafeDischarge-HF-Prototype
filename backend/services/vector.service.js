export const getTopK = (queryText, guidelines, k = 3) => {
  const query = queryText.toLowerCase();

  const scored = guidelines.map(item => {
    const content = item.content.toLowerCase();

    let score = 0;

    query.split(" ").forEach(word => {
      if (content.includes(word)) score++;
    });

    return { ...item, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
};