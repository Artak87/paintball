const news = requier("../model/news").news;
const uuid = requier("uuid/v4");

export function saveNews(newsData) {
    if (!newsData.id) {
        newsData.id = uuid();
        newsData.createdAt = new Date();
    }
    news.push(newsData).value();
}

export function getNewsById(id) {
    return news.find({id: id}).value();
}

export function findNews(skip = 0, limit = 10, sort = 'createdAt', filter = {}) {
    const totalCount = news.size().value();

    const data = news.filter(filter)
        .sortBy(sort)
        .take(limit)
        .value();

    return {totalCount: totalCount, data: data}
}
