/**
 * 文章详情页面功能
 * 实现文章内容的展示、导航和分享功能
 * 包括文章正文、上下篇导航、相关文章推荐等
 */

// 从URL参数中获取文章ID
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

/**
 * 加载并显示文章内容
 * 从localStorage获取文章数据
 * 设置页面标题、填充文章内容
 * 处理文章导航和相关文章推荐
 */
function loadArticle() {
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    const currentArticle = articles[articleId];
    
    if (!currentArticle) {
        window.location.href = 'index.html';
        return;
    }

    // 设置页面标题
    document.title = `${currentArticle.title} - 刘春起 Ethan`;

    // 填充文章内容
    document.getElementById('articleTitle').textContent = currentArticle.title;
    document.getElementById('articleDate').textContent = new Date(currentArticle.date).toLocaleDateString();
    document.getElementById('articleBody').innerHTML = currentArticle.content;

    // 填充标签
    const tagsHtml = currentArticle.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    document.getElementById('articleTags').innerHTML = tagsHtml;

    // 设置上一篇和下一篇文章链接
    if (articleId > 0) {
        const prevArticle = articles[parseInt(articleId) - 1];
        document.getElementById('nextArticle').href = `article.html?id=${parseInt(articleId) - 1}`;
        document.getElementById('nextArticle').textContent = `下一篇: ${prevArticle.title}`;
    } else {
        document.getElementById('nextArticle').style.display = 'none';
    }

    if (articleId < articles.length - 1) {
        const nextArticle = articles[parseInt(articleId) + 1];
        document.getElementById('prevArticle').href = `article.html?id=${parseInt(articleId) + 1}`;
        document.getElementById('prevArticle').textContent = `上一篇: ${nextArticle.title}`;
    } else {
        document.getElementById('prevArticle').style.display = 'none';
    }

    // 加载相关文章
    loadRelatedArticles(currentArticle.tags, articleId);
}

/**
 * 加载相关文章推荐
 * 根据当前文章的标签匹配相关文章
 * 最多显示3篇相关文章
 * 排除当前正在阅读的文章
 */
function loadRelatedArticles(tags, currentId) {
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    const relatedArticles = articles
        .map((article, index) => ({ ...article, id: index }))
        .filter(article => {
            if (article.id === parseInt(currentId)) return false;
            return article.tags.some(tag => tags.includes(tag));
        })
        .slice(0, 3);

    const relatedHtml = relatedArticles.map(article => `
        <a href="article.html?id=${article.id}" class="related-article">
            <h4>${article.title}</h4>
            <span class="date">${new Date(article.date).toLocaleDateString()}</span>
        </a>
    `).join('');

    document.getElementById('relatedArticles').innerHTML = relatedHtml || '<p>暂无相关文章</p>';
}

/**
 * 文章分享功能
 * 支持分享到微博和微信
 * 微博使用API直接分享
 * 微信通过扫码分享（待实现二维码生成）
 */
function shareArticle(platform) {
    const url = window.location.href;
    const title = document.getElementById('articleTitle').textContent;
    
    switch (platform) {
        case 'weibo':
            window.open(`http://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`);
            break;
        case 'wechat':
            alert('请使用微信扫描二维码分享');
            // 这里可以添加生成二维码的功能
            break;
    }
}

/**
 * 页面初始化
 * 当DOM加载完成后自动加载文章内容
 */
document.addEventListener('DOMContentLoaded', loadArticle);