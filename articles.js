/**
 * 文章列表页面功能
 * 当页面加载完成后，从localStorage中获取文章数据
 * 并将文章渲染成卡片形式展示在网格布局中
 * 每个卡片包含文章封面图、标题、摘要、发布日期和标签
 * 点击卡片可跳转到对应的文章详情页
 */
document.addEventListener('DOMContentLoaded', () => {
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    const articlesGrid = document.getElementById('articlesGrid');

    articlesGrid.innerHTML = articles.map(article => {
        return `
            <article class="article-card" onclick="window.location.href='articles/${article.link}'">
                <img src="${article.coverImage}" alt="${article.title}" class="article-image">
                <div class="article-content">
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-meta">
                        <span class="date">${article.date}</span>
                        <div class="article-tags">
                            ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </article>
        `;
    }).join('');
});